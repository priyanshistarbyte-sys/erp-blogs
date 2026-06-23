'use client';
import { useEffect, useRef } from 'react';
import { DISPLAY_ADS, type DisplayAdSlot } from './adConfig';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    googletag: any;
  }
}

interface AdSlotProps {
  slot: DisplayAdSlot;
}

export default function AdSlot({ slot }: AdSlotProps) {
  const { adUnit, divId, sizes } = DISPLAY_ADS[slot];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gptSlotRef = useRef<any>(null);

  useEffect(() => {
    window.googletag = window.googletag || { cmd: [] };

    window.googletag.cmd.push(function () {
      if (gptSlotRef.current) {
        window.googletag.destroySlots([gptSlotRef.current]);
        gptSlotRef.current = null;
      }

      const gptSlot = window.googletag
        .defineSlot(adUnit, sizes, divId)
        ?.addService(window.googletag.pubads());

      if (!gptSlot) return;

      gptSlotRef.current = gptSlot;

      window.googletag.pubads().addEventListener(
        'slotRenderEnded',
        function (event: { slot: unknown; isEmpty: boolean }) {
          if (event.slot === gptSlot && event.isEmpty) {
            const el = document.getElementById(divId);
            if (el) el.style.display = 'none';
          }
        }
      );

      window.googletag.display(divId);
      window.googletag.pubads().refresh([gptSlot]);
    });

    return () => {
      if (gptSlotRef.current && window.googletag?.destroySlots) {
        window.googletag.cmd.push(function () {
          window.googletag.destroySlots([gptSlotRef.current]);
          gptSlotRef.current = null;
        });
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ad-container">
      <div id={divId} />
    </div>
  );
}
