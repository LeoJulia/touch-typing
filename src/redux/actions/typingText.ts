import { RESTART_RACE, FINISH, START_TIMER, START_RACE } from '../consts';

export interface ActionCreator {
  type: string;
  time?: number;
  text?: string;
}

export const setFinish = (time: number): ActionCreator => ({
  type: FINISH,
  time,
});

export const startRace = (time: number): ActionCreator => ({
  type: START_RACE,
  time,
});

export const startTimer = (text): ActionCreator => ({
  type: START_TIMER,
  text,
});

export const restartRace = (): ActionCreator => ({
  type: RESTART_RACE,
});
