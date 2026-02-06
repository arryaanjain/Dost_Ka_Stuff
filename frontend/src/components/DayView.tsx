import React from 'react';
import { DAYS } from '../data/days';
import type { Day } from '../types';
import { GameContainer } from './GameContainer';

function parseDayIdFromPath(path: string): string | null {
  const m = path.match(/^\/day\/([^\/]+)(?:\/play)?$/);
  return m ? m[1] : null;
}

export const DayView: React.FC = () => {
  const path = window.location.pathname;
  const dayId = parseDayIdFromPath(path);

  if (!dayId) return null;

  const day: Day | undefined = DAYS.find(d => d.id === dayId);
  if (!day) return <div className="p-8">Day not found.</div>;

  const started = path.endsWith('/play');

  const handleStart = () => {
    window.history.pushState({}, '', `/day/${day.id}/play`);
    window.dispatchEvent(new Event('pushstate'));
  };

  const handleClose = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new Event('pushstate'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {!started ? (
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="text-7xl mb-4">{day.title.split(' ')[0]}</div>
            <h2 className="text-4xl font-black mb-2" style={{ color: day.themeColor }}>
              {day.title}
            </h2>
            <p className="text-lg text-gray-700 mb-6">{day.description}</p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleClose}
                className="px-6 py-3 rounded-xl border font-bold"
              >
                Back
              </button>
              <button
                onClick={handleStart}
                className="px-6 py-3 rounded-xl font-bold text-white"
                style={{ backgroundColor: day.themeColor }}
              >
                Let's Play 🎮
              </button>
            </div>
          </div>
        ) : (
          <GameContainer day={day} onClose={handleClose} />
        )}
      </div>
    </div>
  );
};

export default DayView;
