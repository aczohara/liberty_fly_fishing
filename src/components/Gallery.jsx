export default function Gallery() {
    return (
        <section id="gallery" style={{ padding: '4rem 0', backgroundColor: '#183346', color: 'white' }}>
            <div className="container">
                <h2 style={{ textAlign: 'center', color: 'var(--color-accent)', marginBottom: '3rem' }}>Gallery</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} style={{ height: '250px', backgroundColor: '#ffffff20', borderRadius: '4px' }}></div>
                    ))}
                </div>
            </div>
        </section>
    );
}
