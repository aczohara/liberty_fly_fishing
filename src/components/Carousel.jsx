import { useState, useEffect, useRef } from 'react';

const INTERVAL_MS = 2000;

export default function Carousel({ images = [], altPrefix = 'Gallery photo' }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [resetKey, setResetKey] = useState(0);
    const [visibleCount, setVisibleCount] = useState(3);
    const touchStartX = useRef(null);

    // Responsive visible count
    useEffect(() => {
        const update = () => {
            if (window.innerWidth >= 860) setVisibleCount(2);
            else setVisibleCount(1);
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    const maxIndex = Math.max(0, images.length - visibleCount);

    // Clamp currentIndex when visibleCount changes
    useEffect(() => {
        setCurrentIndex(prev => Math.min(prev, maxIndex));
    }, [maxIndex]);

    // Auto-advance every 2 seconds; resetKey restarts timer on manual nav
    useEffect(() => {
        if (images.length <= visibleCount || isPaused) return;
        const timer = setInterval(() => {
            setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
        }, INTERVAL_MS);
        return () => clearInterval(timer);
    }, [images.length, visibleCount, isPaused, maxIndex, resetKey]);

    const navigate = (delta) => {
        setCurrentIndex(prev => {
            const next = prev + delta;
            if (next > maxIndex) return 0;
            if (next < 0) return maxIndex;
            return next;
        });
        setResetKey(k => k + 1);
    };

    const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
    const handleTouchEnd = (e) => {
        if (touchStartX.current === null) return;
        const delta = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(delta) > 40) navigate(delta > 0 ? 1 : -1);
        touchStartX.current = null;
    };

    if (!images.length) {
        return (
            <div style={placeholderStyle}>
                <span style={placeholderTextStyle}>Photos coming soon.</span>
            </div>
        );
    }

    // ── CSS multi-image slide math ────────────────────────────────────────
    // Track width  = (N / K) * containerWidth   [N=total, K=visible]
    // Slide width  = containerWidth / K          = track / N
    // TranslateX i = -(i / N) * 100%  [% of track]
    const N = images.length;
    const K = visibleCount;
    const translatePct = (currentIndex / N) * 100;

    return (
        <div
            style={{ position: 'relative', userSelect: 'none' }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Strip */}
            <div style={{ position: 'relative' }}>
                <div style={{ overflow: 'hidden', borderRadius: 'var(--radius-md)' }}>
                    <div style={{
                        display: 'flex',
                        width: `calc(${N / K} * 100%)`,
                        transform: `translateX(-${translatePct}%)`,
                        transition: 'transform 0.45s ease',
                    }}>
                        {images.map((img, i) => (
                            <div
                                key={img.src + i}
                                style={{
                                    flex: `0 0 calc(100% / ${N})`,
                                    boxSizing: 'border-box',
                                    padding: '0 3px',
                                }}
                            >
                                <div
                                        className="photo-frame"
                                        style={{
                                            aspectRatio: '4 / 3',
                                            backgroundColor: '#0c1a28',
                                        }}
                                    >
                                        <img
                                            src={img.src}
                                            alt={img.alt || `${altPrefix} ${i + 1}`}
                                            loading={i < K * 2 ? 'eager' : 'lazy'}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                display: 'block',
                                            }}
                                        />
                                    </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Arrow buttons */}
                {N > K && (
                    <>
                        <ArrowBtn side="left" onClick={() => navigate(-1)} />
                        <ArrowBtn side="right" onClick={() => navigate(1)} />
                    </>
                )}
            </div>

            {/* Dot indicators */}
            {N > K && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    marginTop: '0.9rem',
                    flexWrap: 'wrap',
                }}>
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                        <button
                            key={i}
                            aria-label={`Go to position ${i + 1}`}
                            onClick={() => { setCurrentIndex(i); setResetKey(k => k + 1); }}
                            style={{
                                width: i === currentIndex ? '22px' : '7px',
                                height: '7px',
                                borderRadius: '3.5px',
                                border: 'none',
                                padding: 0,
                                cursor: 'pointer',
                                backgroundColor: i === currentIndex
                                    ? 'var(--color-accent)'
                                    : 'rgba(255,255,255,0.28)',
                                transition: 'all 0.3s ease',
                                flexShrink: 0,
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

function ArrowBtn({ side, onClick }) {
    const [hovered, setHovered] = useState(false);
    return (
        <button
            aria-label={side === 'left' ? 'Previous' : 'Next'}
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: 'absolute',
                top: '50%',
                [side]: '6px',
                transform: 'translateY(-50%)',
                backgroundColor: hovered ? 'rgba(26,46,69,0.92)' : 'rgba(26,46,69,0.58)',
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
                fontSize: '1.6rem',
                lineHeight: 1,
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.2s ease',
                zIndex: 2,
            }}
        >
            {side === 'left' ? '‹' : '›'}
        </button>
    );
}

const placeholderStyle = {
    width: '100%',
    aspectRatio: '1 / 1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid rgba(255,255,255,0.08)',
};

const placeholderTextStyle = {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.85rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.35)',
};
