import { CHANGE_LANG, REQUEST_TEXTS, RECEIVE_TEXTS } from '../consts';

export interface TextConfigCreator {
  type: string;
  langCode?: string;
  texts?: string[];
}

export const changeLang = (langCode: string): TextConfigCreator => ({
  type: CHANGE_LANG,
  langCode,
});

export const requestTexts = (): TextConfigCreator => ({
  type: REQUEST_TEXTS,
});

export const receiveTexts = (json): TextConfigCreator => ({
  type: RECEIVE_TEXTS,
  texts: json,
});

export const fetchTexts = () => {
  return (dispatch) => {
    dispatch(requestTexts());

    return fetch('https://glacial-earth-88103.herokuapp.com/training')
      .then(
        (res) => res.json(),
        (error) => console.error('An error occurred.', error),
      )
      .then((json) => dispatch(receiveTexts(json)));
  };
};
