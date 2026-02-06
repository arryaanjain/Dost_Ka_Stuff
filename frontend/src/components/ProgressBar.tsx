import React from 'react';
import { motion } from 'framer-motion';
import { DAYS } from '../data/days';
import { isDayCompleted } from '../utils/storage';

interface ProgressBarProps {
  onToggleSettings?: () => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ onToggleSettings }) => {
  const completedCount = DAYS.filter((day) => isDayCompleted(day.id)).length;
  const progress = (completedCount / DAYS.length) * 100;

  return (
    <motion.div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-rose-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Valentine Week Progress</h3>
        <button
          onClick={onToggleSettings}
          className="text-2xl hover:scale-125 transition-transform"
        >
          ⚙️
        </button>
      </div>

      <div className="mb-3">
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-rose-400 via-pink-500 to-red-500 shadow-lg"
          />
        </div>
      </div>

      <p className="text-sm text-gray-700 font-semibold">
        {completedCount} of {DAYS.length} levels completed • {Math.round(progress)}%
      </p>
    </motion.div>
  );
};
