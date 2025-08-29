import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import './GameDetails.css';

const GameDetails = () => {
  const { id } = useParams();
  const { games } = useGame();
  const [activeTab, setActiveTab] = useState('overview');
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  const game = games.find(g => g.id === parseInt(id));

  if (!game) {
    return (
      <div className="game-details">
        <div className="container">
          <div className="not-found">
            <h2>Game not found</h2>
            <Link to="/games" className="btn btn-primary">Back to Games</Link>
          </div>
        </div>
      </div>
    );
  }

  const reviews = [
    { id: 1, user: "CyberNinja", rating: 5, comment: "Amazing graphics and gameplay!", date: "2 days ago" },
    { id: 2, user: "DragonMaster", rating: 4, comment: "Great game but could use more content.", date: "1 week ago" },
    { id: 3, user: "SpeedDemon", rating: 5, comment: "Best game I've played this year!", date: "2 weeks ago" }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'screenshots', label: 'Screenshots' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'requirements', label: 'System Requirements' }
  ];

  return (
    <div className="game-details">
      <div className="game-hero">
        <div className="hero-bg">
          <img src={game.banner} alt={game.title} />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="game-info">
              <h1 className="game-title orbitron">{game.title}</h1>
              <div className="game-meta">
                <span className="category">{game.category}</span>
                <span className="difficulty" style={{ 
                  color: game.difficulty === 'Easy' ? '#00ff88' : 
                        game.difficulty === 'Medium' ? '#ffaa00' : '#ff4444' 
                }}>
                  {game.difficulty}
                </span>
                <span className="release-date">Released: {game.releaseDate}</span>
              </div>
              <div className="game-stats">
                <div className="stat">
                  <span className="stat-value">{game.rating}</span>
                  <span className="stat-label">Rating</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{game.activePlayers.toLocaleString()}</span>
                  <span className="stat-label">Active Players</span>
                </div>
              </div>
            </div>
            
            <div className="game-actions">
              <button className="btn btn-primary btn-large pulse">
                Play Now
              </button>
              <button className="btn btn-secondary">
                Add to Wishlist
              </button>
              <button className="btn btn-secondary">
                Share Game
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container">
        <div className="game-content">
          <div className="tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="tab-content">
            {activeTab === 'overview' && (
              <motion.div
                className="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3>About This Game</h3>
                <p>{game.description}</p>
                
                <div className="trailer-section">
                  <h4>Game Trailer</h4>
                  <video controls className="game-trailer">
                    <source src={game.trailer} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </motion.div>
            )}

            {activeTab === 'screenshots' && (
              <motion.div
                className="screenshots"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="screenshot-viewer">
                  <img 
                    src={game.screenshots[currentScreenshot]} 
                    alt={`Screenshot ${currentScreenshot + 1}`}
                    className="main-screenshot"
                  />
                </div>
                <div className="screenshot-thumbnails">
                  {game.screenshots.map((screenshot, index) => (
                    <img
                      key={index}
                      src={screenshot}
                      alt={`Thumbnail ${index + 1}`}
                      className={`thumbnail ${index === currentScreenshot ? 'active' : ''}`}
                      onClick={() => setCurrentScreenshot(index)}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                className="reviews"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="reviews-header">
                  <h3>User Reviews</h3>
                  <button className="btn btn-primary">Write Review</button>
                </div>
                
                <div className="reviews-list">
                  {reviews.map(review => (
                    <div key={review.id} className="review-item">
                      <div className="review-header">
                        <span className="reviewer">{review.user}</span>
                        <div className="rating">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>
                              ⭐
                            </span>
                          ))}
                        </div>
                        <span className="review-date">{review.date}</span>
                      </div>
                      <p className="review-comment">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'requirements' && (
              <motion.div
                className="requirements"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="requirements-grid">
                  <div className="requirement-section">
                    <h4>Minimum Requirements</h4>
                    <p>{game.systemRequirements.minimum}</p>
                  </div>
                  <div className="requirement-section">
                    <h4>Recommended Requirements</h4>
                    <p>{game.systemRequirements.recommended}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;