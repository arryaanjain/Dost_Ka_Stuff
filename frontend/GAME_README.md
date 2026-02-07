# 💖 Valentine Week – Level-Based Love Game

A beautiful, interactive 7-level Valentine's Day game where each day unlocks a new mini-game with unique mechanics and emotional rewards.

## ✨ Features

### 🎮 7 Unique Game Levels
- **Day 1 - Rose Day** 🌹: Pick the perfect rose (visual matching)
- **Day 2 - Propose Day** 💍: A fleeing "NO" button and eternal "YES"
- **Day 3 - Chocolate Day** 🍫: Fast-paced candy catching game
- **Day 4 - Teddy Day** 🧸: Memory flip card game with captions
- **Day 5 - Promise Day** 🤝: Slider-based promise progression
- **Day 6 - Kiss Day** 💋: Catch multiple kisses across the screen
- **Day 7 - Valentine Day** ❤️: Final memory matrix with love letter reveal

### 🔓 Progressive Unlock System
- Days unlock on specific dates
- Real-time countdown for locked days
- Progress tracking across sessions
- LocalStorage persistence

### 🎨 Beautiful UI/UX
- Smooth Framer Motion animations
- Color-coded days with matching themes
- Confetti celebrations on victory
- Mobile-responsive design
- Gradient backgrounds and modern styling

### 💾 Persistent Game State
- Progress saved to localStorage
- Completion badges for finished levels
- Settings panel with reset option
- Progress bar showing overall completion

## 🛠️ Tech Stack

- **React 19** - UI Framework
- **TypeScript** - Type safety
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Confetti** - Victory effects

## 📦 Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎮 Game Mechanics Overview

### Unlock Logic
```typescript
// Days unlock based on date comparison
isDayUnlocked = new Date() >= new Date(unlockDate)
```

### Progress Tracking
```typescript
// Completed days stored in localStorage
completedDays: ["rose", "propose", "chocolate", ...]
```

### Game Flow
```
Locked Card → Click Day → Intro Modal → Start Game → Win Game → Reward Modal → Back to Map
```

## 📁 Project Structure

```
src/
├── components/
│   ├── DayCard.tsx          # Day selector card
│   ├── GameContainer.tsx    # Game wrapper & renderer
│   ├── GameMap.tsx          # Main menu/map
│   ├── IntroModal.tsx       # Pre-game instructions
│   ├── ProgressBar.tsx      # Completion progress
│   ├── RewardModal.tsx      # Victory screen
│   └── SettingsModal.tsx    # Settings & reset
├── games/
│   ├── RoseDay.tsx          # Pick the perfect rose
│   ├── ProposeDay.tsx       # Runaway NO button
│   ├── ChocolateDay.tsx     # Falling candy catch
│   ├── TeddyDay.tsx         # Memory flip game
│   ├── PromiseDay.tsx       # Promise slider
│   ├── KissDay.tsx          # Catch the kiss
│   └── ValentineDay.tsx     # Memory matrix finale
├── data/
│   └── days.ts              # Day definitions & data
├── utils/
│   └── storage.ts           # localStorage helpers
├── types.ts                 # TypeScript interfaces
├── App.tsx                  # Root component
└── main.tsx                 # Entry point
```

## 🎯 Key Implementation Details

### Type-Safe Imports
All type imports use `type` keyword for proper tree-shaking:
```typescript
import type { Day } from '../types';
```

### Theme Colors
Each day has its own color palette for visual cohesion:
- Rose: Soft Pink (#FFB6C1)
- Propose: Red (#FF0000)
- Chocolate: Brown (#8B4513)
- Teddy: Beige (#D2B48C)
- Promise: Lavender (#B19CD9)
- Kiss: Hot Pink (#FF1493)
- Valentine: Deep Red (#DC143C)

### Animation Framework
Framer Motion provides:
- Scale transitions on card clicks
- Smooth modal entrances
- Confetti burst effects
- Interactive element feedback

## 🎮 Individual Game Details

### Rose Day
**Mechanic**: Click the correct rose color
- 5 roses displayed in random order
- Correct rose blooms with animation
- Wrong roses shake gently

### Propose Day
**Mechanic**: "NO" button runs away, "YES" stays
- "NO" button moves on hover/touch
- Changes text each time (humorous)
- Victory on "YES" click

### Chocolate Day
**Mechanic**: Catch falling 🍫 emojis
- Target: 5 chocolates in 10 seconds
- Spawn interval: 700ms
- Time pressure creates urgency

### Teddy Day
**Mechanic**: Flip cards to match pairs
- 3 pairs (6 cards total)
- Each match reveals emotional caption
- Full memory game experience

### Promise Day
**Mechanic**: Drag slider from 0 to 100%
- Text evolves as slider progresses
- Pure symbolism-based gameplay
- Meditation-like experience

### Kiss Day
**Mechanic**: Click moving kiss emoji
- Target: 3 kisses caught
- Kiss appears in random position
- Playful, flirty tone

### Valentine Day
**Mechanic**: Tap photos in correct sequence
- 3×3 grid of memory photos
- Must select 4 specific photos in order
- Wrong selection resets progress
- Victory reveals scrolling love letter

## 📱 Mobile Optimization

- Touch event handlers for all games
- Responsive grid layouts
- Mobile-friendly button sizes
- Scrollable content areas
- Optimized animations for mobile

## 🎨 Styling Approach

Uses Tailwind CSS utility classes throughout:
- Flexbox/Grid layouts
- Gradient backgrounds
- Shadow and border utilities
- Responsive breakpoints (sm, md, lg)
- Color scales for consistency

## 🚀 Performance

- Production build: 344KB JS (109KB gzipped)
- 445 modules optimized
- Code splitting via Vite
- Fast animations with Framer Motion
- Lazy component loading via React

## 💾 LocalStorage Schema

```json
{
  "valentine_game_state": {
    "completed": ["rose", "propose", "chocolate"],
    "currentDay": null
  }
}
```

## 🎯 Customization Guide

### Change Unlock Dates
Edit `src/data/days.ts`:
```typescript
unlockDate: `${currentYear}-02-07` // Change this date
```

### Adjust Game Difficulty
- **ChocolateDay**: Modify `targetCatches` or spawn interval
- **ValentineDay**: Change `correctSequence` array
- **TeddyDay**: Adjust card pairs in `initialCards`

### Customize Reward Messages
Edit the `rewardMessage` field in each day object in `days.ts`

### Change Colors
Each day has a `themeColor` property - update hex values for new theme

## 🐛 Troubleshooting

### Games not appearing?
- Check browser console for errors
- Verify day is unlocked (correct date)
- Clear localStorage: `localStorage.clear()`

### Animations stuttering?
- Disable browser extensions
- Check GPU acceleration in browser settings
- Reduce confetti count in RewardModal

### Styles not loading?
- Ensure Tailwind CSS is in index.css
- Clear Vite cache: `rm -rf dist/`
- Rebuild with `npm run build`

## 📄 License

Created with ❤️ for Valentine's Day

## 🎉 Special Notes

- Each game takes 1-2 minutes to complete
- Total campaign playtime: ~15 minutes
- Can be replayed anytime
- Progress persists across browser sessions
- No backend required - fully client-side

---

**Made with love.** ❤️
