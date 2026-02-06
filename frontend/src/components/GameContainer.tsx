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
      className="min-h-screen p-6 md:p-10"
      style={{ backgroundColor: day.themeColor + '08' }}
    >
      <div className="max-w-4xl mx-auto bg-white/80 rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-extrabold" style={{ color: day.themeColor }}>
            {day.title}
          </h2>
          <button
            onClick={onClose}
            className="text-2xl hover:scale-110 transition-transform bg-white rounded-full w-12 h-12 flex items-center justify-center shadow border"
            title="Back to map"
          >
            ←
          </button>
        </div>

        <div className="mt-4">{renderGame()}</div>

        {isCompleted && <RewardModal day={day} onClose={onClose} />}
      </div>
    </motion.div>
  );
};
