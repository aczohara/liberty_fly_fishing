import { useState, useEffect, useRef } from 'react';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const INTERVAL_MS = 4500;
const IMAGE_SIZE = 'w1600';

function imageUrl(fileId) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=${IMAGE_SIZE}`;
}

export default function DriveCarousel({ folderId, altPrefix = 'Gallery photo' }) {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'empty' | 'error'
    const [isPaused, setIsPaused] = useState(false);
    const [resetKey, setResetKey] = useState(0);

    // Fetch image list from Drive API
    useEffect(() => {
        if (!API_KEY || !folderId) {
            setStatus('error');
            return;
        }

        const params = new URLSearchParams({
            q: `'${folderId}' in parents`,
            key: API_KEY,
            fields: 'files(id,name,mimeType)',
            orderBy: 'name',
            pageSize: '100',
        });

        fetch(`https://www.googleapis.com/drive/v3/files?${params}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setStatus('error');
                    return;
                }
                const imgs = (data.files || []).filter((f) =>
                    f.mimeType.startsWith('image/')
                );
                if (imgs.length === 0) {
                    setStatus('empty');
                } else {
                    setImages(imgs);
                    setStatus('ready');
                }
            })
            .catch(() => setStatus('error'));
    }, [folderId]);

    // Auto-advance — resets whenever user manually navigates (resetKey changes)
    useEffect(() => {
        if (status !== 'ready' || images.length <= 1 || isPaused) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, INTERVAL_MS);
        return () => clearInterval(timer);
    }, [status, images.length, isPaused, resetKey]);

    const navigate = (newIndex) => {
        setCurrentIndex((newIndex + images.length) % images.length);
        setResetKey((k) => k + 1);
    };

    // ── Loading ──
    if (status === 'loading') {
        return (
            <div style={placeholderStyle}>
                <span style={placeholderTextStyle}>Loading gallery…</span>
            </div>
        );
    }

    // ── Error or empty ──
    if (status !== 'ready') {
        return (
            <div style={placeholderStyle}>
                <span style={placeholderTextStyle}>Photos coming soon.</span>
            </div>
        );
    }

    // ── Carousel ──
    return (
        <div
            style={{ position: 'relative', userSelect: 'none' }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Image stack */}
            <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 9',
                overflow: 'hidden',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#000',
            }}>
                {images.map((img, i) => (
                    <img
                        key={img.id}
                        src={imageUrl(img.id)}
                        alt={`${altPrefix} ${i + 1}`}
                        loading="lazy"
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: i === currentIndex ? 1 : 0,
                            transition: 'opacity 0.55s ease',
                            pointerEvents: 'none',
                        }}
                    />
                ))}

                {/* Left arrow */}
                {images.length > 1 && (
                    <button
                        aria-label="Previous photo"
                        onClick={() => navigate(currentIndex - 1)}
                        style={arrowBtn('left')}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(24,51,70,0.9)')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(24,51,70,0.55)')}
                    >
                        ‹
                    </button>
                )}

                {/* Right arrow */}
                {images.length > 1 && (
                    <button
                        aria-label="Next photo"
                        onClick={() => navigate(currentIndex + 1)}
                        style={arrowBtn('right')}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(24,51,70,0.9)')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(24,51,70,0.55)')}
                    >
                        ›
                    </button>
                )}

                {/* Counter badge */}
                {images.length > 1 && (
                    <div style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        backgroundColor: 'rgba(24,51,70,0.65)',
                        backdropFilter: 'blur(4px)',
                        color: 'rgba(255,255,255,0.85)',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.7rem',
                        letterSpacing: '0.08em',
                        fontWeight: 700,
                        padding: '0.3rem 0.65rem',
                        borderRadius: '999px',
                        pointerEvents: 'none',
                    }}>
                        {currentIndex + 1} / {images.length}
                    </div>
                )}
            </div>

            {/* Dot indicators */}
            {images.length > 1 && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    marginTop: '1.25rem',
                    flexWrap: 'wrap',
                }}>
                    {images.map((_, i) => (
                        <button
                            key={i}
                            aria-label={`Go to photo ${i + 1}`}
                            onClick={() => navigate(i)}
                            style={{
                                width: i === currentIndex ? '28px' : '8px',
                                height: '8px',
                                borderRadius: '4px',
                                border: 'none',
                                padding: 0,
                                cursor: 'pointer',
                                backgroundColor: i === currentIndex
                                    ? 'var(--color-accent)'
                                    : 'rgba(255,255,255,0.3)',
                                transition: 'all 0.35s ease',
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

const placeholderStyle = {
    width: '100%',
    aspectRatio: '16 / 9',
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

function arrowBtn(side) {
    return {
        position: 'absolute',
        top: '50%',
        [side]: '0.75rem',
        transform: 'translateY(-50%)',
        backgroundColor: 'rgba(24,51,70,0.55)',
        backdropFilter: 'blur(6px)',
        border: '1px solid rgba(255,255,255,0.15)',
        color: 'white',
        fontSize: '2rem',
        lineHeight: 1,
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.2s ease',
        zIndex: 2,
    };
}
