'use client';
import { useEffect, useRef, useState } from 'react';
import { REWARDED_AD } from './adConfig';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    googletag: any;
  }
}

interface RewardPayload {
  amount: number;
  type: string;
}

type ModalType = 'grant' | 'loading' | '';

interface Props {
  active: boolean;
  preload?: boolean;
  onComplete: () => void;
}

export default function RewardedAd({ active, preload = false, onComplete }: Props) {
  const [modalType, setModalType] = useState<ModalType>('');
  const [modalMessage, setModalMessage] = useState('');
  const [adReady, setAdReady] = useState(false);
  const slotRef = useRef<unknown>(null);
  const readyEventRef = useRef<{ makeRewardedVisible: () => void } | null>(null);
  const rewardPayloadRef = useRef<RewardPayload | null>(null);
  const onCompleteRef = useRef(onComplete);
  const activeRef = useRef(active);
  const slotInitializedRef = useRef(false);
  onCompleteRef.current = onComplete;
  activeRef.current = active;

  function displayModal(type: ModalType = '', message = '') {
    setModalType(type);
    setModalMessage(message);
  }

  function showRewardedAd() {
    if (!readyEventRef.current) return;
    readyEventRef.current.makeRewardedVisible();
    displayModal();
  }

  function finishFlow() {
    displayModal();
    if (slotRef.current) {
      window.googletag.destroySlots([slotRef.current]);
      slotRef.current = null;
      slotInitializedRef.current = false;
    }
    onCompleteRef.current();
  }

  useEffect(() => {
    if (!preload || slotInitializedRef.current) return;

    window.googletag = window.googletag || { cmd: [] };

    window.googletag.cmd.push(() => {
      if (slotInitializedRef.current) return;

      const rewardedSlot = window.googletag.defineOutOfPageSlot(
        REWARDED_AD.adUnit,
        window.googletag.enums.OutOfPageFormat.REWARDED,
      );

      if (!rewardedSlot) return;

      slotInitializedRef.current = true;
      rewardedSlot.addService(window.googletag.pubads());
      slotRef.current = rewardedSlot;

      const pubads = window.googletag.pubads();

      pubads.addEventListener('rewardedSlotReady', (event: { makeRewardedVisible: () => void }) => {
        readyEventRef.current = event;
        setAdReady(true);
        if (activeRef.current) showRewardedAd();
      });

      pubads.addEventListener('rewardedSlotGranted', (event: { payload: RewardPayload }) => {
        rewardPayloadRef.current = event.payload;
      });

      pubads.addEventListener('rewardedSlotClosed', () => {
        if (rewardPayloadRef.current) {
          const { amount, type } = rewardPayloadRef.current;
          displayModal('grant', `You have been rewarded ${amount} ${type}!`);
          rewardPayloadRef.current = null;
        } else {
          finishFlow();
        }
      });

      pubads.addEventListener('slotRenderEnded', (event: { slot: unknown; isEmpty: boolean }) => {
        if (event.slot === rewardedSlot && event.isEmpty && activeRef.current) {
          finishFlow();
        }
      });

      window.googletag.enableServices();
      window.googletag.display(rewardedSlot);
      pubads.refresh([rewardedSlot]);
    });
  }, [preload, active]);

  useEffect(() => {
    return () => {
      if (slotRef.current && window.googletag?.destroySlots) {
        window.googletag.cmd.push(() => {
          window.googletag.destroySlots([slotRef.current]);
          slotRef.current = null;
          slotInitializedRef.current = false;
        });
      }
    };
  }, []);

  useEffect(() => {
    if (!active) { displayModal(); return; }
    rewardPayloadRef.current = null;
    if (adReady) showRewardedAd();
    else displayModal('loading', 'Loading rewarded ad…');
  }, [active, adReady]);

  if (!active || !modalType) return null;

  return (
    <div id="modal" className="rewarded-gpt-modal" data-type={modalType || undefined}>
      <div className="rewarded-gpt-modalDialog">
        <p id="modalMessage">{modalMessage}</p>
        {modalType === 'loading' && (
          <div className="rewarded-ad-buttons rewarded-ad-buttons--reward">
            <input type="button" value="Loading…" disabled />
            <input type="button" className="rewarded-ad-skip-btn" value="Skip" onClick={finishFlow} />
          </div>
        )}
        {modalType === 'grant' && (
          <div className="grantButtons">
            <input type="button" value="Continue" onClick={finishFlow} />
          </div>
        )}
      </div>
    </div>
  );
}
