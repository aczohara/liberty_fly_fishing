import Hero from '../components/Hero';
import BrandIntro from '../components/BrandIntro';
import LocationCards from '../components/LocationCards';
import PhotoGallery from '../components/PhotoGallery';
import Reviews from '../components/Reviews';
import BookingCTA from '../components/BookingCTA';
import FullWidthPhoto from '../components/FullWidthPhoto';
import { allGallery, coloradoFeature, louisianaFeature } from '../data/galleryImages';

export default function HomePage() {
    return (
        <>
            <Hero
                headline="World-Class Guided Fly Fishing"
                headlineAccent="Colorado & Louisiana"
                subtitle="Blue-ribbon trout rivers and legendary redfish flats — guided by Patrick Gerig."
                ctaPrimary={{ label: 'Book Now', href: '#contact' }}
                ctaSecondary={{ label: 'Explore Locations', href: '#locations' }}
            />
            <BrandIntro />
            <FullWidthPhoto
                src={coloradoFeature}
                alt="Fly fishing Colorado's blue-ribbon trout rivers"
                label="Colorado"
                sublabel="Vail Valley & Roaring Fork Valley"
                link="/colorado"
                linkLabel="Explore Colorado Trips"
            />
            <LocationCards />
            <FullWidthPhoto
                src={louisianaFeature}
                alt="Sight fishing for redfish in the Louisiana marsh"
                label="Louisiana"
                sublabel="Biloxi Marsh · Southeast Louisiana"
                link="/louisiana"
                linkLabel="Explore Louisiana Trips"
            />
            <PhotoGallery
                images={allGallery}
                title="Life on the Water"
                altPrefix="Liberty Fly Fishing"
            />
            <Reviews />
            <BookingCTA />
        </>
    );
}
