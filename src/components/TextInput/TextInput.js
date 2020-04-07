import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './TextInput.scss';

export class TextInput extends Component {
  onInput = ({ target }) => {
    const { onInput } = this.props;
    onInput(target.value);
  };

  render() {
    const { value } = this.props;

    return <input className={styles.textInput} type="text" onChange={this.onInput} value={value} />;
  }
}

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  isError: PropTypes.bool,
  onInput: PropTypes.func,
};

TextInput.defaultProps = {
  onInput: () => {},
};
