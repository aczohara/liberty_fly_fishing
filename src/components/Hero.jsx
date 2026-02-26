import heroBg from '../assets/hero_background.png';

export default function Hero() {
    return (
        <section style={{
            height: '100vh',
            position: 'relative',
            overflow: 'hidden',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 1rem',
            backgroundColor: '#183346'
        }}>
            {/* Background Image with Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(24, 51, 70, 0.4)', // Dark blue overlay for contrast
                    zIndex: 2,
                    backgroundImage: 'linear-gradient(to bottom, rgba(24,51,70,0.3), rgba(24,51,70,0.8))'
                }}></div>
                <img
                    src={heroBg}
                    alt="Fly fishing background"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center'
                    }}
                />
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <h1 className="animate-fade-in" style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                    marginBottom: '1.5rem',
                    textShadow: '0 4px 15px rgba(0,0,0,0.5)',
                    lineHeight: 1.1
                }}>
                    Guided Fly Fishing<br />
                    <span style={{ color: 'var(--color-accent)' }}>Experiences</span> in Colorado
                </h1>
                <p className="animate-fade-in" style={{
                    fontSize: '1.25rem',
                    marginBottom: '3rem',
                    maxWidth: '700px',
                    margin: '0 auto 3rem',
                    animationDelay: '0.2s',
                    opacity: 0, // handled by animation fill-mode
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                }}>
                    Professional, safe, and unforgettable trips for everyone from beginners to experts.
                </p>
                <div className="animate-fade-in" style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    animationDelay: '0.4s',
                    opacity: 0,
                    flexWrap: 'wrap'
                }}>
                    <a href="tel:+1234567890" className="btn btn-primary" style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem' }}>Call Us</a>
                    <a href="mailto:info@libertyflyfishing.com" className="btn" style={{
                        padding: '1.2rem 2.5rem',
                        fontSize: '1.1rem',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(5px)',
                        color: 'white',
                        border: '1px solid rgba(255,255,255,0.3)'
                    }}>Email Us</a>
                </div>
            </div>
        </section>
    );
}
