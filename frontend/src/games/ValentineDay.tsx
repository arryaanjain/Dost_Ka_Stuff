import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

interface ValentineDayProps {
  onComplete: () => void;
}

interface Card {
  id: string;
  imagePath: string;
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export const ValentineDay: React.FC<ValentineDayProps> = ({ onComplete }) => {
  // Image paths from the public folder
  const images = [
    '/1.JPG',
    '/2.PNG',
    '/3.PNG',
    '/4.JPG'
  ];

  // Create pairs of cards (2 cards for each image)
  const createInitialCards = (): Card[] => {
    const cards: Card[] = [];
    images.forEach((imagePath, index) => {
      // First card of the pair
      cards.push({
        id: `${index}-a`,
        imagePath,
        pairId: index,
        isFlipped: false,
        isMatched: false
      });
      // Second card of the pair
      cards.push({
        id: `${index}-b`,
        imagePath,
        pairId: index,
        isFlipped: false,
        isMatched: false
      });
    });
    // Shuffle the cards
    return cards.sort(() => Math.random() - 0.5);
  };

  const [cards] = useState(createInitialCards());
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [isWon, setIsWon] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleCardClick = (cardId: string) => {
    // Prevent clicking if card is already flipped, matched, or two cards are already flipped
    if (flipped.includes(cardId) || matched.includes(cardId) || flipped.length === 2) return;

    const newFlipped = [...flipped, cardId];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const card1 = cards.find((c: Card) => c.id === newFlipped[0])!;
      const card2 = cards.find((c: Card) => c.id === newFlipped[1])!;

      if (card1.pairId === card2.pairId) {
        // Match found!
        const newMatched = [...matched, newFlipped[0], newFlipped[1]];
        setMatched(newMatched);
        setFlipped([]);

        // Check if all cards are matched
        if (newMatched.length === cards.length) {
          setIsWon(true);
          setShowConfetti(true);
          setTimeout(() => {
            onComplete();
          }, 3000);
        }
      } else {
        // No match - flip back after delay
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8 min-h-screen bg-gradient-to-br from-pink-50 to-red-50">
      {showConfetti && <Confetti />}

      <h2 className="text-4xl font-bold text-center text-pink-600">
        Match the Memories 💕
      </h2>
      <p className="text-lg text-gray-600">Find all the matching pairs!</p>

      <div className="grid grid-cols-4 gap-4 max-w-4xl">
        {cards.map((card: Card) => (
          <motion.button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`relative w-32 h-32 rounded-xl overflow-hidden cursor-pointer transition-all ${matched.includes(card.id) ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            style={{
              backgroundColor: '#FFE5EC',
              border: '3px solid #FFB6C1',
              boxShadow: flipped.includes(card.id) || matched.includes(card.id)
                ? '0 0 20px rgba(255, 182, 193, 0.8)'
                : '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
            whileHover={{ scale: matched.includes(card.id) ? 1 : 1.05 }}
            whileTap={{ scale: matched.includes(card.id) ? 1 : 0.95 }}
          >
            {flipped.includes(card.id) || matched.includes(card.id) ? (
              <img
                src={card.imagePath}
                alt="Memory"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-200 to-red-200">
                <span className="text-5xl">❤️</span>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      <div className="text-lg font-semibold text-gray-700">
        Matches Found: {matched.length / 2} / {cards.length / 2}
      </div>

      {isWon && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-3xl font-bold text-pink-600 text-center"
        >
          ✨ All Memories Matched! You're Amazing! ✨
        </motion.div>
      )}
    </div>
  );
};
