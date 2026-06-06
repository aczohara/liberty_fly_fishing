import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '3rem 0', textAlign: 'center' }}>
            <div className="container">
                <div style={{ marginBottom: '2rem' }}>
                    <Link to="/" style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.4rem',
                        fontWeight: 800,
                        color: 'var(--color-accent)',
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        display: 'block',
                        marginBottom: '0.5rem'
                    }}>
                        Liberty Fly Fishing
                    </Link>
                    <p style={{ opacity: 0.7, fontSize: '0.9rem', margin: 0 }}>
                        Guided by Patrick Gerig &mdash; Colorado &amp; Louisiana
                    </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap', fontSize: '0.9rem' }}>
                    <Link to="/colorado" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Colorado</Link>
                    <Link to="/louisiana" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Louisiana</Link>
                    <a href="#contact" style={{ color: 'rgba(255,255,255,0.8)' }}>Book Now</a>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                    <a href="tel:+15049090428" style={{ color: 'white' }}>(504) 909-0428</a>
                    <a href="mailto:patrick@libertyflyfishing.com" style={{ color: 'white' }}>patrick@libertyflyfishing.com</a>
                    <a href="https://www.instagram.com/libertyflyfishing/" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>@libertyflyfishing</a>
                </div>

                <div style={{ fontSize: '0.8rem', opacity: 0.5, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                    <p style={{ margin: 0 }}>
                        Colorado Outfitter License #675 &nbsp;|&nbsp; USCG-Certified &nbsp;|&nbsp; Louisiana Commercial Saltwater License
                    </p>
                    <p style={{ margin: '0.5rem 0 0' }}>
                        &copy; {new Date().getFullYear()} Liberty Fly Fishing. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
