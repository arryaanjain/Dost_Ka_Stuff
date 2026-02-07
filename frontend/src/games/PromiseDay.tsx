import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

interface PromiseDayProps {
  onComplete: () => void;
}

export const PromiseDay: React.FC<PromiseDayProps> = ({ onComplete }) => {
  const [sliderValue, setSliderValue] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const promiseTexts = [
    'I promise...',
    '...to stay',
    '...to care',
    '...to love',
    '...forever',
  ];

  const getPromiseText = () => {
    const index = Math.floor((sliderValue / 100) * (promiseTexts.length - 1));
    return promiseTexts[Math.min(index, promiseTexts.length - 1)];
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setSliderValue(value);

    if (value === 100) {
      setIsWon(true);
      setShowConfetti(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-12 p-8 min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      {showConfetti && <Confetti />}

      <h2 className="text-4xl font-bold text-center text-purple-600">Make a Promise 🤝</h2>

      <motion.div
        key={getPromiseText()}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-purple-600 text-center min-h-16"
      >
        {getPromiseText()}
      </motion.div>

      <div className="w-full max-w-md">
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={handleSliderChange}
          className="w-full h-3 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
          style={{
            background: `linear-gradient(to right, #a78bfa 0%, #a78bfa ${sliderValue}%, #e9d5ff ${sliderValue}%, #e9d5ff 100%)`,
          }}
        />
      </div>

      <div className="text-2xl font-bold text-purple-600">{sliderValue}%</div>

      {sliderValue > 0 && sliderValue < 100 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg text-purple-500 text-center"
        >
          Keep sliding... I'm waiting ✨
        </motion.p>
      )}

      {isWon && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-2xl font-bold text-purple-600 text-center"
        >
          ✨ Promise Sealed! ✨
        </motion.div>
      )}
    </div>
  );
};
