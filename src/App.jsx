import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ColoradoPage from './pages/ColoradoPage';
import LouisianaPage from './pages/LouisianaPage';

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
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/colorado" element={<ColoradoPage />} />
                    <Route path="/louisiana" element={<LouisianaPage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
