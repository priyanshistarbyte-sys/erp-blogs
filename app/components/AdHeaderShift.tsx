'use client';
import { useEffect } from 'react';

// Sets --ad-bar-height CSS variable so the sticky header shifts below the fixed ad bar.
export default function AdHeaderShift({ height }: { height: number }) {
  useEffect(() => {
    document.documentElement.style.setProperty('--ad-bar-height', `${height}px`);
    return () => {
      document.documentElement.style.setProperty('--ad-bar-height', '0px');
    };
  }, [height]);
  return null;
}
