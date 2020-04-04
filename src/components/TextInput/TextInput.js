import React from 'react';
import PropTypes from 'prop-types';

import styles from './TextInput.scss';

export const TextInput = ({ onTyping }) => {
  const onInput = ({ target }) => {
    if (target.value.split('').includes(' ')) {
      onTyping(target);
      target.value = '';
    }
  };

  return <input className={styles.textInput} type="text" onInput={onInput} />;
};

TextInput.propTypes = {
  onTyping: PropTypes.func,
};
