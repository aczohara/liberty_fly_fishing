import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Locations from './components/Locations';
import Trips from './components/Trips';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import License from './components/License';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <About />
        <Locations />
        <Trips />
        <Gallery />
        <Reviews />
        <License />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
