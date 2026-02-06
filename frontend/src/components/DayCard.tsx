import React from 'react';
import { motion } from 'framer-motion';
import type { Day } from '../types';
import { isDayCompleted } from '../utils/storage';

interface DayCardProps {
  day: Day;
  onClick: () => void;
}

export const DayCard: React.FC<DayCardProps> = ({ day, onClick }) => {
  // Disable unlock feature - all days are accessible
  const isUnlocked = true;
  const isCompleted = isDayCompleted(day.id);

  return (
    <motion.button
      onClick={onClick}
      disabled={!isUnlocked}
      className="relative w-full h-full"
      whileHover={isUnlocked ? { scale: 1.05 } : {}}
      whileTap={isUnlocked ? { scale: 0.95 } : {}}
    >
      <div
        className={`p-6 rounded-2xl border-2 transition-all h-full flex flex-col justify-between ${
          isUnlocked
            ? 'cursor-pointer border-transparent hover:shadow-xl'
            : 'cursor-not-allowed opacity-60 border-gray-300'
        }`}
        style={{
          backgroundColor: isUnlocked ? day.themeColor + '15' : '#f0f0f0',
          borderColor: isUnlocked ? day.themeColor : 'transparent',
        }}
      >
        <div>
          <div className="text-5xl mb-3">{day.title.split(' ')[0]}</div>
          <h3 className="text-2xl font-bold mb-2">{day.title}</h3>
          <p className="text-sm text-gray-600 mb-3">{day.theme}</p>
          <p className="text-xs text-gray-500">{day.description}</p>
        </div>

        <div className="flex items-center justify-between">
          {isCompleted && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-3xl"
            >
              ✅
            </motion.div>
          )}

          {isUnlocked && !isCompleted && (
            <div
              className="text-xs font-bold px-3 py-1 rounded-full"
              style={{
                backgroundColor: day.themeColor + '40',
                color: day.themeColor,
              }}
            >
              Play Now
            </div>
          )}
        </div>
      </div>
    </motion.button>
  );
};
