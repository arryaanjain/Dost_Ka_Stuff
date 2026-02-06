import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

interface ValentineDayProps {
  onComplete: () => void;
}

interface Photo {
  id: string;
  emoji: string;
  name: string;
}

export const ValentineDay: React.FC<ValentineDayProps> = ({ onComplete }) => {
  const photos: Photo[] = [
    { id: '0', emoji: '😊', name: 'Happy' },
    { id: '1', emoji: '🎂', name: 'Birthday' },
    { id: '2', emoji: '🌅', name: 'Sunrise' },
    { id: '3', emoji: '🎭', name: 'Theatre' },
    { id: '4', emoji: '🏖️', name: 'Beach' },
    { id: '5', emoji: '🎸', name: 'Music' },
    { id: '6', emoji: '📚', name: 'Reading' },
    { id: '7', emoji: '🍕', name: 'Pizza' },
    { id: '8', emoji: '💫', name: 'Magic' },
  ];

  const correctSequence = ['4', '1', '5', '8']; // Beach, Birthday, Music, Magic

  const [currentStep, setCurrentStep] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [shuffled] = useState(() => {
    return [...photos].sort(() => Math.random() - 0.5);
  });
  const [shakeGrid, setShakeGrid] = useState(false);

  const handlePhotoClick = (photoId: string) => {
    if (isWon) return;

    if (photoId === correctSequence[currentStep]) {
      // Correct!
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);

      if (nextStep === correctSequence.length) {
        // Won!
        setIsWon(true);
        setShowConfetti(true);
      }
    } else {
      // Wrong - shake and reset
      setShakeGrid(true);
      setTimeout(() => setShakeGrid(false), 400);
      setCurrentStep(0);
    }
  };

  const loveLetter = [
    "Out of every path,",
    "every choice,",
    "every version of life—",
    "I'd still find you.",
    "",
    "Will you be my Valentine?",
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8 min-h-screen bg-gradient-to-b from-red-50 to-pink-50">
      {showConfetti && <Confetti />}

      {!isWon ? (
        <>
          <h2 className="text-4xl font-bold text-center text-red-600">The Memory Matrix ❤️</h2>

          <p className="text-lg text-gray-600 text-center max-w-md">
            Tap the memories in order: {correctSequence.map(id => photos.find(p => p.id === id)?.emoji).join(' → ')}
          </p>

          <div className="text-2xl font-bold text-red-600">
            Progress: {currentStep}/{correctSequence.length}
          </div>

          <motion.div
            animate={shakeGrid ? { x: [-10, 10, -10, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-3 gap-3"
          >
            {shuffled.map((photo) => {
              const positionInSequence = correctSequence.indexOf(photo.id);
              const isNext = positionInSequence === currentStep;
              const isCompleted = positionInSequence < currentStep;

              return (
                <motion.button
                  key={photo.id}
                  onClick={() => handlePhotoClick(photo.id)}
                  className={`w-20 h-20 rounded-lg flex items-center justify-center text-3xl cursor-pointer border-2 transition-all ${
                    isCompleted ? 'opacity-50 bg-green-100 border-green-500' : 'border-gray-300'
                  }`}
                  style={{
                    boxShadow: isNext ? '0 0 20px rgba(220, 20, 60, 0.8)' : 'none',
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={isNext ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.6, repeat: Infinity }}
                >
                  {photo.emoji}
                </motion.button>
              );
            })}
          </motion.div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-8"
        >
          <h2 className="text-4xl font-bold text-center text-red-600 mb-8">💌 My Love Letter 💌</h2>

          <div className="max-w-lg space-y-4 text-center">
            {loveLetter.map((line, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.4 }}
                className={`text-xl ${line === '' ? 'h-4' : 'text-gray-700'}`}
              >
                {line && (idx === loveLetter.length - 1 ? <span className="font-bold text-red-600 text-2xl">{line}</span> : line)}
              </motion.p>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: loveLetter.length * 0.4 + 0.2 }}
            onClick={onComplete}
            className="px-8 py-4 text-xl font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Yes, Forever ❤️
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};
