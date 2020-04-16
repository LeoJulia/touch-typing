import { FINISH, START_TIMER, START_RACE } from '../consts';

export const setFinish = time => ({
  type: FINISH,
  time,
});

export const startRace = time => ({
  type: START_RACE,
  time,
});

export const startTimer = () => ({
  type: START_TIMER,
});
