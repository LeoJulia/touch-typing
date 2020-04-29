import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { getActiveText, getStartTime, getEndTime } from '../redux/selectors';
import { setFinish, startRace } from '../redux/actions';
import { TextField, TextInput } from '../components';

const BeforeFocus = styled.span`
  color: var(--darkGray);
`;

interface FocusProps {
  isError?: any,
}

const Focus = styled.span<FocusProps>`
  color: ${({ isError }) => (isError ? 'var(--red)' : 'var(--blue)')};
  text-decoration: underline;
`;

const mapStateToProps = state => ({
  text: getActiveText(state),
  startTime: getStartTime(state),
  endTime: getEndTime(state),
});

const mapDispatchToProps = { setFinish, startRace };

interface TouchTypingProps {
  text,
  startTime,
  setFinish,
  endTime
}

interface TouchTypingState {
  typeFocusText,
  typingText,
  isError,
  beforeFocusText,
  afterFocusText,
  isSuccessInput
}

class TouchTypingClass extends Component<TouchTypingProps, TouchTypingState> {
  private input: any;

  constructor(props) {
    super(props);

    this.state = {
      typingText: '',
      isError: false,
      beforeFocusText: [],
      typeFocusText: '',
      afterFocusText: [],
      isSuccessInput: false,
    };

    this.input = null;
  }

  componentDidMount() {
    const { text } = this.props;

    const beforeFocusText = [];
    const afterFocusText = text.split(' ');
    const typeFocusText = afterFocusText.shift();

    document.addEventListener('keypress', this.onTyping);
    document.addEventListener('keyup', this.onClear);

    this.setState({
      beforeFocusText,
      typeFocusText,
      afterFocusText,
    });
  }

  componentDidUpdate() {
    const { startTime } = this.props;
    if (startTime) {
      this.input.focus();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.onTyping);
    document.removeEventListener('keyup', this.onClear);
  }

  onClear = ({ keyCode }) => {
    if (keyCode !== 8) return;

    const { typeFocusText, typingText } = this.state;

    if (typeFocusText.indexOf(typingText) !== -1) {
      this.setState({
        isError: false,
      });
    }
  };

  onTyping = ({ keyCode, key }) => {
    const { afterFocusText, typeFocusText, typingText, isError } = this.state;

    if (typeFocusText.split('')[typingText.length] !== key) {
      this.setState({
        isError: true,
      });
    }

    if (typeFocusText.length === typingText.length && keyCode === 32 && !isError) {
      const newAfterFocusText = [...afterFocusText];
      const newBeforeFocusText = typeFocusText;
      const newTypeFocusText = newAfterFocusText.shift();

      this.setState(prevState => ({
        typeFocusText: newTypeFocusText,
        afterFocusText: newAfterFocusText,
        beforeFocusText: [...prevState.beforeFocusText, newBeforeFocusText],
        isError: false,
        typingText: '',
        isSuccessInput: true,
      }));
    }

    if (afterFocusText.length === 0 && (key === '.' || key === '!' || key === '?') && !isError) {
      const { setFinish } = this.props;
      const newBeforeFocusText = typeFocusText;

      this.setState(prevState => ({
        typeFocusText: '',
        typingText: '',
        isSuccessInput: true,
        beforeFocusText: [...prevState.beforeFocusText, newBeforeFocusText],
        afterFocusText: [],
      }));

      setFinish(Date.now());
    }
  };

  onInput = value => {
    const { isSuccessInput } = this.state;

    if (isSuccessInput) {
      this.setState({
        isSuccessInput: false,
      });
      return;
    }

    this.setState({
      typingText: value,
    });
  };

  render() {
    const { afterFocusText, typeFocusText, beforeFocusText, typingText, isError } = this.state;
    const { endTime } = this.props;

    const textElement = (
      <span>
        <BeforeFocus>{`${beforeFocusText.join(' ')} `}</BeforeFocus>
        <Focus isError={isError}>{typeFocusText}</Focus>
        {` ${afterFocusText.join(' ')} `}
      </span>
    );

    return (
      <>
        <TextField text={textElement} />
        <TextInput
          value={typingText}
          isFinish={!!endTime}
          onInput={this.onInput}
          setRef={el => {
            this.input = el;
          }}
        />
      </>
    );
  }
}

export const TouchTyping = connect(mapStateToProps, mapDispatchToProps)(TouchTypingClass);
