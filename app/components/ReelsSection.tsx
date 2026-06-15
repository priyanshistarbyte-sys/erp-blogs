'use client';
import { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useSearchParams } from 'next/navigation';

const REELS = [
  { src: 'https://cdn.shopify.com/videos/c/o/v/741dece73c4047b888266539b097d42e.mp4', label: 'Top ERP Tips' },
  { src: 'https://cdn.shopify.com/videos/c/o/v/22afbc4901a242418ccca724ed9c7730.mp4', label: 'Cloud ERP 2025' },
  { src: 'https://cdn.shopify.com/videos/c/o/v/df819be8cca648c8b87363a4147b043f.mp4', label: 'Debt Solutions' },
  { src: 'https://cdn.shopify.com/videos/c/o/v/2f4f3cd4df6849829a948d2c1bb415b5.mp4', label: 'CRM for Advisors' },
  { src: 'https://cdn.shopify.com/videos/c/o/v/412371b3d3bc49958f2f13c56bb9ab58.mp4', label: 'Insurance Quotes' },
];

function ReelItem({ src, label, isActive }: { src: string; label: string; isActive: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (isActive) {
      ref.current.play().catch(() => {});
    } else {
      ref.current.pause();
      ref.current.currentTime = 0;
    }
  }, [isActive]);

  return (
    <div className="reel-full-item">
      <video ref={ref} src={src} loop muted playsInline preload="metadata" className="reel-full-video" />
      <div className="reel-full-overlay">
        <span className="reel-full-label">{label}</span>
      </div>
    </div>
  );
}

export default function ReelsSection() {
  const searchParams = useSearchParams();
  const showReels = searchParams.get('source') === 'ads';
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const openIdxRef = useRef(0);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollTop / el.clientHeight);
    setActiveIdx(Math.min(idx, REELS.length - 1));
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('reels-fs-open');
    const el = containerRef.current;
    if (el) {
      requestAnimationFrame(() => {
        el.scrollTop = openIdxRef.current * el.clientHeight;
      });
    }
    return () => {
      document.body.style.overflow = prev;
      document.body.classList.remove('reels-fs-open');
    };
  }, [open]);

  const openReels = (idx = 0) => {
    openIdxRef.current = idx;
    setActiveIdx(idx);
    setOpen(true);
  };

  if (!showReels) return null;

  return (
    <>
      <div className="reels-section">
        <div className="reels-label">🔥 Trending</div>
        <div className="reels-track">
          {REELS.map((r, i) => (
            <div key={r.src} className="reel-card" onClick={() => openReels(i)}>
              <div className="reel-img-wrap">
                <video src={r.src} muted playsInline preload="metadata" className="reel-video" />
                <div className="reel-overlay"><span className="reel-play">▶</span></div>
              </div>
              <p className="reel-caption">{r.label}</p>
            </div>
          ))}
        </div>
      </div>

      {open && createPortal(
        <div className="reel-fs-backdrop">
          <button className="reel-fs-close" onClick={() => setOpen(false)}>✕</button>
          <div
            ref={containerRef}
            className="reel-fs-container"
            onScroll={handleScroll}
          >
            {REELS.map((r, i) => (
              <ReelItem key={r.src} src={r.src} label={r.label} isActive={i === activeIdx} />
            ))}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
