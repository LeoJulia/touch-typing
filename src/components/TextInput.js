import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTextInput = styled.input`
  margin-top: 15px;
  width: 40%;
  padding: 10px;
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.dark};
  border-radius: 15px;
  border: none;
  outline: none;

  &:disabled {
    background-color: ${({ theme }) => theme.darkGray};
  }
`;

export class TextInput extends Component {
  onInput = ({ target }) => {
    const { onInput } = this.props;
    onInput(target.value);
  };

  render() {
    const { value, isFinish, setRef } = this.props;

    return (
      <StyledTextInput
        type="text"
        onChange={this.onInput}
        value={value}
        disabled={isFinish}
        ref={setRef}
      />
    );
  }
}

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  isFinish: PropTypes.bool,
  onInput: PropTypes.func,
  setRef: PropTypes.func,
};

TextInput.defaultProps = {
  onInput: () => {},
  setRef: () => {},
};
