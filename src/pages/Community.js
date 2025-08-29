import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { chatMessages, usersData, multiplayerRooms } from '../data/gamesData';
import './Community.css';

const Community = () => {
  const { currentUser } = useGame();
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState(chatMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    // Simulate new messages
    const interval = setInterval(() => {
      const randomMessages = [
        "Anyone want to team up?",
        "Just got a new high score!",
        "This new update is amazing!",
        "Looking for guild members",
        "GG everyone!"
      ];
      
      const randomUser = usersData[Math.floor(Math.random() * usersData.length)];
      const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
      
      setMessages(prev => [...prev, {
        id: Date.now(),
        user: randomUser.username,
        message: randomMessage,
        time: "now"
      }].slice(-20)); // Keep only last 20 messages
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      user: currentUser?.username || "Guest",
      message: newMessage,
      time: "now"
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const joinRoom = (room) => {
    setSelectedRoom(room);
    // Simulate joining room
    setTimeout(() => {
      alert(`Joined ${room.name}! Connecting to game...`);
      setSelectedRoom(null);
    }, 2000);
  };

  const tabs = [
    { id: 'chat', label: 'Live Chat', icon: '💬' },
    { id: 'players', label: 'Players', icon: '👥' },
    { id: 'rooms', label: 'Multiplayer Rooms', icon: '🎮' },
    { id: 'forums', label: 'Forums', icon: '📋' }
  ];

  const forumTopics = [
    { id: 1, title: "Best strategies for Cyber Warfare 2077", replies: 45, lastPost: "2 hours ago" },
    { id: 2, title: "Dragon's Quest Online guild recruitment", replies: 23, lastPost: "4 hours ago" },
    { id: 3, title: "Speed Legends racing tips and tricks", replies: 67, lastPost: "6 hours ago" },
    { id: 4, title: "Upcoming tournament discussions", replies: 89, lastPost: "1 day ago" }
  ];

  return (
    <div className="community-page">
      <div className="container">
        <motion.div
          className="community-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title orbitron">Gaming Community</h1>
          <p className="page-subtitle">Connect, chat, and play with fellow gamers</p>
        </motion.div>

        <div className="community-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === 'chat' && (
            <motion.div
              className="chat-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="chat-container">
                <div className="chat-messages">
                  {messages.map(message => (
                    <motion.div
                      key={message.id}
                      className="message"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="message-header">
                        <span className="username">{message.user}</span>
                        <span className="timestamp">{message.time}</span>
                      </div>
                      <div className="message-content">{message.message}</div>
                    </motion.div>
                  ))}
                </div>
                
                <form className="chat-input" onSubmit={handleSendMessage}>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="message-input"
                  />
                  <button type="submit" className="send-btn">
                    Send
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {activeTab === 'players' && (
            <motion.div
              className="players-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="players-grid">
                {usersData.map(user => (
                  <div key={user.id} className="player-card">
                    <img src={user.avatar} alt={user.username} className="player-avatar" />
                    <div className="player-info">
                      <h4 className="player-name">{user.username}</h4>
                      <div className="player-stats">
                        <span>Level {user.level}</span>
                        <span>{user.achievements} achievements</span>
                      </div>
                      <div className="player-kdr">
                        K/D: {user.stats.kdr}
                      </div>
                    </div>
                    <button className="btn btn-primary btn-sm">
                      Add Friend
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'rooms' && (
            <motion.div
              className="rooms-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="rooms-grid">
                {multiplayerRooms.map(room => (
                  <div key={room.id} className="room-card">
                    <div className="room-header">
                      <h4 className="room-name">{room.name}</h4>
                      <span className="room-ping">{room.ping}ms</span>
                    </div>
                    <div className="room-game">{room.game}</div>
                    <div className="room-players">
                      <span className="players-count">{room.players}</span>
                      <span className="players-label">Players</span>
                    </div>
                    <button 
                      className={`btn btn-primary ${selectedRoom?.id === room.id ? 'loading' : ''}`}
                      onClick={() => joinRoom(room)}
                      disabled={selectedRoom?.id === room.id}
                    >
                      {selectedRoom?.id === room.id ? 'Joining...' : 'Join Room'}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'forums' && (
            <motion.div
              className="forums-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="forum-header">
                <h3>Discussion Topics</h3>
                <button className="btn btn-primary">New Topic</button>
              </div>
              
              <div className="forum-topics">
                {forumTopics.map(topic => (
                  <div key={topic.id} className="topic-item">
                    <div className="topic-info">
                      <h4 className="topic-title">{topic.title}</h4>
                      <div className="topic-meta">
                        <span>{topic.replies} replies</span>
                        <span>Last post: {topic.lastPost}</span>
                      </div>
                    </div>
                    <button className="btn btn-secondary btn-sm">
                      View Topic
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;