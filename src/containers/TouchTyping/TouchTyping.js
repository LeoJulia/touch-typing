import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { TextField, TextInput } from '../../components';
import { getActiveText, getStateRace } from '../../redux/selectors/typingText';
import { setFinish } from '../../redux/actions/typingText';

const mapStateToProps = state => ({ text: getActiveText(state), isFinish: getStateRace(state) });
const mapDispatchToProps = { onFinish: setFinish };

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

    if (typeFocusText.indexOf(typingText + key) === -1) {
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

  render() {
    const { afterFocusText, typeFocusText, beforeFocusText, typingText, isError } = this.state;

    const { isFinish } = this.props;

    return (
      <>
        <TextField
          beforeFocus={beforeFocusText.join(' ')}
          typeFocus={typeFocusText}
          afterFocus={afterFocusText.join(' ')}
          isError={isError}
        />
        <TextInput value={typingText} isFinish={isFinish} onInput={this.onInput} />
      </>
    );
  }
}

export const TouchTyping = connect(mapStateToProps, mapDispatchToProps)(TouchTypingClass);

TouchTypingClass.propTypes = {
  text: PropTypes.string,
  isFinish: PropTypes.bool,
  onFinish: PropTypes.func,
};
