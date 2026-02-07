import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

interface ProposeDayProps {
  onComplete: () => void;
}

export const ProposeDay: React.FC<ProposeDayProps> = ({ onComplete }) => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [isWon, setIsWon] = useState(false);
  const [noAttempts, setNoAttempts] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const noTexts = ['No', 'Are you sure?', 'Try harder 😏', 'You can do it!', 'Pretty please?'];

  const handleYes = () => {
    setIsWon(true);
    setShowConfetti(true);
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  const handleNoHover = () => {
    setNoPosition({
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
    });
    setNoAttempts((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-12 p-8 min-h-screen">
      {showConfetti && <Confetti />}

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center text-red-600"
      >
        Will You Be My Valentine? 💍
      </motion.h2>

      <div className="flex gap-8 relative h-20">
        <motion.button
          onClick={handleYes}
          className="px-8 py-4 text-2xl font-bold text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          YES ❤️
        </motion.button>

        <motion.button
          onMouseEnter={handleNoHover}
          onTouchStart={handleNoHover}
          animate={noPosition}
          transition={{ type: 'spring', stiffness: 300, damping: 10 }}
          className="px-8 py-4 text-2xl font-bold text-white bg-red-500 rounded-lg absolute"
        >
          {noTexts[Math.min(noAttempts, noTexts.length - 1)]}
        </motion.button>
      </div>

      {noAttempts > 2 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg text-gray-600 text-center"
        >
          You can't escape this one 😏
        </motion.p>
      )}

      {isWon && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-3xl font-bold text-red-600 text-center"
        >
          💕 YES! FOREVER YES! 💕
        </motion.div>
      )}
    </div>
  );
};
