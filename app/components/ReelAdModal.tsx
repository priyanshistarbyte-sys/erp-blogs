'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Heart, MessageCircle, Send, Bookmark, Music2 } from 'lucide-react';

const REELS = [
  'https://cdn.shopify.com/videos/c/o/v/741dece73c4047b888266539b097d42e.mp4',
  'https://cdn.shopify.com/videos/c/o/v/22afbc4901a242418ccca724ed9c7730.mp4',
  'https://cdn.shopify.com/videos/c/o/v/df819be8cca648c8b87363a4147b043f.mp4',
  'https://cdn.shopify.com/videos/c/o/v/2f4f3cd4df6849829a948d2c1bb415b5.mp4',
  'https://cdn.shopify.com/videos/c/o/v/412371b3d3bc49958f2f13c56bb9ab58.mp4',
];

interface Props {
  onClose: () => void;
}

export default function ReelAdModal({ onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [countdown, setCountdown] = useState(5);
  const [canSkip, setCanSkip] = useState(false);
  const [src] = useState(() => REELS[Math.floor(Math.random() * REELS.length)]);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 4000) + 800);

  useEffect(() => {
    document.getElementById('page-content')?.classList.add('page-blurred');
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { clearInterval(timer); setCanSkip(true); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
      document.getElementById('page-content')?.classList.remove('page-blurred');
    };
  }, []);

  return createPortal(
    <div className="reel-ad-backdrop">
      {/* Wrapper: modal + action buttons side by side */}
      <div className="reel-ad-wrapper">

        {/* Video modal */}
        <div className="reel-ad-modal">
          <video
            ref={videoRef}
            src={src}
            autoPlay
            playsInline
            loop
            className="reel-ad-video"
          />
          {/* Top bar */}
          {/* <div className="reel-ad-top">
            <span className="reel-ad-badge">Ad</span>
            {canSkip ? (
              <button className="reel-ad-skip" onClick={onClose}>Skip Ad ⟶</button>
            ) : (
              <span className="reel-ad-countdown">Skip in {countdown}s</span>
            )}
          </div> */}
          {/* Bottom user bar */}
          <div className="reel-ad-bottom">
            <div className="reel-ad-user">
              <div className="reel-ad-avatar">E</div>
              <span className="reel-ad-username">@erpblogs</span>
              <button className="reel-ad-follow">Follow</button>
            </div>
            <p className="reel-ad-caption">Discover the best ERP solutions 🚀 #ERP #Business</p>
          </div>
        </div>

        {/* Instagram-style action buttons — outside modal, always visible */}
        <div className="reel-ad-actions">
          <button
            className="reel-action-btn"
            onClick={() => { setLiked(v => !v); setLikeCount(c => liked ? c - 1 : c + 1); }}
          >
            <Heart
              size={30}
              fill={liked ? '#ff3040' : 'none'}
              stroke={liked ? '#ff3040' : '#ffffff'}
              strokeWidth={2}
            />
            <span>{likeCount.toLocaleString()}</span>
          </button>

          <button className="reel-action-btn">
            <MessageCircle size={30} fill="none" stroke="#ffffff" strokeWidth={2} />
            <span>Comment</span>
          </button>

          <button className="reel-action-btn">
            <Send size={28} fill="none" stroke="#ffffff" strokeWidth={2} />
            <span>Share</span>
          </button>

          <button
            className="reel-action-btn"
            onClick={() => setBookmarked(v => !v)}
          >
            <Bookmark
              size={28}
              fill={bookmarked ? '#ffffff' : 'none'}
              stroke="#ffffff"
              strokeWidth={2}
            />
            <span>Save</span>
          </button>

          <div className="reel-action-music-disc">
            <Music2 size={18} stroke="#ffffff" strokeWidth={2} />
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
}
