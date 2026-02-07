import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

interface RoseDayProps {
  onComplete: () => void;
}

const RoseSVG: React.FC<{ colors: string[] }> = ({ colors }) => {
  // Create a beautiful SVG rose with customizable petal colors
  const petalCount = Math.max(colors.length, 5);
  const petals = Array.from({ length: petalCount }, (_, i) => {
    const angle = (360 / petalCount) * i;
    const colorIndex = i % colors.length;
    const color = colors[colorIndex] || '#FFB6C1';
    return { angle, color, index: i };
  });

  return (
    <svg viewBox="0 0 200 300" className="w-64 h-96 drop-shadow-xl">
      {/* Petals */}
      {petals.map((petal) => {
        const rad = (petal.angle * Math.PI) / 180;
        const cx = 100 + 40 * Math.cos(rad);
        const cy = 100 + 40 * Math.sin(rad);
        return (
          <g key={`petal-${petal.index}`}>
            {/* Outer petal */}
            <ellipse
              cx={cx}
              cy={cy}
              rx="35"
              ry="50"
              fill={petal.color}
              opacity="0.9"
              transform={`rotate(${petal.angle} ${cx} ${cy})`}
              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
            />
            {/* Inner highlight */}
            <ellipse
              cx={cx}
              cy={cy - 15}
              rx="15"
              ry="25"
              fill="white"
              opacity="0.3"
              transform={`rotate(${petal.angle} ${cx} ${cy})`}
            />
          </g>
        );
      })}

      {/* Inner petals (deeper layer) */}
      {petals.slice(0, Math.ceil(petalCount / 2)).map((petal, idx) => {
        const rad = ((petal.angle + 30) * Math.PI) / 180;
        const cx = 100 + 20 * Math.cos(rad);
        const cy = 100 + 20 * Math.sin(rad);
        const color = colors[(idx + 1) % colors.length] || '#FF69B4';
        return (
          <ellipse
            key={`inner-${idx}`}
            cx={cx}
            cy={cy}
            rx="25"
            ry="35"
            fill={color}
            opacity="0.85"
            transform={`rotate(${petal.angle + 30} ${cx} ${cy})`}
          />
        );
      })}

      {/* Center bud */}
      <circle cx="100" cy="100" r="18" fill="#FFB6C1" opacity="0.95" />
      <circle cx="100" cy="100" r="12" fill="#FF69B4" opacity="0.8" />

      {/* Stem */}
      <path
        d="M 100 150 Q 95 180 92 220 Q 90 250 85 280"
        stroke="#2d5016"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* Leaves */}
      <ellipse
        cx="80"
        cy="200"
        rx="12"
        ry="25"
        fill="#3a7d1a"
        opacity="0.8"
        transform="rotate(-35 80 200)"
      />
      <ellipse
        cx="110"
        cy="240"
        rx="12"
        ry="25"
        fill="#3a7d1a"
        opacity="0.8"
        transform="rotate(35 110 240)"
      />
    </svg>
  );
};

export const RoseDay: React.FC<RoseDayProps> = ({ onComplete }) => {
  const availableColors = [
    { id: 0, color: '#FF69B4', name: 'Hot Pink' },
    { id: 1, color: '#FFB6C1', name: 'Light Pink' },
    { id: 2, color: '#FF1493', name: 'Deep Pink' },
    { id: 3, color: '#FFC0CB', name: 'Pink' },
    { id: 4, color: '#FF0000', name: 'Red' },
    { id: 5, color: '#FF69B4', name: 'Magenta' },
  ];

  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isWon, setIsWon] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const requiredColorCount = 3; // Need to pick 3 colors to complete

  const handleColorPick = (color: string) => {
    if (selectedColors.includes(color)) {
      // Remove color if already selected
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      // Add color
      const newColors = [...selectedColors, color];
      setSelectedColors(newColors);

      // Win condition: picked 3 colors
      if (newColors.length === requiredColorCount) {
        setIsWon(true);
        setShowConfetti(true);
      }
    }
  };

  if (isWon) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8 min-h-screen bg-gradient-to-b from-rose-50 to-pink-50 relative">
        {showConfetti && <Confetti />}

        {/* Back to Map Button (Top Right) */}
        <motion.button
          onClick={onComplete}
          className="absolute top-6 right-6 text-2xl hover:scale-110 transition-transform bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg border-2 border-rose-200"
          title="Back to map"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          ←
        </motion.button>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-rose-600 mb-6">Your Perfect Rose 🌹</h2>
          <div className="flex justify-center my-8">
            <RoseSVG colors={selectedColors} />
          </div>
          <p className="text-2xl font-bold text-rose-600 mb-2">💖 A rose as unique as your love 💖</p>
          <p className="text-lg text-gray-700">With your chosen shades of:</p>
          <div className="flex gap-3 justify-center mt-4 flex-wrap max-w-md mx-auto">
            {selectedColors.map((color, idx) => {
              const colorName = availableColors.find(c => c.color === color)?.name || 'Color';
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="px-4 py-2 rounded-full text-white font-semibold text-sm"
                  style={{ backgroundColor: color }}
                >
                  {colorName}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 min-h-screen bg-gradient-to-b from-rose-50 to-pink-50">
      {showConfetti && <Confetti />}

      <h2 className="text-4xl font-bold text-center text-rose-600 mb-4">
        Design Your Custom Rose 🌹
      </h2>

      <p className="text-lg text-gray-700 text-center max-w-md">
        Choose {requiredColorCount} shades to design a rose that's as beautiful as you are.
      </p>

      {/* Rose Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex justify-center my-4"
      >
        <RoseSVG colors={selectedColors.length > 0 ? selectedColors : ['#FFB6C1']} />
      </motion.div>

      {/* Progress */}
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">
          Colors selected: <span className="font-bold text-rose-600">{selectedColors.length}</span>
          {' '}/{requiredColorCount}
        </p>
        <div className="flex gap-2 justify-center">
          {Array.from({ length: requiredColorCount }).map((_, i) => (
            <motion.div
              key={i}
              className="w-6 h-6 rounded-full border-2"
              style={{
                backgroundColor: i < selectedColors.length ? selectedColors[i] : '#e5e7eb',
                borderColor: i < selectedColors.length ? selectedColors[i] : '#d1d5db',
              }}
              animate={i < selectedColors.length ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.4 }}
            />
          ))}
        </div>
      </div>

      {/* Color Palette */}
      <div className="max-w-2xl">
        <p className="text-sm font-bold text-gray-700 mb-3 text-center">Pick Your Colors:</p>
        <div className="grid grid-cols-6 gap-3">
          {availableColors.map((colorOption) => (
            <motion.button
              key={colorOption.id}
              onClick={() => handleColorPick(colorOption.color)}
              className={`flex flex-col items-center gap-2 cursor-pointer transition-all ${
                selectedColors.includes(colorOption.color) ? 'ring-4 ring-offset-2' : ''
              }`}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            >
              <div
                className="w-16 h-16 rounded-lg shadow-md transition-transform"
                style={{
                  backgroundColor: colorOption.color,
                  boxShadow: selectedColors.includes(colorOption.color)
                    ? `0 0 15px ${colorOption.color}, inset 0 0 0 2px white`
                    : 'none',
                }}
              />
              <p className="text-xs text-gray-600 text-center">{colorOption.name}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};
