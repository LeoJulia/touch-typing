import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { TextField, TextInput } from '../../components';
import { Timer } from '../Timer';
import { getActiveText, getFinishData, getStartData, getTime } from '../../redux/selectors';
import { setFinish, startTimer } from '../../redux/actions';

const BeforeFocus = styled.span`
  color: ${({ theme }) => theme.darkGrey};
`;

const Focus = styled.span`
  color: ${({ isError, theme }) => (isError ? theme.red : theme.blue)};
  text-decoration: underline;
`;

const Button = styled.div`
  margin-top: 15px;
  border-radius: 10px;
  border: 1px dashed ${({ theme }) => theme.white};
  padding: 5px;
  width: 100px;
  text-align: center;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.red};
  }
`;

const mapStateToProps = state => ({
  text: getActiveText(state),
  isFinish: getFinishData(state),
  isStart: getStartData(state),
  time: getTime(state),
});

const mapDispatchToProps = { onFinish: setFinish, start: startTimer };

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
    const { time } = this.props;
    if (time) {
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
    const { start } = this.props;
    start();
  };

  render() {
    const { afterFocusText, typeFocusText, beforeFocusText, typingText, isError } = this.state;
    const { isFinish, isStart } = this.props;

    const text = (
      <span>
        <BeforeFocus>{`${beforeFocusText.join(' ')} `}</BeforeFocus>
        <Focus isError={isError}>{typeFocusText}</Focus>
        {` ${afterFocusText.join(' ')}`}
      </span>
    );

    return !isStart ? (
      <Button onClick={this.onStart}>Start</Button>
    ) : (
      <>
        <Timer />
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
    );
  }
}

export const TouchTyping = connect(mapStateToProps, mapDispatchToProps)(TouchTypingClass);

TouchTypingClass.propTypes = {
  text: PropTypes.string,
  isFinish: PropTypes.bool,
  isStart: PropTypes.bool,
  onFinish: PropTypes.func,
  start: PropTypes.func,
  time: PropTypes.number,
};
