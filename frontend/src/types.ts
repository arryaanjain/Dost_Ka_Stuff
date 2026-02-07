export interface Day {
  id: string;
  number: number;
  title: string;
  theme: string;
  themeColor: string;
  unlockDate: string;
  description: string;
  rewardMessage: string;
}

export interface GameState {
  completed: string[];
  currentDay: string | null;
  timeLockEnabled?: boolean;
}

export type GameResult = {
  success: boolean;
  message?: string;
};
