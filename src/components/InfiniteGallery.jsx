import { useMemo, memo } from 'react';

// ── Constants ────────────────────────────────────────────────────────────────
const STRIP_H         = 600; // px — height of the gallery strip
const COL_GAP         = 10;  // px between columns
const IMG_GAP         = 8;   // px between stacked images inside one column
const PORTRAIT_EVERY  = 3;   // insert 1 portrait column after every N landscape columns
const DURATION        = 70;  // seconds for one full seamless loop

// Multi-image column templates — only landscape images use these.
// Edit `width` to change column widths. slots × splits must sum to 1.0.
const LANDSCAPE_TEMPLATES = [
    { slots: 2, splits: [0.58, 0.42], width: 290 },
    { slots: 2, splits: [0.42, 0.58], width: 255 },
    { slots: 3, splits: [0.35, 0.40, 0.25], width: 230 },
    { slots: 2, splits: [0.50, 0.50], width: 275 },
    { slots: 3, splits: [0.30, 0.42, 0.28], width: 250 },
    { slots: 2, splits: [0.45, 0.55], width: 265 },
];

// ── Deterministic shuffle ────────────────────────────────────────────────────
// Same input array → same shuffled order every page load (no hydration flicker).
// Seed is derived from the srcs so Colorado, Louisiana, and allGallery each
// produce a different but stable shuffle.
function xmur3(str) {
    let h = 1779033703 ^ str.length;
    for (let i = 0; i < str.length; i++) {
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
        h = (h << 13) | (h >>> 19);
    }
    return () => {
        h = Math.imul(h ^ (h >>> 16), 2246822507);
        h = Math.imul(h ^ (h >>> 13), 3266489909);
        return ((h ^= h >>> 16) >>> 0) / 0x100000000;
    };
}

function deterministicShuffle(arr) {
    if (arr.length < 2) return [...arr];
    const seed = arr.map(img => img.src).join('');
    const rand = xmur3(seed);
    const out = [...arr];
    for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
}

// ── Spacing queue ────────────────────────────────────────────────────────────
// Prevents the same image from appearing within `spacing` slots of itself.
function makeSpacingQueue(spacing) {
    const q = [];
    return {
        has: src => q.includes(src),
        add(src) { q.push(src); if (q.length > spacing) q.shift(); },
    };
}

// ── Column builder ───────────────────────────────────────────────────────────
// Returns column descriptors: { width, slots: [{ img, slotH }] }
function buildColumns(portraitImgs, landscapeImgs, totalCols) {
    const pQ = makeSpacingQueue(Math.max(portraitImgs.length - 1, 3));
    const lQ = makeSpacingQueue(Math.max(landscapeImgs.length - 1, 5));
    let pi = 0, li = 0;

    function pick(pool, idx, queue) {
        if (!pool.length) return { img: null, nextIdx: idx };
        let tries = 0;
        while (queue.has(pool[idx % pool.length].src) && tries < pool.length) { idx++; tries++; }
        const img = pool[idx % pool.length];
        queue.add(img.src);
        return { img, nextIdx: idx + 1 };
    }

    const cols = [];
    let landscapeCount = 0;
    let tmplIdx = 0;

    for (let ci = 0; ci < totalCols; ci++) {
        // Insert a portrait column after every PORTRAIT_EVERY landscape columns
        if (portraitImgs.length && landscapeCount >= PORTRAIT_EVERY) {
            const { img, nextIdx } = pick(portraitImgs, pi, pQ);
            pi = nextIdx;
            if (img) {
                const colW = (img.w && img.h) ? Math.round(STRIP_H * img.w / img.h) : 450;
                cols.push({ width: colW, slots: [{ img, slotH: STRIP_H }] });
                landscapeCount = 0;
                continue;
            }
        }

        // Landscape multi-image column
        const tmpl = LANDSCAPE_TEMPLATES[tmplIdx % LANDSCAPE_TEMPLATES.length];
        tmplIdx++;
        const innerH = STRIP_H - (tmpl.slots - 1) * IMG_GAP;
        const pool = landscapeImgs.length ? landscapeImgs : portraitImgs;
        const queue = landscapeImgs.length ? lQ : pQ;
        const slots = [];
        for (let s = 0; s < tmpl.slots; s++) {
            const { img, nextIdx } = pick(pool, li, queue);
            li = nextIdx;
            if (img) slots.push({ img, slotH: Math.round(innerH * tmpl.splits[s]) });
        }
        if (slots.length) cols.push({ width: tmpl.width, slots });
        landscapeCount++;
    }

    return cols;
}

// ── Component ────────────────────────────────────────────────────────────────
function InfiniteGallery({ images = [] }) {
    const track = useMemo(() => {
        if (!images.length) return [];

        // Shuffle each pool independently so similar photos don't cluster
        const portraitImgs  = deterministicShuffle(images.filter(img => img.portrait));
        const landscapeImgs = deterministicShuffle(images.filter(img => !img.portrait));

        const avgSlots  = LANDSCAPE_TEMPLATES.reduce((s, t) => s + t.slots, 0) / LANDSCAPE_TEMPLATES.length;
        const totalCols = Math.max(28, Math.ceil(images.length / avgSlots) * (1 + 1 / PORTRAIT_EVERY));
        const uniqueCols = buildColumns(portraitImgs, landscapeImgs, Math.ceil(totalCols));

        return [...uniqueCols, ...uniqueCols]; // doubled for seamless loop
    }, [images]);

    if (!track.length) return null;

    return (
        <div
            className="ig-wrapper"
            style={{
                overflow: 'hidden',
                lineHeight: 0,
                height: `${STRIP_H}px`,  // explicit height prevents layout recalc on image load
                contain: 'layout paint', // isolates gallery from page layout/paint
            }}
            onMouseEnter={e => e.currentTarget.classList.add('ig-paused')}
            onMouseLeave={e => e.currentTarget.classList.remove('ig-paused')}
        >
            <div
                className="ig-track"
                style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    width: 'max-content',
                    height: `${STRIP_H}px`,
                    animation: `ig-scroll ${DURATION}s linear infinite`,
                    willChange: 'transform',
                }}
            >
                {track.map((col, ci) => (
                    <div
                        key={ci}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: `${IMG_GAP}px`,
                            width: `${col.width}px`,
                            height: `${STRIP_H}px`,
                            flexShrink: 0,
                            marginRight: `${COL_GAP}px`,
                        }}
                    >
                        {col.slots.map(({ img, slotH }, si) => (
                            <div
                                key={si}
                                style={{ width: '100%', height: `${slotH}px`, flexShrink: 0, overflow: 'hidden' }}
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt || ''}
                                    decoding="async"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                        display: 'block',
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <style>{`
                @keyframes ig-scroll {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-50%); }
                }
                .ig-paused .ig-track { animation-play-state: paused; }
            `}</style>
        </div>
    );
}

export default memo(InfiniteGallery);
