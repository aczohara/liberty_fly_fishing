export default function Locations() {
    const locations = [
        { name: "South Platte River", description: "World-class tailwater fishing known for large trout and technical fishing." },
        { name: "Blue River", description: "Beautiful mountain setting with opportunities for brown and rainbow trout." },
        { name: "Colorado River", description: "Float trips on big water, targeting large wild trout." }
    ];

    return (
        <section id="locations" style={{ backgroundColor: 'white' }}>
            <div className="container">
                <h2 style={{ textAlign: 'center', marginBottom: '4rem' }}>Our Locations</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {locations.map((loc, index) => (
                        <div key={index} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                            <div style={{ height: '220px', backgroundColor: '#e9ecef', position: 'relative' }}>
                                {/* Image placeholder */}
                            </div>
                            <div style={{ padding: '2rem' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{loc.name}</h3>
                                <p style={{ color: 'var(--color-text-muted)' }}>{loc.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
