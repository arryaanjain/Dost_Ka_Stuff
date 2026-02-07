import React from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import type { Day } from '../types';

interface RewardModalProps {
  day: Day;
  onClose: () => void;
}

export const RewardModal: React.FC<RewardModalProps> = ({ day, onClose }) => {
  return (
    <>
      <Confetti />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="bg-white rounded-3xl p-10 max-w-2xl w-full shadow-2xl text-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="text-9xl mb-6"
          >
            {day.title.split(' ')[0]}
          </motion.div>

          <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            🎉 Level Complete! 🎉
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl text-gray-700 mb-10 leading-relaxed italic"
            style={{ color: day.themeColor, fontWeight: 500 }}
          >
            "{day.rewardMessage}"
          </motion.p>

          <motion.button
            onClick={onClose}
            className="px-10 py-4 text-white rounded-xl font-bold text-xl transition-all shadow-lg"
            style={{ backgroundColor: day.themeColor }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Back to Map ❤️
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
};
