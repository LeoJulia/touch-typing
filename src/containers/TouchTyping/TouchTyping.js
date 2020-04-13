import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { TextField, TextInput, Timer } from '../../components';
import { getActiveText, getFinishData, getStartTime, getTimerData } from '../../redux/selectors';
import { setFinish, startTimer, startRace } from '../../redux/actions';

const BeforeFocus = styled.span`
  color: ${({ theme }) => theme.darkGrey};
`;

const Focus = styled.span`
  color: ${({ isError, theme }) => (isError ? theme.red : theme.blue)};
  text-decoration: underline;
`;

const Button = styled.button`
  margin-top: 15px;
  border-radius: 10px;
  border: 1px dashed ${({ theme }) => theme.white};
  padding: 5px;
  width: 100px;
  text-align: center;
  background-color: transparent;
  color: ${({ theme }) => theme.white};
  outline: none;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.red};
  }
`;

const mapStateToProps = state => ({
  text: getActiveText(state),
  isFinish: getFinishData(state),
  startTime: getStartTime(state),
  isTimer: getTimerData(state),
});

const mapDispatchToProps = { onFinish: setFinish, setTimer: startTimer, setRace: startRace };

class TouchTypingClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text,
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
    const { text } = this.state;

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

    if (afterFocusText.length === 0 && (key === '.' || key === '!' || key === '?')) {
      const { onFinish } = this.props;
      const newBeforeFocusText = typeFocusText;

      this.setState(prevState => ({
        typeFocusText: '',
        typingText: '',
        isSuccessInput: true,
        beforeFocusText: [...prevState.beforeFocusText, newBeforeFocusText],
        afterFocusText: [],
      }));

      onFinish();
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

  onStart = () => {
    const { setTimer } = this.props;
    setTimer();
  };

  render() {
    const { afterFocusText, typeFocusText, beforeFocusText, typingText, isError } = this.state;
    const { isFinish, startTime, isTimer, setRace } = this.props;

    const text = (
      <span>
        <BeforeFocus>{`${beforeFocusText.join(' ')} `}</BeforeFocus>
        <Focus isError={isError}>{typeFocusText}</Focus>
        {` ${afterFocusText.join(' ')}`}
      </span>
    );

    return startTime ? (
      <>
        <TextField text={text} />
        <TextInput
          value={typingText}
          isFinish={isFinish}
          onInput={this.onInput}
          setRef={el => {
            this.input = el;
          }}
        />
      </>
    ) : (
      <>
        {isTimer && <Timer onEnd={setRace} />}
        <Button onClick={this.onStart}>Start</Button>
      </>
    );
  }
}

export const TouchTyping = connect(mapStateToProps, mapDispatchToProps)(TouchTypingClass);

TouchTypingClass.propTypes = {
  text: PropTypes.string,
  isFinish: PropTypes.bool,
  isTimer: PropTypes.bool,
  onFinish: PropTypes.func,
  setRace: PropTypes.func,
  setTimer: PropTypes.func,
  startTime: PropTypes.number,
};
