'use client';
import { useEffect, useRef } from 'react';
import { ANCHOR_AD } from './adConfig';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    googletag: any;
  }
}

export default function AnchorAd() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const slotRef = useRef<any>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;

    window.googletag = window.googletag || { cmd: [] };

    window.googletag.cmd.push(() => {
      if (initializedRef.current) return;

      const isMobile = document.body.clientWidth <= ANCHOR_AD.mobileBreakpoint;
      const format = isMobile
        ? window.googletag.enums.OutOfPageFormat.TOP_ANCHOR
        : window.googletag.enums.OutOfPageFormat.BOTTOM_ANCHOR;

      const anchorSlot = window.googletag.defineOutOfPageSlot(ANCHOR_AD.adUnit, format);
      if (!anchorSlot) return;

      initializedRef.current = true;
      slotRef.current = anchorSlot;

      anchorSlot.addService(window.googletag.pubads());
      window.googletag.display(anchorSlot);
      window.googletag.pubads().refresh([anchorSlot]);
    });

    return () => {
      if (slotRef.current && window.googletag?.destroySlots) {
        window.googletag.cmd.push(() => {
          window.googletag.destroySlots([slotRef.current]);
          slotRef.current = null;
          initializedRef.current = false;
        });
      }
    };
  }, []);

  return null;
}
