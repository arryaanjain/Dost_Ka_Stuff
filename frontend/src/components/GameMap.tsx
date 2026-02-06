import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DAYS } from '../data/days';
import { DayCard } from './DayCard';
// IntroModal removed from this view — per-day pages handle intros
import { ProgressBar } from './ProgressBar';
import { SettingsModal } from './SettingsModal';
// GameContainer is used on the per-day `DayView` page
import type { Day } from '../types';

export const GameMap: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);

  const handleDayClick = (day: Day) => {
    // Navigate to the day page
    window.history.pushState({}, '', `/day/${day.id}`);
    window.dispatchEvent(new Event('pushstate'));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 p-6 md:p-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
            💖 Valentine Week 💖
          </h1>
          <p className="text-lg md:text-xl text-gray-700 font-medium">
            Each day is a level. Each level is a memory.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-12"
        >
          <ProgressBar onToggleSettings={() => setShowSettings(true)} />
        </motion.div>

        {/* Days Grid - 7 columns for 7 days */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
        >
          {DAYS.map((day, index) => (
            <motion.div
              key={day.id}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 + index * 0.08, duration: 0.5 }}
            >
              <DayCard day={day} onClick={() => handleDayClick(day)} />
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center text-gray-600 text-sm"
        >
          <p className="font-medium">💖 Made with love for someone special 💖</p>
        </motion.div>
      </div>

      {/* Settings modal */}
      {showSettings && (
        <SettingsModal onClose={() => setShowSettings(false)} />
      )}
    </motion.div>
  );
};
