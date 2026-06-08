import InfiniteGallery from './InfiniteGallery';
import TopoBackground from './TopoBackground';

export default function PhotoGallery({ images = [], title = 'Life on the Water' }) {
    return (
        <section
            id="gallery"
            style={{
                padding: '5rem 0 0',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <TopoBackground position="85% 80%" opacity={0.13} dark={true} />
            <div style={{ position: 'relative', zIndex: 1 }}>
                <div className="container" style={{ paddingBottom: '3rem' }}>
                    <h2 style={{
                        textAlign: 'center',
                        color: 'white',
                        marginBottom: 0,
                        textTransform: 'none',
                        fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
                    }}>
                        {title}
                    </h2>
                </div>
                <InfiniteGallery images={images} />
            </div>
        </section>
    );
}
