import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { TextField, TextInput } from '../components';
import { getActiveText, getStartTime, getEndTime } from '../redux/selectors';
import { setFinish, startRace } from '../redux/actions';

const BeforeFocus = styled.span`
  color: ${({ theme }) => theme.darkGray};
`;

const Focus = styled.span`
  color: ${({ isError, theme }) => (isError ? theme.red : theme.blue)};
  text-decoration: underline;
`;

const mapStateToProps = state => ({
  text: getActiveText(state),
  startTime: getStartTime(state),
  endTime: getEndTime(state),
});

const mapDispatchToProps = { onFinish: setFinish, setRace: startRace };

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

      onFinish(Date.now());
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
        {` ${afterFocusText.join(' ')}`}
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

TouchTypingClass.propTypes = {
  text: PropTypes.string,
  onFinish: PropTypes.func,
  setRace: PropTypes.func,
  setTimer: PropTypes.func,
  startTime: PropTypes.number,
  endTime: PropTypes.number,
};
