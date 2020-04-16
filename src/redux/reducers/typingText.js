import { FINISH, START_TIMER, START_RACE } from '../consts';

const defaultStore = {
  typingText: {
    activeText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    isTimer: false,
  },
};

export const typingText = (store = defaultStore.typingText, action) => {
  switch (action.type) {
    case FINISH:
      return { ...store, endTime: action.time };
    case START_TIMER:
      return {
        ...store,
        isTimer: true,
      };
    case START_RACE:
      return {
        ...store,
        isTimer: false,
        startTime: action.time,
      };
    default:
      return store;
  }
};
