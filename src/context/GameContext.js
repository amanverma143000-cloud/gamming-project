import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { gamesData, tournamentsData, usersData } from '../data/gamesData';

const GameContext = createContext();

const initialState = {
  games: gamesData,
  tournaments: tournamentsData,
  users: usersData,
  currentUser: null,
  theme: 'dark',
  activeUsers: 15847,
  dailyReward: null,
  searchQuery: '',
  selectedCategory: 'All',
  selectedDifficulty: 'All',
  isLoading: false,
  backgroundMusic: false
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    case 'SET_DIFFICULTY':
      return { ...state, selectedDifficulty: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'TOGGLE_MUSIC':
      return { ...state, backgroundMusic: !state.backgroundMusic };
    case 'SET_DAILY_REWARD':
      return { ...state, dailyReward: action.payload };
    case 'UPDATE_ACTIVE_USERS':
      return { ...state, activeUsers: action.payload };
    case 'LOGIN_USER':
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    // Simulate active users count updates
    const interval = setInterval(() => {
      const randomChange = Math.floor(Math.random() * 200) - 100;
      dispatch({ 
        type: 'UPDATE_ACTIVE_USERS', 
        payload: Math.max(10000, state.activeUsers + randomChange) 
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [state.activeUsers]);

  const filteredGames = state.games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(state.searchQuery.toLowerCase());
    const matchesCategory = state.selectedCategory === 'All' || game.category === state.selectedCategory;
    const matchesDifficulty = state.selectedDifficulty === 'All' || game.difficulty === state.selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const value = {
    ...state,
    dispatch,
    filteredGames
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};