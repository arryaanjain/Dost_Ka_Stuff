import React from 'react';
import { motion } from 'framer-motion';
import type { Day } from '../types';

interface IntroModalProps {
  day: Day;
  onStart: () => void;
  onClose: () => void;
}

export const IntroModal: React.FC<IntroModalProps> = ({ day, onStart, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl"
      >
        <div className="text-7xl text-center mb-6">{day.title.split(' ')[0]}</div>

        <h2 className="text-4xl font-black text-center mb-3" style={{ color: day.themeColor }}>
          {day.title}
        </h2>
        <p className="text-2xl font-bold text-center mb-6" style={{ color: day.themeColor }}>
          {day.theme}
        </p>

        <p className="text-gray-700 text-center mb-4 text-lg leading-relaxed">{day.description}</p>

        <div className="flex gap-4 mt-8">
          <motion.button
            onClick={onClose}
            className="flex-1 px-4 py-3 text-gray-700 border-2 border-gray-300 rounded-xl font-bold hover:bg-gray-50 transition-all text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Not Now
          </motion.button>
          <motion.button
            onClick={onStart}
            className="flex-1 px-4 py-3 text-white rounded-xl font-bold transition-all text-base shadow-lg"
            style={{ backgroundColor: day.themeColor }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Play! 🎮
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
