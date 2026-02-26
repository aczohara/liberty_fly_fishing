import { useState, useEffect } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease',
        backgroundColor: scrolled ? 'rgba(24, 51, 70, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.1)' : 'none',
        padding: scrolled ? '1rem 0' : '1.5rem 0'
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="logo" style={{
          fontSize: '1.5rem',
          fontFamily: 'var(--font-heading)',
          color: 'white',
          fontWeight: 800,
          textShadow: scrolled ? 'none' : '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          LIBERTY FLY FISHING
        </div>

        <button
          onClick={toggleMenu}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '2rem',
            cursor: 'pointer'
          }}
          className="mobile-toggle"
        >
          ☰
        </button>

        <nav className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <ul style={{ display: 'flex', gap: '2rem', margin: 0, padding: 0, alignItems: 'center' }}>
            {['About', 'Trips', 'Locations'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  style={{
                    color: 'white',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    fontSize: '0.9rem',
                    letterSpacing: '0.05em',
                    position: 'relative',
                    textShadow: scrolled ? 'none' : '0 2px 4px rgba(0,0,0,0.3)'
                  }}
                  className="nav-link"
                >
                  {item}
                </a>
              </li>
            ))}
            <li><a href="#contact" className="btn" onClick={() => setIsOpen(false)}>Book Now</a></li>
          </ul>
        </nav>
      </div>
      <style>{`
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 0;
          background-color: var(--color-accent);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        @media (max-width: 768px) {
          header {
            background-color: var(--color-primary) !important; /* Always solid on mobile open usually, or keep semi */
          }
          .mobile-toggle {
            display: block !important;
          }
          .nav-menu {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: var(--color-primary);
            padding: 2rem;
            text-align: center;
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          }
          .nav-menu.active {
            display: block;
          }
          .nav-menu ul {
            flex-direction: column;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </header>
  );
}
