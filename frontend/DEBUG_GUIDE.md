# 🎮 Valentine Week - Game Debugging Guide

## Changes Made for Debugging

### 1. **Disabled Unlock Feature** ✅
- All 7 days are now immediately accessible (no date-based unlocking)
- Can test all games at any time
- `DayCard.tsx` - Set `isUnlocked = true` always

### 2. **Fixed CSS Conflicts** ✅
- Changed from `@tailwind base/components/utilities` to `@import "tailwindcss"`
- Removed duplicate body/html resets in App.css
- Using proper @tailwindcss/vite plugin with Tailwind CSS v4
- No more conflicting CSS declarations

### 3. **Improved Layout** ✅
- Enhanced gradient backgrounds (rose → pink → red)
- Larger, more readable typography
- Better spacing and sizing
- 4-column responsive grid for 7 days (scales down on mobile)
- Modern rounded corners and shadows

### 4. **Game Debug Checklist**

---

## 🧪 Testing Each Game

### 🌹 Day 1 - Rose Day
**What it does:** Pick 5 roses - click the correct color

**Files:** `src/games/RoseDay.tsx`

**How to test:**
1. Click "🌹 Rose Day" from the map
2. Click "Let's Play!"
3. Click the 2nd rose (Light Pink - index 1)
4. Should see bloom animation and victory
5. Check reward message appears

**Key code:** `correctRose = 1`

**Known Issues to Check:**
- [ ] Rose colors display correctly
- [ ] Animation on correct click
- [ ] Shake animation on wrong click
- [ ] Victory message shows
- [ ] Reward modal appears after 2 seconds

---

### 💍 Day 2 - Propose Day
**What it does:** Click YES, the NO button runs away

**Files:** `src/games/ProposeDay.tsx`

**How to test:**
1. Click "💍 Propose Day"
2. Try hovering over NO button (should move away)
3. Click YES
4. Should see confetti and victory message
5. Check reward screen

**Known Issues to Check:**
- [ ] NO button moves smoothly on hover
- [ ] NO button text changes (5 iterations)
- [ ] YES button stays in place
- [ ] Confetti effect works
- [ ] Victory modal shows

---

### 🍫 Day 3 - Chocolate Day
**What it does:** Catch 5 falling 🍫 in 10 seconds

**Files:** `src/games/ChocolateDay.tsx`

**How to test:**
1. Click "🍫 Chocolate Day"
2. Click on falling chocolates (dark area)
3. Target: 5 catches in 10 seconds
4. Watch timer count down
5. If successful, victory screen appears

**Key values to adjust:**
```typescript
targetCatches = 5
spawnInterval = 700ms
duration = 4s (animation)
totalTime = 10s
```

**Known Issues to Check:**
- [ ] Chocolates spawn regularly
- [ ] Click detection works smoothly
- [ ] Counter increments correctly
- [ ] Timer counts down properly
- [ ] Win/lose condition triggers correctly

---

### 🧸 Day 4 - Teddy Day
**What it does:** Match 3 pairs of teddy/photo cards

**Files:** `src/games/TeddyDay.tsx`

**How to test:**
1. Click "🧸 Teddy Day"
2. Click 2 cards to flip them
3. If they match (both same number), they stay revealed
4. Repeat until all pairs matched
5. Victory screen should appear

**Pairs:**
- Pair 0: 🧸 Teddy + 📷 "This smile"
- Pair 1: 🧸 Teddy + 📷 "That laugh"
- Pair 2: 🧸 Teddy + 📷 "Forever"

**Known Issues to Check:**
- [ ] Cards flip on click
- [ ] Matching logic works
- [ ] Cards stay flipped when matched
- [ ] Unmatched cards flip back after 600ms
- [ ] Captions display in cards
- [ ] Victory triggers after all pairs matched

---

### 🤝 Day 5 - Promise Day
**What it does:** Drag slider from 0 → 100%

**Files:** `src/games/PromiseDay.tsx`

**How to test:**
1. Click "🤝 Promise Day"
2. Drag the slider all the way to the right
3. Text should change: "I promise..." → "...to stay" → "...forever"
4. At 100%, victory screen shows

**Known Issues to Check:**
- [ ] Slider is responsive to mouse/touch
- [ ] Text updates as slider moves
- [ ] Text progression is smooth
- [ ] Victory triggers at exactly 100%
- [ ] No bugs with slider edge cases

---

### 💋 Day 6 - Kiss Day
**What it does:** Click 3 moving 💋 emojis

**Files:** `src/games/KissDay.tsx`

**How to test:**
1. Click "💋 Kiss Day"
2. Click the animated 💋 emoji
3. It moves to new random position
4. Click 3 times to win
5. Victory screen appears

**Key code:**
```typescript
targetCatches = 3
updateInterval = 800ms
```

**Known Issues to Check:**
- [ ] Kiss emoji animates (scale & rotate)
- [ ] Click detection works reliably
- [ ] New position generates after each click
- [ ] Counter increments correctly
- [ ] Victory at exactly 3 catches

---

### ❤️ Day 7 - Valentine Day (Final)
**What it does:** Tap 4 photos in correct sequence from 3×3 grid

**Files:** `src/games/ValentineDay.tsx`

**How to test:**
1. Click "❤️ Valentine Day"
2. The sequence is: Beach (4) → Birthday (1) → Music (5) → Magic (8)
3. Click them in order
4. Wrong click = grid shake + reset
5. Correct sequence = love letter appears with reveal animation

**Grid positions (0-8):**
```
0:😊  1:🎂  2:🌅
3:🎭  4:🏖️  5:🎸
6:📚  7:🍕  8:💫
```

**Correct sequence:** [4, 1, 5, 8]

**Known Issues to Check:**
- [ ] Grid shuffles on load
- [ ] Correct taps highlight
- [ ] Wrong tap triggers shake + reset
- [ ] Progress indicator works (1/4, 2/4, etc.)
- [ ] Love letter appears after sequence
- [ ] Text reveals line by line

---

## 🎨 Visual Debugging Tips

### Check Color Theme
Each day should have matching colors:
- Rose: Soft Pink (#FFB6C1)
- Propose: Red (#FF0000)
- Chocolate: Brown (#8B4513)
- Teddy: Beige (#D2B48C)
- Promise: Lavender (#B19CD9)
- Kiss: Hot Pink (#FF1493)
- Valentine: Deep Red (#DC143C)

### Check Mobile Responsiveness
- Grid goes 1 column on mobile (< 640px)
- 2 columns on tablet (640px - 1024px)
- 4 columns on desktop (> 1024px)

### Check Animations
- Modals should slide in with spring animation
- Cards should scale on hover
- Games should have smooth transitions

---

## 🔧 Common Debugging Steps

### If games don't appear:
```bash
# Check browser console for errors
# Clear localStorage
localStorage.clear()

# Rebuild
npm run build

# Try dev server
npm run dev
```

### If styling is broken:
1. Check `index.css` has `@import "tailwindcss"`
2. Verify vite.config.ts has `tailwindcss()` plugin
3. Check for CSS conflicts in browser DevTools
4. Look for class typos in components

### If animations are janky:
1. Disable browser extensions
2. Check GPU acceleration in browser settings
3. Open DevTools → Performance tab
4. Check for console warnings

### If games won't save progress:
1. Check if localStorage is enabled
2. Look for errors in browser console
3. Verify `src/utils/storage.ts` is working
4. Check Redux DevTools if using Redux

---

## 📊 Progress Tracking

Once you verify each game works, mark it here:

- [ ] Rose Day - All mechanics work
- [ ] Propose Day - Button runs away, YES wins
- [ ] Chocolate Day - Catch mechanic works
- [ ] Teddy Day - Memory flip works
- [ ] Promise Day - Slider progression works
- [ ] Kiss Day - Catch mechanic works
- [ ] Valentine Day - Sequence memory works

---

## 🚀 Next Steps After Debugging

Once all games are verified working:
1. Re-enable unlock dates (remove `isUnlocked = true`)
2. Add more customization to games
3. Add settings/difficulty levels
4. Consider adding background music toggle
5. Add more visual polish (particles, effects)

---

## 📝 Notes

- All games use Framer Motion for animations
- All games persist completion to localStorage
- All games show reward modal with confetti
- All games have theme colors that match the day
- No backend required - fully client-side

