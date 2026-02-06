import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

interface ChocolateDayProps {
  onComplete: () => void;
}

const CHOCOLATE = '🍫';

export const ChocolateDay: React.FC<ChocolateDayProps> = ({ onComplete }) => {
  const [caught, setCaught] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isWon, setIsWon] = useState(false);
  const [chocolates, setChocolates] = useState<Array<{ id: string; x: number }>>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const targetCatches = 5;

  // Spawn chocolates
  useEffect(() => {
    if (isWon || timeLeft <= 0) return;

    const spawnInterval = setInterval(() => {
      const newChocolate = {
        id: Math.random().toString(),
        x: Math.random() * 80,
      };
      setChocolates((prev) => [...prev, newChocolate]);
    }, 700);

    return () => clearInterval(spawnInterval);
  }, [isWon, timeLeft]);

  // Timer
  useEffect(() => {
    if (isWon) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isWon]);

  // Check win condition
  useEffect(() => {
    if (caught >= targetCatches) {
      setIsWon(true);
      setShowConfetti(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  }, [caught, onComplete]);

  const handleChocolateClick = (id: string) => {
    setChocolates((prev) => prev.filter((c) => c.id !== id));
    setCaught((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 relative overflow-hidden">
      {showConfetti && <Confetti />}

      <h2 className="text-3xl font-bold">Catch the Chocolates! 🍫</h2>

      <div className="flex gap-8 text-2xl font-bold">
        <div className="text-brown-600">
          Caught: <span className="text-3xl">{caught}</span>/{targetCatches}
        </div>
        <div className="text-red-600">
          Time: <span className="text-3xl">{timeLeft}s</span>
        </div>
      </div>

      <div className="relative w-full max-w-2xl h-96 bg-white rounded-lg border-4 border-amber-200 overflow-hidden">
        {chocolates.map((choco) => (
          <motion.button
            key={choco.id}
            onClick={() => handleChocolateClick(choco.id)}
            className="absolute text-5xl cursor-pointer"
            style={{ left: `${choco.x}%` }}
            initial={{ top: '-60px', opacity: 1 }}
            animate={{ top: '400px', opacity: 0.3 }}
            transition={{ duration: 4, ease: 'linear' }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          >
            {CHOCOLATE}
          </motion.button>
        ))}
      </div>

      {timeLeft === 0 && caught < targetCatches && (
        <motion.div className="text-2xl font-bold text-red-600">
          Game Over! Try again!
        </motion.div>
      )}

      {isWon && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-2xl font-bold text-orange-600 text-center"
        >
          ✨ Sweet Victory! ✨
        </motion.div>
      )}
    </div>
  );
};
