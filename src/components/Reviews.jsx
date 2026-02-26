export default function Reviews() {
    const reviews = [
        { name: "Jessica Luiz", text: "My fiancé and I had a wonderful time fly fishing with Patrick. He made everything so easy and fun. As it was our first time fly fishing, Patrick was a great teacher.", stars: 5 },
        { name: "M 3 Properties", text: "Great Experience using this Guide Service. We had three boats and 5 people and each of the three guides were excellent in teaching fly fishing.", stars: 5 },
        { name: "Chandler C", text: "Great experience using Liberty! We had three total guides and they were all Fantastic. They put each of us on fish and put in effort the entire float trip.", stars: 5 }
    ];

    return (
        <section id="reviews" style={{ backgroundColor: 'var(--color-bg-off-white)' }}>
            <div className="container">
                <h2 style={{ textAlign: 'center', marginBottom: '4rem' }}>Why Our Guests Love Us</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                    {reviews.map((review, index) => (
                        <div key={index} className="card">
                            <div style={{ color: 'var(--color-accent)', marginBottom: '1rem', fontSize: '1.2rem' }}>
                                {"★".repeat(review.stars)}
                            </div>
                            <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: '1.8' }}>"{review.text}"</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '40px', height: '40px', background: '#ddd', borderRadius: '50%' }}></div>
                                <p style={{ fontWeight: '800', margin: 0, textTransform: 'uppercase', fontSize: '0.9rem' }}>{review.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
