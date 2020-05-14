import { RESTART_RACE, FINISH, START_TIMER, START_RACE } from '../consts';

export interface ActionCreator {
  type: string;
  time?: number;
}

export const setFinish = (time: number): ActionCreator => ({
  type: FINISH,
  time,
});

export const startRace = (time: number): ActionCreator => ({
  type: START_RACE,
  time,
});

export const startTimer = (): ActionCreator => ({
  type: START_TIMER,
});

export const restartRace = (): ActionCreator => ({
  type: RESTART_RACE,
});
