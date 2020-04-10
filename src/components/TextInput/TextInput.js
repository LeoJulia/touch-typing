import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTextInput = styled.input`
  margin-top: 15px;
  width: 40%;
  padding: 10px;
  background-color: ${({ theme }) => theme.whiteColor};
  color: ${({ theme }) => theme.darkColor};
  border-radius: 15px;
  border: none;
  outline: none;

  &:disabled {
    background-color: ${({ theme }) => theme.greyColor};
  }
`;

export class TextInput extends Component {
  onInput = ({ target }) => {
    const { onInput } = this.props;
    onInput(target.value);
  };

  render() {
    const { value, isFinish } = this.props;

    return (
      <StyledTextInput type="text" onChange={this.onInput} value={value} disabled={isFinish} />
    );
  }
}

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  isFinish: PropTypes.bool,
  onInput: PropTypes.func,
};

TextInput.defaultProps = {
  onInput: () => {},
};
