import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './TextField.scss';

export const TextField = ({ typeFocus, afterFocus, beforeFocus, isError }) => (
  <div className={styles.textField}>
    <span className={styles.beforeFocus}>{`${beforeFocus} `}</span>
    <span
      className={classNames({
        [styles.focus]: true,
        [styles.error]: isError,
      })}
    >
      {typeFocus}
    </span>
    <span>{` ${afterFocus}`}</span>
  </div>
);

TextField.propTypes = {
  typeFocus: PropTypes.string,
  afterFocus: PropTypes.string,
  beforeFocus: PropTypes.string,
  isError: PropTypes.bool,
};
