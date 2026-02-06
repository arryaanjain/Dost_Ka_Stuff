import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Day } from '../types';
import { RoseDay } from '../games/RoseDay';
import { ProposeDay } from '../games/ProposeDay';
import { ChocolateDay } from '../games/ChocolateDay';
import { TeddyDay } from '../games/TeddyDay';
import { PromiseDay } from '../games/PromiseDay';
import { KissDay } from '../games/KissDay';
import { ValentineDay } from '../games/ValentineDay';
import { markDayCompleted } from '../utils/storage';
import { RewardModal } from './RewardModal';

interface GameContainerProps {
  day: Day;
  onClose: () => void;
}

export const GameContainer: React.FC<GameContainerProps> = ({ day, onClose }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    markDayCompleted(day.id);
    setIsCompleted(true);
  };

  const renderGame = () => {
    switch (day.id) {
      case 'rose':
        return <RoseDay onComplete={handleComplete} />;
      case 'propose':
        return <ProposeDay onComplete={handleComplete} />;
      case 'chocolate':
        return <ChocolateDay onComplete={handleComplete} />;
      case 'teddy':
        return <TeddyDay onComplete={handleComplete} />;
      case 'promise':
        return <PromiseDay onComplete={handleComplete} />;
      case 'kiss':
        return <KissDay onComplete={handleComplete} />;
      case 'valentine':
        return <ValentineDay onComplete={handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 overflow-auto"
      style={{ backgroundColor: day.themeColor + '08' }}
    >
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-50 text-4xl hover:scale-125 transition-transform bg-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl border-2 border-gray-200"
        title="Close game"
      >
        ✕
      </button>

      {renderGame()}

      {isCompleted && <RewardModal day={day} onClose={onClose} />}
    </motion.div>
  );
};
