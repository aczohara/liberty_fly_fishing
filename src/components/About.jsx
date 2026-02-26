export default function About() {
    return (
        <section id="about" style={{ padding: '4rem 0', backgroundColor: 'var(--color-bg-light)' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                <div className="about-image">
                    <div style={{ width: '100%', height: '400px', backgroundColor: '#ddd', borderRadius: '8px' }}>
                        {/* Placeholder for About Image */}
                    </div>
                </div>
                <div className="about-text">
                    <h2 style={{ color: 'var(--color-primary)' }}>Our Story</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        At Liberty Fly Fishing, we believe that time on the water is time well spent.
                        Founded with a passion for the outdoors and a dedication to teaching, we offer
                        guided experiences that are both educational and exciting.
                    </p>
                    <p>
                        Whether you're holding a fly rod for the first time or looking to refine your
                        casting technique, our experienced guides ensure a safe, fun, and memorable day
                        on Colorado's beautiful rivers.
                    </p>
                </div>
            </div>
        </section>
    );
}
