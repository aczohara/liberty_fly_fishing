import { Link } from 'react-router-dom';

export default function FullWidthPhoto({ src, alt = '', label, sublabel, link, linkLabel }) {
    const inner = (
        <div style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(480px, 70vh, 860px)',
            overflow: 'hidden',
            backgroundColor: 'var(--color-primary-dark)',
            cursor: link ? 'pointer' : 'default',
        }}
            className={link ? 'fwp-linked' : ''}
        >
            <img
                src={src}
                alt={alt}
                style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'center',
                    transition: 'transform 0.7s ease',
                }}
                className="fwp-img"
                loading="lazy"
            />

            {/* Vignette */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, rgba(26,46,69,0.06) 0%, rgba(26,46,69,0.52) 100%)',
                pointerEvents: 'none',
                transition: 'opacity 0.4s ease',
            }}
                className="fwp-vignette"
            />

            {/* Label + CTA */}
            {label && (
                <div style={{
                    position: 'absolute',
                    bottom: '3rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    textAlign: 'center',
                    pointerEvents: 'none',
                }}>
                    <p style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 700,
                        fontSize: '0.68rem',
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                        color: 'var(--color-accent)',
                        marginBottom: '0.4rem',
                    }}>
                        {label}
                    </p>
                    {sublabel && (
                        <p style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                            fontWeight: 800,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: 'white',
                            margin: '0 0 1rem',
                            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                        }}>
                            {sublabel}
                        </p>
                    )}
                    {linkLabel && (
                        <div
                            className="fwp-cta-pill"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                backgroundColor: 'rgba(232,160,32,0.92)',
                                color: 'var(--color-primary)',
                                borderRadius: '999px',
                                padding: '0.5rem 1.3rem',
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 700,
                                fontSize: '0.72rem',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                                transition: 'transform 0.2s ease',
                                pointerEvents: 'auto',
                            }}
                        >
                            {linkLabel}
                        </div>
                    )}
                </div>
            )}
        </div>
    );

    return (
        <>
            {link ? <Link to={link} style={{ display: 'block', textDecoration: 'none' }}>{inner}</Link> : inner}
            <style>{`
                .fwp-linked:hover .fwp-img { transform: scale(1.04); }
                .fwp-linked:hover .fwp-vignette { opacity: 1.3; }
                .fwp-linked:hover .fwp-cta-pill { transform: translateY(-2px); }
            `}</style>
        </>
    );
}
