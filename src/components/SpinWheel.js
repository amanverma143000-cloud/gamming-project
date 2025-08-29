import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './SpinWheel.css';

const SpinWheel = ({ onReward }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const rewards = [
    { label: '100 Coins', value: 100, color: '#ff4444' },
    { label: '50 XP', value: 50, color: '#44ff44' },
    { label: '200 Coins', value: 200, color: '#4444ff' },
    { label: '25 XP', value: 25, color: '#ffff44' },
    { label: '500 Coins', value: 500, color: '#ff44ff' },
    { label: '100 XP', value: 100, color: '#44ffff' },
    { label: '75 Coins', value: 75, color: '#ff8844' },
    { label: 'Bonus Spin', value: 'bonus', color: '#8844ff' }
  ];

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const spins = 5 + Math.random() * 5; // 5-10 full rotations
    const finalRotation = rotation + (spins * 360) + Math.random() * 360;
    setRotation(finalRotation);

    setTimeout(() => {
      const segmentAngle = 360 / rewards.length;
      const normalizedRotation = finalRotation % 360;
      const winningIndex = Math.floor((360 - normalizedRotation) / segmentAngle) % rewards.length;
      const reward = rewards[winningIndex];
      
      setIsSpinning(false);
      onReward(reward);
    }, 3000);
  };

  return (
    <div className="spin-wheel-container">
      <div className="wheel-wrapper">
        <motion.div
          className="spin-wheel"
          animate={{ rotate: rotation }}
          transition={{ duration: 3, ease: "easeOut" }}
        >
          {rewards.map((reward, index) => {
            const angle = (360 / rewards.length) * index;
            return (
              <div
                key={index}
                className="wheel-segment"
                style={{
                  transform: `rotate(${angle}deg)`,
                  backgroundColor: reward.color
                }}
              >
                <div className="segment-content">
                  <span className="reward-text">{reward.label}</span>
                </div>
              </div>
            );
          })}
        </motion.div>
        
        <div className="wheel-pointer"></div>
        
        <button
          className={`spin-button ${isSpinning ? 'spinning' : ''}`}
          onClick={spinWheel}
          disabled={isSpinning}
        >
          {isSpinning ? 'SPINNING...' : 'SPIN'}
        </button>
      </div>
    </div>
  );
};

export default SpinWheel;