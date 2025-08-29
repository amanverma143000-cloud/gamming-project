import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import GameCard from '../components/GameCard';
import SpinWheel from '../components/SpinWheel';
import './Home.css';

const Home = () => {
  const { games, backgroundMusic } = useGame();
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [dailyReward, setDailyReward] = useState(null);
  const [currentTrailer, setCurrentTrailer] = useState(0);

  const featuredGames = games.slice(0, 3);
  const topGames = games.sort((a, b) => b.rating - a.rating).slice(0, 6);

  useEffect(() => {
    // Check if user has claimed daily reward
    const lastClaim = localStorage.getItem('lastDailyReward');
    const today = new Date().toDateString();
    
    if (lastClaim !== today) {
      setTimeout(() => setShowRewardModal(true), 2000);
    }
  }, []);

  useEffect(() => {
    // Auto-rotate trailers
    const interval = setInterval(() => {
      setCurrentTrailer((prev) => (prev + 1) % featuredGames.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredGames.length]);

  const handleReward = (reward) => {
    setDailyReward(reward);
    localStorage.setItem('lastDailyReward', new Date().toDateString());
    setTimeout(() => {
      setShowRewardModal(false);
      setDailyReward(null);
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <video
            key={currentTrailer}
            autoPlay
            muted
            loop
            className="hero-video"
          >
            <source src={featuredGames[currentTrailer]?.trailer} type="video/mp4" />
          </video>
          <div className="hero-overlay"></div>
        </div>

        <div className="container">
          <motion.div
            className="hero-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 className="hero-title orbitron" variants={itemVariants}>
              Welcome to <span className="glow-text">GameZone</span>
            </motion.h1>
            <motion.p className="hero-subtitle" variants={itemVariants}>
              The Ultimate Gaming Experience Awaits
            </motion.p>
            <motion.div className="hero-actions" variants={itemVariants}>
              <Link to="/games" className="btn btn-primary">
                Explore Games
              </Link>
              <Link to="/tournaments" className="btn btn-secondary">
                Join Tournament
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="trailer-indicators">
          {featuredGames.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentTrailer ? 'active' : ''}`}
              onClick={() => setCurrentTrailer(index)}
            />
          ))}
        </div>
      </section>

      {/* Featured Games */}
      <section className="featured-games">
        <div className="container">
          <motion.h2 
            className="section-title orbitron"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Featured Games
          </motion.h2>
          <div className="games-grid">
            {featuredGames.map((game, index) => (
              <GameCard key={game.id} game={game} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="leaderboard">
        <div className="container">
          <motion.h2 
            className="section-title orbitron"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Trending Games
          </motion.h2>
          <div className="leaderboard-grid">
            {topGames.map((game, index) => (
              <motion.div
                key={game.id}
                className="leaderboard-item"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="rank">#{index + 1}</div>
                <img src={game.banner} alt={game.title} className="game-thumb" />
                <div className="game-details">
                  <h4>{game.title}</h4>
                  <div className="game-meta">
                    <span className="rating">⭐ {game.rating}</span>
                    <span className="players">{game.activePlayers.toLocaleString()} players</span>
                  </div>
                </div>
                <Link to={`/game/${game.id}`} className="btn btn-primary btn-sm">
                  Play
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Reward Modal */}
      {showRewardModal && (
        <div className="modal-overlay">
          <motion.div
            className="reward-modal"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "backOut" }}
          >
            <h3 className="orbitron">Daily Reward</h3>
            {!dailyReward ? (
              <>
                <p>Spin the wheel for your daily reward!</p>
                <SpinWheel onReward={handleReward} />
              </>
            ) : (
              <motion.div
                className="reward-result"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="reward-icon">🎉</div>
                <h4>Congratulations!</h4>
                <p>You won: <span className="reward-value">{dailyReward.label}</span></p>
              </motion.div>
            )}
            <button 
              className="close-modal"
              onClick={() => setShowRewardModal(false)}
            >
              ×
            </button>
          </motion.div>
        </div>
      )}

      {/* Background Music */}
      {backgroundMusic && (
        <audio autoPlay loop>
          <source src="/audio/background-music.mp3" type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
};

export default Home;