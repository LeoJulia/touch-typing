import React from 'react';
import PropTypes from 'prop-types';

import styles from './TextField.scss';

export const TextField = ({ text }) => <div className={styles.textField}>{text}</div>;

TextField.propTypes = {
  text: PropTypes.string,
};
