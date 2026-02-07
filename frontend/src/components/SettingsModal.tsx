import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getTimeLockEnabled, setTimeLockEnabled } from '../utils/storage';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const [timeLock, setTimeLock] = useState<boolean>(true);

  useEffect(() => {
    setTimeLock(getTimeLockEnabled());
  }, []);

  const toggleTimeLock = () => {
    const next = !timeLock;
    setTimeLock(next);
    setTimeLockEnabled(next);
  };
  const handleReset = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      localStorage.removeItem('valentine_game_state');
      window.location.reload();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
      >
        <h2 className="text-3xl font-bold mb-6">⚙️ Settings</h2>

        <div className="space-y-4 mb-8">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold text-gray-700 mb-2">Time Mode</h3>
            <p className="text-sm text-gray-600 mb-3">When enabled, levels unlock only on their scheduled day. When disabled, all levels remain unlocked for immediate play.</p>
            <div className="flex items-center gap-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={timeLock} onChange={toggleTimeLock} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-pink-500 peer-checked:after:translate-x-5 after:content-[''] after:inline-block after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all" />
              </label>
              <span className="font-semibold">{timeLock ? 'Enabled (Locked)' : 'Disabled (Unlocked)'}</span>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold text-gray-700 mb-2">About</h3>
            <p className="text-sm text-gray-600">
              Valentine Week is a 7-day level-based love game. Each day unlocks a new level with a unique mini-game.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold text-gray-700 mb-2">Made with ❤️</h3>
            <p className="text-sm text-gray-600">
              This game was created as a special Valentine's gift.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <motion.button
            onClick={handleReset}
            className="w-full px-4 py-3 text-red-600 border-2 border-red-300 rounded-lg font-bold hover:bg-red-50 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Reset Progress
          </motion.button>

          <motion.button
            onClick={onClose}
            className="w-full px-4 py-3 text-white bg-gray-600 rounded-lg font-bold hover:bg-gray-700 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
