'use client';
import { useEffect } from 'react';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    googletag: any;
  }
}

export default function GptInit() {
  useEffect(() => {
    window.googletag = window.googletag || { cmd: [] };
    window.googletag.cmd.push(function () {
      window.googletag.pubads().collapseEmptyDivs();
      window.googletag.pubads().disableInitialLoad();
      window.googletag.enableServices();
    });
  }, []);

  return null;
}
