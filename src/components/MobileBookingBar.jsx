import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

export default function MobileBookingBar() {
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const target = document.getElementById('contact');
        if (!target) return;
        const observer = new IntersectionObserver(
            ([entry]) => setHidden(entry.isIntersecting),
            { threshold: 0.1 }
        );
        observer.observe(target);
        return () => observer.disconnect();
    }, []);

    return (
        <div className={`mobile-booking-bar${hidden ? ' hidden' : ''}`} aria-hidden="true">
            <a
                href="tel:+15049090428"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'rgba(255,255,255,0.9)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    textDecoration: 'none',
                }}
            >
                <Phone size={16} strokeWidth={2} />
                (504) 909-0428
            </a>
            <a
                href="#contact"
                className="btn btn-primary"
                style={{
                    padding: '0.65rem 1.4rem',
                    fontSize: '0.78rem',
                    minHeight: '44px',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                Book Now
            </a>
        </div>
    );
}
