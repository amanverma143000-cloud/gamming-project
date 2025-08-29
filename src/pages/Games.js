import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import GameCard from '../components/GameCard';
import './Games.css';

const Games = () => {
  const { 
    filteredGames, 
    searchQuery, 
    selectedCategory, 
    selectedDifficulty, 
    dispatch 
  } = useGame();
  
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 6;

  const categories = ['All', 'FPS', 'RPG', 'Racing', 'Adventure'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
  const startIndex = (currentPage - 1) * gamesPerPage;
  const currentGames = filteredGames.slice(startIndex, startIndex + gamesPerPage);

  const handleSearch = (e) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value });
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    dispatch({ type: 'SET_CATEGORY', payload: category });
    setCurrentPage(1);
  };

  const handleDifficultyChange = (difficulty) => {
    dispatch({ type: 'SET_DIFFICULTY', payload: difficulty });
    setCurrentPage(1);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="games-page">
      <div className="container">
        <motion.div
          className="games-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title orbitron">Game Library</h1>
          <p className="page-subtitle">Discover your next gaming adventure</p>
        </motion.div>

        <motion.div
          className="games-filters"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
            />
            <div className="search-icon">🔍</div>
          </div>

          <div className="filter-group">
            <label>Category:</label>
            <div className="filter-buttons">
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>Difficulty:</label>
            <div className="filter-buttons">
              {difficulties.map(difficulty => (
                <button
                  key={difficulty}
                  className={`filter-btn ${selectedDifficulty === difficulty ? 'active' : ''}`}
                  onClick={() => handleDifficultyChange(difficulty)}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="games-stats">
          <span>Showing {currentGames.length} of {filteredGames.length} games</span>
        </div>

        <motion.div
          className="games-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {currentGames.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} />
          ))}
        </motion.div>

        {filteredGames.length === 0 && (
          <motion.div
            className="no-games"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="no-games-icon">🎮</div>
            <h3>No games found</h3>
            <p>Try adjusting your search or filters</p>
          </motion.div>
        )}

        {totalPages > 1 && (
          <motion.div
            className="pagination"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
              className="page-btn"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <div className="page-numbers">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              className="page-btn"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Games;