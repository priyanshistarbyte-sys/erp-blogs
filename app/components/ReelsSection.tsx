'use client';
import { useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const REELS = [
  { src: 'https://cdn.shopify.com/videos/c/o/v/741dece73c4047b888266539b097d42e.mp4', label: 'Top ERP Tips' },
  { src: 'https://cdn.shopify.com/videos/c/o/v/22afbc4901a242418ccca724ed9c7730.mp4', label: 'Cloud ERP 2025' },
  { src: 'https://cdn.shopify.com/videos/c/o/v/df819be8cca648c8b87363a4147b043f.mp4', label: 'Debt Solutions' },
  { src: 'https://cdn.shopify.com/videos/c/o/v/2f4f3cd4df6849829a948d2c1bb415b5.mp4', label: 'CRM for Advisors' },
  { src: 'https://cdn.shopify.com/videos/c/o/v/412371b3d3bc49958f2f13c56bb9ab58.mp4', label: 'Insurance Quotes' },
];

function ReelCard({ src, label, onOpen }: { src: string; label: string; onOpen: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);

  return (
    <div
      className="reel-card"
      onMouseEnter={() => ref.current?.play()}
      onMouseLeave={() => { if (ref.current) { ref.current.pause(); ref.current.currentTime = 0; } }}
      onClick={onOpen}
    >
      <div className="reel-img-wrap">
        <video ref={ref} src={src} muted loop playsInline preload="metadata" className="reel-video" />
        <div className="reel-overlay"><span className="reel-play">▶</span></div>
      </div>
      <p className="reel-caption">{label}</p>
    </div>
  );
}

export default function ReelsSection() {
  const searchParams = useSearchParams();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  if (searchParams.get('source') !== 'ads') return null;

  return (
    <>
      <div className="reels-section">
        <div className="reels-label">🔥 Trending</div>
        <div className="reels-track">
          {REELS.map((r) => (
            <ReelCard key={r.src} src={r.src} label={r.label} onOpen={() => setActiveVideo(r.src)} />
          ))}
        </div>
      </div>

      {activeVideo && (
        <div className="reel-modal" onClick={() => setActiveVideo(null)}>
          <video src={activeVideo} autoPlay controls playsInline className="reel-modal-video" onClick={(e) => e.stopPropagation()} />
          <button className="reel-modal-close" onClick={() => setActiveVideo(null)}>✕</button>
        </div>
      )}
    </>
  );
}
