import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import Home from './pages/Home';
import Games from './pages/Games';
import GameDetails from './pages/GameDetails';
import Community from './pages/Community';
import Tournaments from './pages/Tournaments';
import './styles/globals.css';

function App() {
  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const initSmoothScrolling = async () => {
      try {
        const Lenis = (await import('lenis')).default;
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          gestureDirection: 'vertical',
          smooth: true,
          mouseMultiplier: 1,
          smoothTouch: false,
          touchMultiplier: 2,
          infinite: false,
        });

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
      } catch (error) {
        console.log('Lenis not available, using default scrolling');
      }
    };

    initSmoothScrolling();

    // Set initial theme
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  return (
    <GameProvider>
      <Router>
        <div className="App">
          <ParticleBackground />
          <div className="parallax-bg"></div>
          <Navbar />
          
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/games" element={<Games />} />
              <Route path="/game/:id" element={<GameDetails />} />
              <Route path="/community" element={<Community />} />
              <Route path="/tournaments" element={<Tournaments />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;