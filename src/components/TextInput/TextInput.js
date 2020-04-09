import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { white } from '../../styles/colorVariables';

const StyledTextInput = styled.input`
  margin-top: 15px;
  width: 40%;
  padding: 10px;
  background-color: ${white};
  color: $dark;
  border-radius: 15px;
  border: none;
  outline: none;
`;

export class TextInput extends Component {
  onInput = ({ target }) => {
    const { onInput } = this.props;
    onInput(target.value);
  };

  render() {
    const { value } = this.props;

    return <StyledTextInput type="text" onChange={this.onInput} value={value} />;
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
