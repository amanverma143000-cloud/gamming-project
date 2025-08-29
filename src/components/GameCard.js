import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './GameCard.css';

const GameCard = ({ game, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#00ff88';
      case 'Medium': return '#ffaa00';
      case 'Hard': return '#ff4444';
      default: return '#cccccc';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'FPS': return '🎯';
      case 'RPG': return '⚔️';
      case 'Racing': return '🏎️';
      case 'Adventure': return '🗺️';
      default: return '🎮';
    }
  };

  return (
    <motion.div
      className="game-card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
    >
      <div className="game-image">
        <img src={game.banner} alt={game.title} />
        <div className="game-overlay">
          <div className="play-button">
            <span>▶</span>
          </div>
        </div>
        <div className="game-category">
          <span className="category-icon">{getCategoryIcon(game.category)}</span>
          <span>{game.category}</span>
        </div>
      </div>

      <div className="game-info">
        <h3 className="game-title">{game.title}</h3>
        <p className="game-description">{game.description}</p>
        
        <div className="game-stats">
          <div className="stat">
            <span className="stat-label">Rating</span>
            <div className="rating">
              <span className="rating-value">{game.rating}</span>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i} 
                    className={`star ${i < Math.floor(game.rating) ? 'filled' : ''}`}
                  >
                    ⭐
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="stat">
            <span className="stat-label">Players</span>
            <span className="stat-value">{game.activePlayers.toLocaleString()}</span>
          </div>
          
          <div className="stat">
            <span className="stat-label">Difficulty</span>
            <span 
              className="difficulty-badge"
              style={{ color: getDifficultyColor(game.difficulty) }}
            >
              {game.difficulty}
            </span>
          </div>
        </div>

        <div className="game-actions">
          <Link to={`/game/${game.id}`} className="btn btn-primary">
            View Details
          </Link>
          <button className="btn btn-secondary">
            Add to Wishlist
          </button>
        </div>
      </div>

      <div className="card-glow"></div>
    </motion.div>
  );
};

export default GameCard;