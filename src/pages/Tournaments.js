import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { tournamentsData } from '../data/gamesData';
import './Tournaments.css';

const Tournaments = () => {
  const { games } = useGame();
  const [tournaments] = useState(tournamentsData);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});
  const [showRegistration, setShowRegistration] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const newTimeLeft = {};

      tournaments.forEach(tournament => {
        const tournamentDate = new Date(tournament.date).getTime();
        const difference = tournamentDate - now;

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          newTimeLeft[tournament.id] = { days, hours, minutes, seconds };
        } else {
          newTimeLeft[tournament.id] = null;
        }
      });

      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [tournaments]);

  const handleRegister = (tournament) => {
    setSelectedTournament(tournament);
    setShowRegistration(true);
  };

  const submitRegistration = (e) => {
    e.preventDefault();
    alert(`Successfully registered for ${selectedTournament.title}!`);
    setShowRegistration(false);
    setSelectedTournament(null);
  };

  const formatTimeLeft = (time) => {
    if (!time) return "Tournament Started";
    return `${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s`;
  };

  return (
    <div className="tournaments-page">
      <div className="container">
        <motion.div
          className="tournaments-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title orbitron">Tournaments & Events</h1>
          <p className="page-subtitle">Compete with the best and win amazing prizes</p>
        </motion.div>

        <div className="tournaments-grid">
          {tournaments.map((tournament, index) => {
            const game = games.find(g => g.title === tournament.game);
            return (
              <motion.div
                key={tournament.id}
                className="tournament-card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="tournament-image">
                  <img src={game?.banner || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400'} alt={tournament.title} />
                  <div className="tournament-overlay">
                    <div className="prize-pool">
                      <span className="prize-label">Prize Pool</span>
                      <span className="prize-amount">{tournament.prize}</span>
                    </div>
                  </div>
                </div>

                <div className="tournament-info">
                  <h3 className="tournament-title">{tournament.title}</h3>
                  <p className="tournament-game">{tournament.game}</p>
                  <p className="tournament-description">{tournament.description}</p>

                  <div className="tournament-details">
                    <div className="detail">
                      <span className="detail-label">Date</span>
                      <span className="detail-value">{new Date(tournament.date).toLocaleDateString()}</span>
                    </div>
                    <div className="detail">
                      <span className="detail-label">Participants</span>
                      <span className="detail-value">{tournament.participants}</span>
                    </div>
                  </div>

                  <div className="countdown">
                    <span className="countdown-label">Time Remaining:</span>
                    <div className="countdown-timer">
                      {formatTimeLeft(timeLeft[tournament.id])}
                    </div>
                  </div>

                  <button 
                    className="btn btn-primary tournament-btn"
                    onClick={() => handleRegister(tournament)}
                    disabled={!timeLeft[tournament.id]}
                  >
                    {timeLeft[tournament.id] ? 'Register Now' : 'Registration Closed'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="upcoming-events"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="section-title orbitron">Upcoming Events Calendar</h2>
          <div className="calendar-view">
            <div className="calendar-header">
              <h3>February 2024</h3>
            </div>
            <div className="calendar-grid">
              {tournaments.map(tournament => (
                <div key={tournament.id} className="calendar-event">
                  <div className="event-date">
                    {new Date(tournament.date).getDate()}
                  </div>
                  <div className="event-info">
                    <span className="event-title">{tournament.title}</span>
                    <span className="event-prize">{tournament.prize}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Registration Modal */}
        {showRegistration && (
          <div className="modal-overlay">
            <motion.div
              className="registration-modal"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "backOut" }}
            >
              <h3 className="orbitron">Tournament Registration</h3>
              <h4>{selectedTournament?.title}</h4>
              
              <form onSubmit={submitRegistration} className="registration-form">
                <div className="form-group">
                  <label>Team Name</label>
                  <input type="text" required placeholder="Enter your team name" />
                </div>
                
                <div className="form-group">
                  <label>Captain Name</label>
                  <input type="text" required placeholder="Enter captain name" />
                </div>
                
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" required placeholder="Enter email address" />
                </div>
                
                <div className="form-group">
                  <label>Team Size</label>
                  <select required>
                    <option value="">Select team size</option>
                    <option value="1">Solo (1 player)</option>
                    <option value="2">Duo (2 players)</option>
                    <option value="4">Squad (4 players)</option>
                    <option value="5">Team (5 players)</option>
                  </select>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    Register Team
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowRegistration(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tournaments;