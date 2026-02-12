import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

interface PromiseDayProps {
  onComplete: () => void;
}

export const PromiseDay: React.FC<PromiseDayProps> = ({ onComplete }) => {
  const [promises, setPromises] = useState<string[]>(Array(10).fill(''));
  const [isLocked, setIsLocked] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handlePromiseChange = (index: number, value: string) => {
    const newPromises = [...promises];
    newPromises[index] = value;
    setPromises(newPromises);
  };

  const handleLockPromises = () => {
    const filledPromises = promises.filter(p => p.trim() !== '');
    if (filledPromises.length === 0) return; // Don't lock if empty

    setIsLocked(true);
    setShowConfetti(true);
  };

  return (
    <div className="flex flex-col items-center justify-start gap-8 p-8 min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 overflow-y-auto">
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold text-purple-600 mb-2">Promise Day 🤝</h2>
        <p className="text-purple-500">Make your promises count.</p>
      </motion.div>

      {!isLocked ? (
        <motion.div
          className="w-full max-w-2xl flex flex-col gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-purple-100">
            <h3 className="text-xl font-semibold text-purple-700 mb-4 text-center">
              Write up to 10 Promises
            </h3>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {promises.map((promise, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 bg-white p-2 rounded-xl border border-purple-100 shadow-sm"
                >
                  <span className="text-purple-500 font-bold w-8 text-center">{index + 1}.</span>
                  <input
                    type="text"
                    value={promise}
                    onChange={(e) => handlePromiseChange(index, e.target.value)}
                    placeholder={`I promise to...`}
                    className="flex-1 px-3 py-2 rounded-lg border-0 bg-transparent text-gray-800 placeholder-gray-400 focus:ring-0 text-lg outline-none"
                  />
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLockPromises}
                disabled={promises.every(p => p.trim() === '')}
                className={`px-8 py-3 rounded-full font-bold text-white shadow-lg transition-all ${promises.every(p => p.trim() === '')
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700 hover:shadow-purple-500/30'
                  }`}
              >
                Lock Promises 🔒
              </motion.button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="w-full max-w-2xl flex flex-col gap-6 items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="bg-white/90 backdrop-blur rounded-3xl p-8 shadow-2xl border-2 border-purple-200 relative overflow-hidden w-full">
            {/* Lock Icon Overlay */}
            <div className="absolute -right-10 -top-10 text-[150px] opacity-5 pointer-events-none rotate-12">
              🔒
            </div>

            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="text-6xl mb-4 inline-block"
              >
                🔐
              </motion.div>
              <h3 className="text-2xl font-bold text-purple-800 mb-2">Promises Locked Forever</h3>
              <p className="text-purple-600 italic">
                "Consistency is the key to keeping these promises alive."
              </p>
            </div>

            <div className="grid gap-3 max-h-[50vh] overflow-y-auto pr-2">
              {promises.map((promise, index) => {
                if (promise.trim() === '') return null;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-purple-50 p-4 rounded-xl border border-purple-100 flex items-center gap-3"
                  >
                    <span className="w-8 h-8 flex items-center justify-center bg-purple-200 text-purple-700 rounded-full font-bold text-sm">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 font-medium flex-1">{promise}</p>
                    <span className="text-xl">✨</span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={onComplete}
            className="px-8 py-3 bg-white text-purple-600 rounded-full font-bold shadow-lg border-2 border-purple-100 hover:bg-purple-50 transition-all flex items-center gap-2"
          >
            Continue Journey ➡️
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};
