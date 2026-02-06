import type { GameState } from '../types';

const STORAGE_KEY = 'valentine_game_state';

export const getGameState = (): GameState => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : { completed: [], currentDay: null };
};

export const saveGameState = (state: GameState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const markDayCompleted = (dayId: string) => {
  const state = getGameState();
  if (!state.completed.includes(dayId)) {
    state.completed.push(dayId);
    saveGameState(state);
  }
};

export const isDayCompleted = (dayId: string): boolean => {
  const state = getGameState();
  return state.completed.includes(dayId);
};

export const isDayUnlocked = (unlockDate: string): boolean => {
  return new Date() >= new Date(unlockDate);
};
