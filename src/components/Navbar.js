import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, dispatch, activeUsers, backgroundMusic } = useGame();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'cyberpunk' : 'dark';
    dispatch({ type: 'SET_THEME', payload: newTheme });
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleMusic = () => {
    dispatch({ type: 'TOGGLE_MUSIC' });
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/games', label: 'Games' },
    { path: '/community', label: 'Community' },
    { path: '/tournaments', label: 'Tournaments' }
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="logo">
            <span className="logo-text orbitron">GameZone</span>
            <div className="logo-glow"></div>
          </Link>

          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="nav-controls">
            <div className="active-users">
              <span className="user-count">{activeUsers.toLocaleString()}</span>
              <span className="user-label">Online</span>
              <div className="pulse-dot"></div>
            </div>

            <button 
              className={`music-btn ${backgroundMusic ? 'active' : ''}`}
              onClick={toggleMusic}
              title={backgroundMusic ? 'Mute Music' : 'Play Music'}
            >
              {backgroundMusic ? '🔊' : '🔇'}
            </button>

            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Cyberpunk' : 'Dark'} theme`}
            >
              {theme === 'dark' ? '🌈' : '🌙'}
            </button>

            <button 
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;