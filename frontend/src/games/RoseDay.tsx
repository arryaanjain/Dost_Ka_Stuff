import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

interface RoseDayProps {
  onComplete: () => void;
}

const RoseSVG: React.FC<{ colors: string[]; className?: string }> = ({ colors, className = "w-64 h-96" }) => {
  // Create a beautiful SVG rose with customizable petal colors
  const petalCount = Math.max(colors.length, 5);
  const petals = Array.from({ length: petalCount }, (_, i) => {
    const angle = (360 / petalCount) * i;
    const colorIndex = i % colors.length;
    const color = colors[colorIndex] || '#FFB6C1';
    return { angle, color, index: i };
  });

  return (
    <svg viewBox="0 0 200 300" className={`${className} drop-shadow-xl`}>
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

const gardenRoses = [
  { color: '#F5F5F5', name: 'Pearl White Rose', meaning: 'Our love is pure & eternal' },
  { color: '#FFB6C1', name: 'Blush Pink Rose', meaning: 'I admire everything about you' },
  { color: '#FF69B4', name: 'Hot Pink Rose', meaning: 'You make my heart race' },
  { color: '#E11D48', name: 'Ruby Red Rose', meaning: 'I love you deeply & passionately' },
  { color: '#FACC15', name: 'Blazing Yellow Rose', meaning: 'You bring sunshine to my life' },
  { color: '#FDBA74', name: 'Real Peach Rose', meaning: 'I am so grateful for you' },
  { color: '#F97316', name: 'Sunset Orange Rose', meaning: 'I am fascinated by you' },
  { color: '#A78BFA', name: 'Dusty Mauve Rose', meaning: 'Enchanted from the first moment' },
];

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
  
  // Bouquet State
  const [bouquet, setBouquet] = useState<{ id: number; color: string; offset: number; rotation: number }[]>([]);

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
  
  const handleAddToBouquet = (color: string) => {
    // Add 3-4 roses per click to fill quickly
    const countToAdd = Math.floor(Math.random() * 2) + 3; // 3 or 4
    const newRoses = Array.from({ length: countToAdd }).map((_, i) => ({
      id: Date.now() + i,
      color,
      offset: Math.random() * 100 - 50, // Widen spread
      rotation: Math.random() * 60 - 30, // More rotation variance
    }));
    
    // Limit bouquet size to ~25 to keep it performant but "full"
    setBouquet(prev => [...prev, ...newRoses].slice(0, 30));
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
    <div className="flex flex-col items-center gap-16 p-8 min-h-screen bg-gradient-to-b from-rose-50 to-pink-50">
      {showConfetti && <Confetti />}

      {/* 1. Bouquet Builder (Moved to Top) */}
      <div className="w-full max-w-4xl relative">
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 border border-rose-200 shadow-xl min-h-[500px] flex flex-col items-center">
            <h3 className="text-3xl font-bold text-center text-rose-600 mb-4">
               Your Bouquet Builder 💐
            </h3>
            <p className="text-gray-600 mb-8 text-center">
                Click roses in the garden below to fill your bouquet!
            </p>

            <div className="relative w-full flex-1 flex justify-center items-end pb-10 overflow-visible">
                 {bouquet.length === 0 ? (
                     <div className="absolute inset-0 flex items-center justify-center text-gray-400 italic">
                         Your bouquet is empty...
                     </div>
                 ) : (
                      <div className="relative w-80 h-96 flex justify-center items-end perspective-1000">
                        {/* Bouquet Wrap - Back Layer (SVG) */}
                        <div className="absolute bottom-0 z-0 opacity-90">
                            <svg width="300" height="400" viewBox="0 0 200 300" className="drop-shadow-2xl">
                                <defs>
                                    <linearGradient id="coneGradientBack" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#9d174d" /> {/* Dark Pink */}
                                        <stop offset="50%" stopColor="#be185d" />
                                        <stop offset="100%" stopColor="#9d174d" />
                                    </linearGradient>
                                </defs>
                                {/* Back Triangle with upward curve for 3D opening */}
                                <path d="M 0 60 Q 100 30 200 60 L 100 300 Z" fill="url(#coneGradientBack)" />
                            </svg>
                        </div>

                        {/* Roses Container - Middle Layer */}
                        <div className="absolute bottom-[180px] flex justify-center items-end w-[240px] h-[300px] z-10">
                            <AnimatePresence>
                               {bouquet.map((rose, i) => (
                                   <motion.div
                                       key={rose.id}
                                       initial={{ opacity: 0, scale: 0, y: 100 }}
                                       animate={{ opacity: 1, scale: 1, y: 0 }}
                                       exit={{ opacity: 0, scale: 0 }}
                                       className="absolute bottom-0 origin-bottom"
                                       style={{
                                           marginBottom: `${Math.min(i * 3, 140) + Math.random() * 40}px`,
                                           marginLeft: `${rose.offset + (i % 2 === 0 ? i * 4 : -i * 4)}px`,
                                           zIndex: i,
                                           transform: `rotate(${rose.rotation}deg) scale(${0.7 + Math.random() * 0.4})`
                                       }}
                                   >
                                       <RoseSVG colors={[rose.color]} className="w-20 h-32 drop-shadow-md" />
                                   </motion.div>
                               ))}
                            </AnimatePresence>
                        </div>
                        
                        {/* Bouquet Wrap - Front Layer (SVG) */}
                        <div className="absolute bottom-0 z-20 pointer-events-none">
                            <svg width="300" height="400" viewBox="0 0 200 300" className="drop-shadow-xl">
                                <defs>
                                    <linearGradient id="coneGradientFront" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="rgba(255, 192, 203, 0.95)" />
                                        <stop offset="30%" stopColor="rgba(255, 255, 255, 0.4)" />
                                        <stop offset="50%" stopColor="rgba(255, 255, 255, 0.8)" /> {/* Highlight */}
                                        <stop offset="70%" stopColor="rgba(255, 255, 255, 0.4)" />
                                        <stop offset="100%" stopColor="rgba(255, 192, 203, 0.95)" />
                                    </linearGradient>
                                </defs>
                                {/* Front Triangle with downward curve (scoop) for 3D opening */}
                                <path d="M 0 60 Q 100 90 200 60 L 100 300 Z" fill="url(#coneGradientFront)" />
                                
                                {/* Fold/Crease Line */}
                                <path d="M 100 300 L 160 60" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
                            </svg>

                            {/* Ribbon */}
                            <div className="absolute top-[55%] left-1/2 -translate-x-1/2 w-16 h-16 bg-rose-600 rounded-full shadow-lg flex items-center justify-center border-4 border-white z-30">
                                <span className="text-3xl drop-shadow-md">🎀</span>
                            </div>
                        </div>
                    </div>
                 )}
            </div>

            {bouquet.length > 0 && (
                <button 
                  onClick={() => setBouquet([])}
                  className="mt-8 px-6 py-2 bg-white text-rose-500 rounded-full text-sm font-bold shadow-sm hover:shadow-md transition-all border border-rose-100 z-30"
                >
                    Clear Bouquet
                </button>
            )}
        </div>
      </div>

      {/* 2. Interactive Rose Garden */}
      <div className="w-full max-w-6xl mt-8">
        <h3 className="text-3xl font-bold text-center text-rose-600 mb-2">
          Interactive Rose Garden 🌿
        </h3>
        <p className="text-center text-gray-600 mb-10">
          Hover to see meanings, <span className="font-bold text-rose-500">Click</span> to add to your bouquet!
        </p>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {gardenRoses.map((rose, idx) => (
            <motion.div
              key={idx}
              className="relative group flex flex-col items-center cursor-pointer"
              whileHover={{ scale: 1.1, y: -10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAddToBouquet(rose.color)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
            >
              <div className="relative">
                <RoseSVG colors={[rose.color]} className="w-24 h-36 md:w-32 md:h-48" />
                
                {/* Tooltip */}
                <div 
                  className="absolute bottom-3/4 left-1/2 -translate-x-1/2 mb-2 w-40 md:w-48 bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-xl border border-rose-100 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10 transform translate-y-2 group-hover:translate-y-0"
                >
                  <h4 className="font-bold text-rose-600 text-sm md:text-base">{rose.name}</h4>
                  <p className="text-xs md:text-sm text-gray-700">{rose.meaning}</p>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-8 border-transparent border-t-white/95"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. Design Your Custom Rose (Original Game) */}
      <div className="w-full max-w-2xl flex flex-col items-center bg-white/60 p-8 rounded-3xl shadow-sm border border-rose-100">
        <h2 className="text-4xl font-bold text-center text-rose-600 mb-4">
          Design Your Custom Rose 🌹
        </h2>

        <p className="text-lg text-gray-700 text-center max-w-md mb-6">
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
        <div className="text-center mb-8">
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
    </div>
  );
};
