export default function License() {
    return (
        <section id="license" style={{ padding: '4rem 0', backgroundColor: '#f4f4f4', textAlign: 'center' }}>
            <div className="container">
                <div style={{ marginBottom: '4rem' }}>
                    <h2 style={{ color: 'var(--color-primary)' }}>Fishing License</h2>
                    <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                        Colorado requires a fishing license for all anglers 16 and older.
                    </p>
                    <a href="https://www.cpwshop.com/licensing.page" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                        Get Your Fishing License
                    </a>
                </div>

                <div>
                    <h2 style={{ color: 'var(--color-primary)' }}>Liability Waiver</h2>
                    <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                        Please download and sign the liability waiver before your trip.
                    </p>
                    <a href="#" className="btn">
                        Download Liability Form
                    </a>
                </div>
            </div>
        </section>
    );
}
