import { combineReducers } from 'redux';

const defaultStore = {
  typingText: {
    activeText:
      // eslint-disable-next-line max-len
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac sem dui. Sed id efficitur purus. Proin pretium lacus purus, et sagittis nunc mollis ac. Morbi porta lobortis pulvinar. Ut non ante et sem sagittis facilisis nec quis est. Nullam in magna dolor. Suspendisse vel dapibus nunc, id posuere est. Nullam accumsan fermentum lacus, id commodo diam condimentum in.',
    isFinish: false,
  },
};

const typingText = (store = defaultStore.typingText, action) => {
  switch (action.type) {
    case 'FINISH':
      return { ...store, isFinish: true };
    default:
      return store;
  }
};

export const reducer = combineReducers({ typingText });
