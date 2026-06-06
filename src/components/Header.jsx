import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
    const [isOpen, setIsOpen]   = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => { setIsOpen(false); }, [location.pathname]);

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { label: 'Colorado',  to: '/colorado' },
        { label: 'Louisiana', to: '/louisiana' },
    ];

    return (
        <header style={{
            position: 'fixed',
            top: 0, left: 0, right: 0,
            zIndex: 1000,
            transition: 'all 0.3s ease',
            backgroundColor: scrolled ? 'rgba(26,46,69,0.97)' : 'transparent',
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
            boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.18)' : 'none',
            padding: scrolled ? '0.45rem 0' : '0.7rem 0',
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
                    <img
                        src="/LIBERTY-FLYFISHING-LOGO-for%20dark-mode.svg"
                        alt="Liberty Fly Fishing"
                        style={{ height: '54px', width: 'auto', display: 'block', flexShrink: 0 }}
                    />
                </Link>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setIsOpen(v => !v)}
                    className="mobile-toggle"
                    aria-label="Toggle navigation"
                    style={{
                        display: 'none',
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        fontSize: '1.6rem',
                        cursor: 'pointer',
                        lineHeight: 1,
                    }}
                >
                    {isOpen ? '✕' : '☰'}
                </button>

                <nav className={`nav-menu ${isOpen ? 'active' : ''}`}>
                    <ul style={{ display: 'flex', gap: '2rem', margin: 0, padding: 0, alignItems: 'center' }}>
                        {navLinks.map(({ label, to }) => (
                            <li key={label}>
                                <Link
                                    to={to}
                                    onClick={() => setIsOpen(false)}
                                    className="nav-link"
                                    style={{
                                        color: 'white',
                                        fontFamily: 'var(--font-heading)',
                                        fontWeight: 800,
                                        textTransform: 'uppercase',
                                        fontSize: '0.78rem',
                                        letterSpacing: '0.1em',
                                        textDecoration: 'none',
                                        paddingBottom: '2px',
                                        borderBottom: isActive(to)
                                            ? '2px solid var(--color-accent)'
                                            : '2px solid transparent',
                                        transition: 'border-color 0.2s ease',
                                        textShadow: scrolled ? 'none' : '0 1px 4px rgba(0,0,0,0.35)',
                                    }}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            {/* Gold-filled primary CTA — highest visual priority in the nav */}
                            <a
                                href="#contact"
                                onClick={() => setIsOpen(false)}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    padding: '0.6rem 1.4rem',
                                    fontSize: '0.75rem',
                                    fontFamily: 'var(--font-heading)',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.08em',
                                    backgroundColor: 'var(--color-accent)',
                                    color: 'var(--color-primary)',
                                    borderRadius: 'var(--radius-sm)',
                                    textDecoration: 'none',
                                    transition: 'background-color 0.2s ease, transform 0.15s ease',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                }}
                                className="nav-book-btn"
                            >
                                Book Now
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

            <style>{`
                .nav-link:hover { border-bottom-color: var(--color-accent) !important; }
                .nav-book-btn:hover { background-color: var(--color-accent-hover) !important; transform: translateY(-1px); }
                @media (max-width: 768px) {
                    header { background-color: rgba(26,46,69,0.98) !important; backdrop-filter: blur(12px) !important; }
                    .mobile-toggle { display: block !important; }
                    .nav-menu { display: none; position: absolute; top: 100%; left: 0; right: 0;
                        background-color: var(--color-primary); padding: 1.5rem; text-align: center;
                        box-shadow: 0 12px 24px rgba(0,0,0,0.2); }
                    .nav-menu.active { display: block; }
                    .nav-menu ul { flex-direction: column; gap: 1.25rem !important; }
                }
            `}</style>
        </header>
    );
}
