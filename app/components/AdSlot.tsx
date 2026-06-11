'use client';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    googletag: any;
  }
}

const AD_CONFIG = {
  ad1: {
    adUnit: '/23324356353/hr1',
    divId: 'div-gpt-ad-1749819118863-0',
    sizes: [[300, 250], [336, 280], [300, 600], [320, 480], [250, 250]],
  },
  ad2: {
    adUnit: '/23324356353/hr2',
    divId: 'div-gpt-ad-1749819118864-0',
    sizes: [[300, 250], [336, 280], [300, 600], [320, 480], [250, 250]],
  },
} as const;

interface AdSlotProps {
  slot: 'ad1' | 'ad2';
}

export default function AdSlot({ slot }: AdSlotProps) {
  const { adUnit, divId, sizes } = AD_CONFIG[slot];
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
