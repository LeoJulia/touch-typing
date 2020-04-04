import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { TextField, TextInput } from '../../components';

const mapStateToProps = ({ activeText }) => ({ activeText });

class TouchTypingClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeText: props.activeText,
    };
  }

  onTyping = ({ value }) => {
    console.log(value);
  };

  render() {
    const { activeText } = this.state;

    return (
      <>
        <TextField text={activeText} />
        <TextInput onTyping={this.onTyping} />
      </>
    );
  }
}

export const TouchTyping = connect(mapStateToProps)(TouchTypingClass);

TouchTypingClass.propTypes = {
  activeText: PropTypes.string,
};
