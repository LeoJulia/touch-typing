import { FINISH, START_TIMER, START_RACE, RESTART_RACE } from '../consts';
import { ActionCreator } from '../actions';

export interface ITypingText {
  isTimer: boolean;
  activeText?: string;
  startTime?: number;
  endTime?: number;
}

interface IActionTypingText extends ActionCreator {}

const defaultStore: ITypingText = {
  activeText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  isTimer: false,
};

export const typingText = (store = defaultStore, action: IActionTypingText) => {
  switch (action.type) {
    case FINISH:
      return { ...store, endTime: action.time };
    case START_TIMER:
      return {
        ...store,
        isTimer: true,
        activeText: action.text,
      };
    case START_RACE:
      return {
        ...store,
        isTimer: false,
        startTime: action.time,
      };
    case RESTART_RACE:
      return {
        ...defaultStore,
      };
    default:
      return store;
  }
};
