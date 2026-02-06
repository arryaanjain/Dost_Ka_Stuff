import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

interface TeddyDayProps {
  onComplete: () => void;
}

interface Card {
  id: string;
  type: 'teddy' | 'photo';
  index: number;
  isFlipped: boolean;
  isMatched: boolean;
  caption?: string;
}

export const TeddyDay: React.FC<TeddyDayProps> = ({ onComplete }) => {
  const captions = ['This smile', 'That laugh', 'Forever'];

  const initialCards: Card[] = [
    { id: '0', type: 'teddy' as const, index: 0, isFlipped: false, isMatched: false },
    { id: '1', type: 'photo' as const, index: 0, isFlipped: false, isMatched: false, caption: captions[0] },
    { id: '2', type: 'teddy' as const, index: 1, isFlipped: false, isMatched: false },
    { id: '3', type: 'photo' as const, index: 1, isFlipped: false, isMatched: false, caption: captions[1] },
    { id: '4', type: 'teddy' as const, index: 2, isFlipped: false, isMatched: false },
    { id: '5', type: 'photo' as const, index: 2, isFlipped: false, isMatched: false, caption: captions[2] },
  ].sort(() => Math.random() - 0.5);

  const [cards] = useState(initialCards);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [isWon, setIsWon] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleCardClick = (cardId: string) => {
    if (flipped.includes(cardId) || matched.includes(cardId) || flipped.length === 2) return;

    const newFlipped = [...flipped, cardId];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const card1 = cards.find((c: Card) => c.id === newFlipped[0])!;
      const card2 = cards.find((c: Card) => c.id === newFlipped[1])!;

      if (card1.index === card2.index) {
        // Match!
        setMatched([...matched, newFlipped[0], newFlipped[1]]);
        setFlipped([]);

        if (matched.length + 2 === cards.length) {
          setIsWon(true);
          setShowConfetti(true);
          setTimeout(() => {
            onComplete();
          }, 2000);
        }
      } else {
        // No match
        setTimeout(() => setFlipped([]), 600);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8 min-h-screen">
      {showConfetti && <Confetti />}

      <h2 className="text-3xl font-bold text-center">Match the Memories 🧸</h2>

      <div className="grid grid-cols-3 gap-4">
        {cards.map((card: Card) => (
          <motion.button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`w-24 h-24 rounded-lg flex items-center justify-center text-4xl cursor-pointer transition-all ${
              matched.includes(card.id) ? 'opacity-50' : ''
            }`}
            style={{
              backgroundColor: flipped.includes(card.id)
                ? card.type === 'teddy'
                  ? '#D2B48C'
                  : '#FFB6C1'
                : '#E5D5C0',
              boxShadow: flipped.includes(card.id) ? '0 0 15px rgba(210, 180, 140, 0.6)' : 'none',
            }}
            whileHover={{ scale: 0.95 }}
            whileTap={{ scale: 0.9 }}
          >
            {flipped.includes(card.id) || matched.includes(card.id) ? (
              <div className="text-center">
                <div className="text-3xl">{card.type === 'teddy' ? '🧸' : '📷'}</div>
                {card.caption && <p className="text-xs mt-1">{card.caption}</p>}
              </div>
            ) : (
              <span className="text-3xl">?</span>
            )}
          </motion.button>
        ))}
      </div>

      {isWon && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-2xl font-bold text-amber-600 text-center"
        >
          ✨ All Memories Matched! ✨
        </motion.div>
      )}
    </div>
  );
};
