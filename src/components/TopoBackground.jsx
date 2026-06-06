// Renders the contour lines image zoomed-in and cropped to a specific region.
// A CSS mask fades all four edges so the image boundary is never visible.
export default function TopoBackground({
    position = '50% 50%',
    opacity = 0.18,
    dark = false,
}) {
    // Fade-in distance from each edge before full opacity kicks in.
    const fade = '18%';

    return (
        <img
            aria-hidden="true"
            alt=""
            src="/images/background_countour_lines.png?v=2"
            style={{
                position: 'absolute',
                inset: '-20%',
                width: '140%',
                height: '140%',
                objectFit: 'cover',
                objectPosition: position,
                opacity,
                mixBlendMode: dark ? 'screen' : 'multiply',
                // Fade all four edges so no hard boundary is ever visible
                WebkitMaskImage: `
                    linear-gradient(to right,  transparent 0%, black ${fade}, black calc(100% - ${fade}), transparent 100%),
                    linear-gradient(to bottom, transparent 0%, black ${fade}, black calc(100% - ${fade}), transparent 100%)
                `,
                WebkitMaskComposite: 'source-in',
                maskImage: `
                    linear-gradient(to right,  transparent 0%, black ${fade}, black calc(100% - ${fade}), transparent 100%),
                    linear-gradient(to bottom, transparent 0%, black ${fade}, black calc(100% - ${fade}), transparent 100%)
                `,
                maskComposite: 'intersect',
                pointerEvents: 'none',
                zIndex: 0,
                userSelect: 'none',
            }}
        />
    );
}
