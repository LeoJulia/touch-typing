import React, { Component } from 'react';
import styled from 'styled-components';

const StyledTextInput = styled.input`
  margin-top: 15px;
  width: 40%;
  padding: 10px;
  background-color: var(--white);
  color: var(--dark);
  border-radius: 15px;
  border: none;
  outline: none;

  &:disabled {
    background-color: var(--darkGray);
  }
`;

export interface TextInputProps {
  onInput: any;
  value: any;
  isFinish: any;
  setRef: any;
  maxLength?: any;
}

export class TextInput extends Component<TextInputProps> {
  onInput = ({ target }) => {
    const { onInput } = this.props;
    onInput(target.value);
  };

  render() {
    const { value, isFinish, setRef, maxLength } = this.props;

    return (
      <StyledTextInput
        type="text"
        onChange={this.onInput}
        value={value}
        disabled={isFinish}
        ref={setRef}
        maxLength={maxLength}
      />
    );
  }
}

// TextInput.defaultProps = {
//   onInput: () => {},
//   setRef: () => {},
//   maxLength: 100,
// };
