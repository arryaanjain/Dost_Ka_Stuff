import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

interface KissDayProps {
  onComplete: () => void;
}

export const KissDay: React.FC<KissDayProps> = ({ onComplete }) => {
  const [caught, setCaught] = useState(0);
  const [kissPositions, setKissPositions] = useState<Array<{ id: string; x: number; y: number }>>([]);
  const [isWon, setIsWon] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const targetCatches = 3;

  // Generate new kiss position
  const generateNewKiss = () => {
    return {
      id: Math.random().toString(36),
      x: Math.random() * 90,
      y: Math.random() * 90,
    };
  };

  React.useEffect(() => {
    if (isWon) return;
    setKissPositions([generateNewKiss()]);
  }, [isWon]);

  const handleKissClick = (_id: string) => {
    const newCaught = caught + 1;
    setCaught(newCaught);

    if (newCaught >= targetCatches) {
      setIsWon(true);
      setShowConfetti(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    } else {
      setKissPositions([generateNewKiss()]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8 min-h-screen bg-gradient-to-b from-pink-50 to-red-50 relative overflow-hidden">
      {showConfetti && <Confetti />}

      <h2 className="text-3xl font-bold text-center text-red-600">Catch the Kiss! 💋</h2>

      <div className="text-2xl font-bold text-red-600">
        Caught: <span className="text-3xl">{caught}</span>/{targetCatches}
      </div>

      <div className="relative w-full max-w-2xl h-96 bg-white rounded-lg border-4 border-pink-200 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="text-9xl text-pink-300 animate-pulse">💕</div>
        </div>

        {kissPositions.map((kiss) => (
          <motion.button
            key={kiss.id}
            onClick={() => handleKissClick(kiss.id)}
            className="absolute text-6xl cursor-pointer z-10"
            style={{ left: `${kiss.x}%`, top: `${kiss.y}%` }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.6 }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            💋
          </motion.button>
        ))}
      </div>

      {isWon && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-2xl font-bold text-red-600 text-center"
        >
          ✨ All Kisses Caught! ✨
        </motion.div>
      )}
    </div>
  );
};
