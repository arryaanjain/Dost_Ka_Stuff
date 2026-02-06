import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

interface RoseDayProps {
  onComplete: () => void;
}

export const RoseDay: React.FC<RoseDayProps> = ({ onComplete }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [isWon, setIsWon] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const roses = [
    { id: 0, color: '#FF69B4', name: 'Hot Pink' },
    { id: 1, color: '#FFB6C1', name: 'Light Pink' },
    { id: 2, color: '#FF1493', name: 'Deep Pink' },
    { id: 3, color: '#FFC0CB', name: 'Pink' },
    { id: 4, color: '#FF0000', name: 'Red' },
  ];

  const correctRose = 1; // Light Pink is her favorite

  const handleRoseClick = (id: number) => {
    setSelected(id);
    if (id === correctRose) {
      setIsWon(true);
      setShowConfetti(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8">
      {showConfetti && <Confetti />}

      <h2 className="text-3xl font-bold text-center">
        Pick Her Favorite Rose 🌹
      </h2>

      <div className="grid grid-cols-5 gap-4 max-w-2xl">
        {roses.map((rose) => (
          <motion.button
            key={rose.id}
            onClick={() => handleRoseClick(rose.id)}
            className="flex flex-col items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={
              selected === rose.id
                ? isWon
                  ? { scale: 1.2, rotate: [0, -5, 5, 0] }
                  : { x: [0, -10, 10, 0] }
                : {}
            }
          >
            <div
              className="w-20 h-20 rounded-full shadow-lg transition-transform"
              style={{
                backgroundColor: rose.color,
                boxShadow: selected === rose.id ? `0 0 20px ${rose.color}` : undefined,
              }}
            />
            <p className="text-xs text-gray-600">{rose.name}</p>
          </motion.button>
        ))}
      </div>

      {isWon && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-2xl font-bold text-pink-600 text-center"
        >
          ✨ Perfect! Just like you! ✨
        </motion.div>
      )}
    </div>
  );
};
