import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { TextField, TextInput } from '../../components';

const mapStateToProps = ({ activeText }) => ({ activeText });

export const TouchTyping = connect(mapStateToProps)(({ activeText }) => (
  <>
    <TextField text={activeText} />
    <TextInput />
  </>
));

TouchTyping.propTypes = {
  text: PropTypes.string,
};
