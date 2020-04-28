import { CHANGE_LANG, REQUEST_TEXTS, RECEIVE_TEXTS } from '../consts';

export const changeLang = langCode => ({
  type: CHANGE_LANG,
  langCode,
});

export const requestTexts = () => ({
  type: REQUEST_TEXTS,
});

export const receiveTexts = json => ({
  type: RECEIVE_TEXTS,
  texts: json,
});

// eslint-disable-next-line arrow-body-style
export const fetchTexts = () => {
  return function(dispatch) {
    dispatch(requestTexts());

    return fetch('https://glacial-earth-88103.herokuapp.com/texts')
      .then(
        res => res.json(),
        error => console.error('An error occurred.', error),
      )
      .then(json => dispatch(receiveTexts(json)));
  };
};
