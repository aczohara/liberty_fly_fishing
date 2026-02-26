export default function Footer() {
    return (
        <footer style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '3rem 0', textAlign: 'center' }}>
            <div className="container">
                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ color: 'var(--color-accent)', marginBottom: '1rem' }}>Liberty Fly Fishing</h3>
                    <p>Outfitters License #660</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                    <a href="tel:+1234567890">Call Us</a>
                    <a href="mailto:info@libertyflyfishing.com">Email Us</a>
                    <a href="https://www.instagram.com/libertyflyfishing/" target="_blank" rel="noopener noreferrer">Instagram</a>
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                    &copy; {new Date().getFullYear()} Liberty Fly Fishing. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
