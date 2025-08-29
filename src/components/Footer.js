import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <Link to="/" className="footer-logo">
              <span className="logo-text orbitron">GameZone</span>
            </Link>
            <p className="footer-description">
              The ultimate gaming platform where players connect, compete, and conquer.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">📷</a>
              <a href="#" className="social-link">🎮</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/games">Games</Link></li>
              <li><Link to="/community">Community</Link></li>
              <li><Link to="/tournaments">Tournaments</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <ul className="footer-links">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Bug Reports</a></li>
              <li><a href="#">System Status</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Legal</h4>
            <ul className="footer-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">DMCA</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-stats">
            <div className="stat">
              <span className="stat-number">1M+</span>
              <span className="stat-label">Players</span>
            </div>
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Games</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support</span>
            </div>
          </div>
          
          <div className="footer-copyright">
            <p>&copy; 2024 GameZone. All rights reserved. Built with ❤️ for gamers.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;