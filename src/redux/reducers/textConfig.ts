import { CHANGE_LANG, REQUEST_TEXTS, RECEIVE_TEXTS } from '../consts';

const defaultStore = {
  selectedLang: 'en',
  isFetching: false,
  items: [],
  selectedText: null,
};

export const textConfig = (store = defaultStore, action) => {
  switch (action.type) {
    case CHANGE_LANG:
      return { ...store, selectedLang: action.langCode };
    case REQUEST_TEXTS:
      return { ...store, isFetching: true };
    case RECEIVE_TEXTS:
      return { ...store, isFetching: false, items: action.texts };
    default:
      return store;
  }
};
