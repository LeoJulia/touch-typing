import { combineReducers } from 'redux';

import { typingText } from './typingText';
import { textConfig } from './textConfig';

export const reducer = combineReducers({ typingText, textConfig });
