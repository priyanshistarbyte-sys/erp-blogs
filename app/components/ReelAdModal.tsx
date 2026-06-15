'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Heart, MessageCircle, Send, Bookmark, Music2, X } from 'lucide-react';
import RewardedAd from './RewardedAd';

const REELS = [
  'https://cdn.shopify.com/videos/c/o/v/741dece73c4047b888266539b097d42e.mp4',
  'https://cdn.shopify.com/videos/c/o/v/22afbc4901a242418ccca724ed9c7730.mp4',
  'https://cdn.shopify.com/videos/c/o/v/df819be8cca648c8b87363a4147b043f.mp4',
  'https://cdn.shopify.com/videos/c/o/v/2f4f3cd4df6849829a948d2c1bb415b5.mp4',
  'https://cdn.shopify.com/videos/c/o/v/412371b3d3bc49958f2f13c56bb9ab58.mp4',
];

const BATCH1 = REELS.slice(0, 3);
const BATCH2 = REELS.slice(3);

type Phase = 'batch1' | 'rewarded' | 'batch2';

interface Props { onClose: () => void; }

export default function ReelAdModal({ onClose }: Props) {
  const [phase, setPhase] = useState<Phase>('batch1');
  const [current, setCurrent] = useState(0);
  const [likes, setLikes] = useState(() =>
    REELS.map(() => ({ liked: false, count: Math.floor(Math.random() * 4000) + 800 }))
  );
  const [bookmarks, setBookmarks] = useState(() => REELS.map(() => false));
  const containerRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(0);
  const phaseRef = useRef<Phase>('batch1');
  const isScrolling = useRef(false);

  phaseRef.current = phase;

  const activeReels = phase === 'batch2' ? BATCH2 : BATCH1;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.getElementById('page-content')?.classList.add('page-blurred');
    return () => {
      document.body.style.overflow = prev;
      document.getElementById('page-content')?.classList.remove('page-blurred');
    };
  }, []);

  const getScrollIndex = useCallback(() => {
    const el = containerRef.current;
    if (!el || el.clientHeight === 0) return 0;
    return Math.min(
      Math.round(el.scrollTop / el.clientHeight),
      activeReels.length - 1,
    );
  }, [activeReels.length]);

  const triggerRewardAd = useCallback(() => {
    if (phaseRef.current !== 'batch1') return;
    setPhase('rewarded');
  }, []);

  const scrollToReel = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;
    container.querySelectorAll('.reel-snap-slide')[index]?.scrollIntoView({ behavior: 'smooth' });
    currentRef.current = index;
    setCurrent(index);
  }, []);

  const goToNextReel = useCallback(() => {
    const idx = getScrollIndex();
    currentRef.current = idx;
    setCurrent(idx);

    if (phaseRef.current === 'batch1' && idx >= BATCH1.length - 1) {
      triggerRewardAd();
      return;
    }
    if (phaseRef.current === 'batch2' && idx >= BATCH2.length - 1) {
      onClose();
      return;
    }
    scrollToReel(idx + 1);
  }, [getScrollIndex, triggerRewardAd, scrollToReel, onClose]);

  const goToPrevReel = useCallback(() => {
    const idx = getScrollIndex();
    if (idx > 0) scrollToReel(idx - 1);
  }, [getScrollIndex, scrollToReel]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || phase === 'rewarded') return;
    container.querySelectorAll<HTMLVideoElement>('video').forEach((v, i) => {
      if (i === current) v.play().catch(() => {});
      else { v.pause(); v.currentTime = 0; }
    });
  }, [current, phase, activeReels.length]);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el || phaseRef.current === 'rewarded') return;
    const idx = getScrollIndex();
    currentRef.current = idx;
    setCurrent(idx);
  }, [getScrollIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || phase === 'rewarded') return;
    let startY = 0;

    const onTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };

    const onTouchEnd = (e: TouchEvent) => {
      if (isScrolling.current) return;
      const diff = startY - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 40) return;
      isScrolling.current = true;
      if (diff > 0) goToNextReel();
      else goToPrevReel();
      setTimeout(() => { isScrolling.current = false; }, 500);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;
      if (Math.abs(e.deltaY) < 20) return;
      isScrolling.current = true;
      if (e.deltaY > 0) goToNextReel();
      else goToPrevReel();
      setTimeout(() => { isScrolling.current = false; }, 500);
    };

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchend', onTouchEnd, { passive: true });
    container.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchend', onTouchEnd);
      container.removeEventListener('wheel', onWheel);
    };
  }, [phase, goToNextReel, goToPrevReel]);

  useEffect(() => {
    if (phase !== 'batch2') return;
    const container = containerRef.current;
    if (container) container.scrollTop = 0;
    currentRef.current = 0;
    setCurrent(0);
  }, [phase]);

  function handleRewardAdComplete() {
    currentRef.current = 0;
    setCurrent(0);
    setPhase('batch2');
  }

  const toggleLike = useCallback((i: number) => {
    setLikes((prev) => prev.map((l, idx) =>
      idx === i ? { liked: !l.liked, count: l.liked ? l.count - 1 : l.count + 1 } : l
    ));
  }, []);

  const toggleBookmark = useCallback((i: number) => {
    setBookmarks((prev) => prev.map((b, idx) => idx === i ? !b : b));
  }, []);

  return createPortal(
    <div className="reel-ad-backdrop">
      {/* Preload rewarded ad slot while user watches reels 1–3 */}
      <RewardedAd preload active={phase === 'rewarded'} onComplete={handleRewardAdComplete} />

      <div className={`reel-ad-popup${phase === 'rewarded' ? ' reel-ad-popup--dimmed' : ''}`}>
        <button className="reel-ad-close" onClick={onClose} aria-label="Close"><X size={20} /></button>
        <div ref={containerRef} className="reel-snap-container" onScroll={handleScroll}>
          {activeReels.map((src, i) => {
            const slideGlobalIndex = phase === 'batch2' ? i + BATCH1.length : i;
            const like = likes[slideGlobalIndex] ?? { liked: false, count: 0 };
            const bookmarked = bookmarks[slideGlobalIndex] ?? false;
            const slideLabel = phase === 'batch2'
              ? `${i + 1 + BATCH1.length} / ${REELS.length}`
              : `${i + 1} / ${BATCH1.length}`;

            return (
            <div key={`${phase}-${src}`} className="reel-snap-slide" data-index={i}>
              <video src={src} playsInline loop muted className="reel-ad-video" />

              {/* <div className="reel-ad-top">
                <span className="reel-ad-badge">Ad</span>
                <span className="reel-ad-countdown">{slideLabel}</span>
              </div> */}

              <div className="reel-ad-bottom">
                <div className="reel-ad-user">
                  <div className="reel-ad-avatar">E</div>
                  <span className="reel-ad-username">@erpblogs</span>
                  <button className="reel-ad-follow">Follow</button>
                </div>
                <p className="reel-ad-caption">Discover the best ERP solutions 🚀 #ERP #Business</p>
              </div>

              <div className="reel-ad-actions">
                <button className="reel-action-btn" onClick={() => toggleLike(slideGlobalIndex)}>
                  <Heart size={30} fill={like.liked ? '#ff3040' : 'none'} stroke={like.liked ? '#ff3040' : '#fff'} strokeWidth={2} />
                  <span>{like.count.toLocaleString()}</span>
                </button>
                <button className="reel-action-btn">
                  <MessageCircle size={30} fill="none" stroke="#fff" strokeWidth={2} />
                  <span>Comment</span>
                </button>
                <button className="reel-action-btn">
                  <Send size={28} fill="none" stroke="#fff" strokeWidth={2} />
                  <span>Share</span>
                </button>
                <button className="reel-action-btn" onClick={() => toggleBookmark(slideGlobalIndex)}>
                  <Bookmark size={28} fill={bookmarked ? '#fff' : 'none'} stroke="#fff" strokeWidth={2} />
                  <span>Save</span>
                </button>
                <div className="reel-action-music-disc">
                  <Music2 size={18} stroke="#fff" strokeWidth={2} />
                </div>
              </div>

              {phase === 'batch1' && i === BATCH1.length - 1 && (
                <div className="reel-swipe-hint">Swipe up for more</div>
              )}
              {phase === 'batch2' && i === BATCH2.length - 1 && (
                <div className="reel-swipe-hint">Swipe up to read article</div>
              )}
            </div>
            );
          })}
        </div>
      </div>
    </div>,
    document.body,
  );
}
