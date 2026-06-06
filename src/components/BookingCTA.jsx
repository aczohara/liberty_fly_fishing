import { useState } from 'react';
import TopoBackground from './TopoBackground';

const trustPoints = [
    { icon: '⚡', text: 'Responds within 24 hours' },
    { icon: '📅', text: 'Dates fill fast — book early' },
    { icon: '🎣', text: 'All skill levels welcome' },
    { icon: '✅', text: 'No payment to inquire' },
];

export default function BookingCTA({ defaultLocation = '' }) {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', location: defaultLocation, message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you! Patrick will be in touch shortly. You can also reach him directly at patrick@libertyflyfishing.com or (504) 909-0428.");
        setFormData({ name: '', email: '', phone: '', location: defaultLocation, message: '' });
    };

    const inputStyle = {
        width: '100%',
        padding: '0.75rem 1rem',
        border: '1px solid #ddd',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.95rem',
        fontFamily: 'var(--font-body)',
        color: 'var(--color-text-dark)',
        backgroundColor: '#fff',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s ease',
        outline: 'none',
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '0.4rem',
        fontWeight: 700,
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.07em',
        color: 'var(--color-primary)',
    };

    return (
        <section id="contact" style={{
            padding: '5rem 0',
            backgroundColor: 'var(--color-bg-light)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <TopoBackground position="85% 10%" opacity={0.18} />
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>

                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <span className="overline" style={{ display: 'block', textAlign: 'center' }}>Get in Touch</span>
                    <h2 style={{
                        color: 'var(--color-primary)',
                        marginBottom: '0.75rem',
                        textTransform: 'none',
                        fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
                    }}>
                        Ready to Get on the Water?
                    </h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', maxWidth: '500px', margin: '0 auto' }}>
                        Patrick responds to all inquiries within 24 hours. Fill out the form or reach out directly.
                    </p>
                </div>

                {/* 2-col: trust panel + form */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1.7fr',
                    gap: '4rem',
                    alignItems: 'start',
                }}>

                    {/* Trust panel */}
                    <div>
                        {/* Star quote */}
                        <div style={{
                            backgroundColor: 'var(--color-bg-off-white)',
                            borderRadius: 'var(--radius-md)',
                            padding: '1.75rem',
                            marginBottom: '1.75rem',
                            borderLeft: '4px solid var(--color-accent)',
                            position: 'relative',
                        }}>
                            <div style={{ color: 'var(--color-accent)', fontSize: '0.85rem', letterSpacing: '2px', marginBottom: '0.75rem' }}>★★★★★</div>
                            <p style={{
                                fontStyle: 'italic',
                                fontSize: '0.95rem',
                                lineHeight: '1.75',
                                color: 'var(--color-text-dark)',
                                margin: '0 0 0.75rem',
                            }}>
                                &ldquo;Patrick is one of the BEST guides I've ever fished with. You will not be disappointed.&rdquo;
                            </p>
                            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-primary)', margin: 0 }}>
                                — Fred Carragher
                            </p>
                        </div>

                        {/* Trust points */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                            {trustPoints.map(p => (
                                <div key={p.text} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{p.icon}</span>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-dark)', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>{p.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Direct contact */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <a
                                href="tel:+15049090428"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.6rem',
                                    padding: '0.85rem 1.25rem',
                                    backgroundColor: 'var(--color-primary)',
                                    color: 'var(--color-accent)',
                                    borderRadius: 'var(--radius-sm)',
                                    fontFamily: 'var(--font-heading)',
                                    fontWeight: 700,
                                    fontSize: '0.85rem',
                                    letterSpacing: '0.05em',
                                    textDecoration: 'none',
                                    transition: 'background-color 0.2s',
                                }}
                            >
                                <span>📞</span> (504) 909-0428
                            </a>
                            <a
                                href="mailto:patrick@libertyflyfishing.com"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.6rem',
                                    padding: '0.7rem 1.25rem',
                                    backgroundColor: 'var(--color-bg-off-white)',
                                    color: 'var(--color-primary)',
                                    borderRadius: 'var(--radius-sm)',
                                    fontFamily: 'var(--font-heading)',
                                    fontWeight: 600,
                                    fontSize: '0.82rem',
                                    textDecoration: 'none',
                                    transition: 'background-color 0.2s',
                                }}
                            >
                                <span>✉️</span> patrick@libertyflyfishing.com
                            </a>
                            <a
                                href="https://www.instagram.com/libertyflyfishing/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.6rem',
                                    padding: '0.65rem 1.25rem',
                                    color: 'var(--color-text-muted)',
                                    fontFamily: 'var(--font-heading)',
                                    fontWeight: 600,
                                    fontSize: '0.8rem',
                                    textDecoration: 'none',
                                }}
                            >
                                <span>📸</span> @libertyflyfishing
                            </a>
                        </div>
                    </div>

                    {/* Form */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: 'var(--radius-md)',
                        padding: '2.5rem',
                        boxShadow: '0 4px 24px rgba(26,46,69,0.09)',
                        border: '1px solid rgba(26,46,69,0.07)',
                    }}>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div>
                                <label htmlFor="name" style={labelStyle}>Name</label>
                                <input type="text" id="name" name="name" value={formData.name}
                                    onChange={handleChange} required placeholder="Your full name" style={inputStyle} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label htmlFor="email" style={labelStyle}>Email</label>
                                    <input type="email" id="email" name="email" value={formData.email}
                                        onChange={handleChange} required placeholder="you@example.com" style={inputStyle} />
                                </div>
                                <div>
                                    <label htmlFor="phone" style={labelStyle}>
                                        Phone <span style={{ fontWeight: 400, textTransform: 'none', opacity: 0.6 }}>(optional)</span>
                                    </label>
                                    <input type="tel" id="phone" name="phone" value={formData.phone}
                                        onChange={handleChange} placeholder="(555) 000-0000" style={inputStyle} />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="location" style={labelStyle}>Location</label>
                                <select id="location" name="location" value={formData.location}
                                    onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}>
                                    <option value="">Select a location</option>
                                    <option value="Colorado">Colorado</option>
                                    <option value="Louisiana">Louisiana</option>
                                    <option value="Not sure yet">Not sure yet</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="message" style={labelStyle}>Message</label>
                                <textarea id="message" name="message" value={formData.message}
                                    onChange={handleChange} required rows="4"
                                    placeholder="Preferred dates, group size, experience level, or any questions for Patrick."
                                    style={{ ...inputStyle, resize: 'vertical' }}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{
                                    padding: '1rem',
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                Request My Trip
                            </button>
                            <p style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>
                                No payment required to inquire. Patrick will reach out to confirm availability.
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 860px) {
                    #contact .container > div:last-child {
                        grid-template-columns: 1fr !important;
                        gap: 2rem !important;
                    }
                }
            `}</style>
        </section>
    );
}
