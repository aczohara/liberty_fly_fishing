import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileBookingBar from './components/MobileBookingBar';
import HomePage from './pages/HomePage';

const ColoradoPage  = lazy(() => import('./pages/ColoradoPage'));
const LouisianaPage = lazy(() => import('./pages/LouisianaPage'));

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

function App() {
    return (
        <div className="app">
            <ScrollToTop />
            <Header />
            <main id="main">
                <Suspense fallback={<div style={{ minHeight: '100vh', backgroundColor: 'var(--color-primary)' }} />}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/colorado" element={<ColoradoPage />} />
                        <Route path="/louisiana" element={<LouisianaPage />} />
                    </Routes>
                </Suspense>
            </main>
            <Footer />
            <MobileBookingBar />
        </div>
    );
}

export default App;
