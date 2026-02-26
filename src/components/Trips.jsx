export default function Trips() {
    return (
        <section id="trips" style={{ backgroundColor: 'var(--color-bg-off-white)' }}>
            <div className="container">
                <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Guided Trips & Pricing</h2>
                <p style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 4rem', color: 'var(--color-text-muted)' }}>
                    Choose the perfect adventure for your group. All trips are led by experienced guides.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>

                    {/* Wade Trip Card */}
                    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ borderBottom: '1px solid #eee', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>Wade Trips</h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>Walk and wade on beautiful river sections.</p>
                        </div>

                        <div style={{ flex: 1 }}>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                                <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <span style={{ fontWeight: '700', display: 'block' }}>Half Day</span>
                                        <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>3 hours</span>
                                    </div>
                                    <span style={{ fontWeight: '800', fontSize: '1.25rem', color: 'var(--color-accent)' }}>$375</span>
                                </li>
                                <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <span style={{ fontWeight: '700', display: 'block' }}>3/4 Day</span>
                                        <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>5 hours</span>
                                    </div>
                                    <span style={{ fontWeight: '800', fontSize: '1.25rem', color: 'var(--color-accent)' }}>$475</span>
                                </li>
                                <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <span style={{ fontWeight: '700', display: 'block' }}>Full Day</span>
                                        <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>7-8 hours</span>
                                    </div>
                                    <span style={{ fontWeight: '800', fontSize: '1.25rem', color: 'var(--color-accent)' }}>$575</span>
                                </li>
                            </ul>

                            <div style={{ backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '4px', marginBottom: '2rem', fontSize: '0.9rem' }}>
                                <p style={{ marginBottom: '0.5rem' }}><strong>Includes:</strong> Rods, reels, waders, boots, and flies.</p>
                                <p style={{ marginBottom: '0.5rem' }}><strong>Full Day:</strong> Lunch included.</p>
                                <p style={{ margin: 0, color: 'var(--color-accent-hover)', fontWeight: 'bold' }}>+$75 per additional person</p>
                            </div>
                        </div>

                        <a href="#contact" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>Book a Wade Trip</a>
                    </div>

                    {/* Float Trip Card */}
                    <div className="card" style={{ display: 'flex', flexDirection: 'column', borderTop: '4px solid var(--color-accent)' }}>
                        <div style={{ borderBottom: '1px solid #eee', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>Float Trips</h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>Cover miles of river from a drift boat.</p>
                        </div>

                        <div style={{ flex: 1 }}>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                                <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <span style={{ fontWeight: '700', display: 'block' }}>Half Day</span>
                                        <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>3 hours</span>
                                    </div>
                                    <span style={{ fontWeight: '800', fontSize: '1.25rem', color: 'var(--color-accent)' }}>$550</span>
                                </li>
                                <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <span style={{ fontWeight: '700', display: 'block' }}>3/4 Day</span>
                                        <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>5 hours</span>
                                    </div>
                                    <span style={{ fontWeight: '800', fontSize: '1.25rem', color: 'var(--color-accent)' }}>$650</span>
                                </li>
                                <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <span style={{ fontWeight: '700', display: 'block' }}>Full Day</span>
                                        <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>7-8 hours</span>
                                    </div>
                                    <span style={{ fontWeight: '800', fontSize: '1.25rem', color: 'var(--color-accent)' }}>$800</span>
                                </li>
                            </ul>

                            <div style={{ backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '4px', marginBottom: '2rem', fontSize: '0.9rem' }}>
                                <p style={{ marginBottom: '0.5rem' }}><strong>Includes:</strong> Rods, reels, and flies.</p>
                                <p style={{ marginBottom: '0.5rem' }}><strong>Full Day:</strong> Lunch included.</p>
                                <p style={{ margin: 0 }}><strong>Max:</strong> 2 anglers per boat</p>
                            </div>
                        </div>

                        <a href="#contact" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>Book a Float Trip</a>
                    </div>

                </div>
            </div>
        </section>
    );
}
