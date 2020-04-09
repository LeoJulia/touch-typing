import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { gray, dark, blue, red } from '../../styles/colorVariables';

const StyledTextField = styled.div`
  width: 40%;
  height: 200px;
  background-color: ${gray};
  color: ${dark};
  padding: 15px;
  border-radius: 15px;
  border: 1px dashed ${blue};
`;

const BeforeFocus = styled.span`
  color: grey;
`;

const Focus = styled.span`
  color: ${props => (props.isError ? red : blue)};
  text-decoration: underline;
`;

export const TextField = ({ typeFocus, afterFocus, beforeFocus, isError }) => (
  <StyledTextField>
    <BeforeFocus>{`${beforeFocus} `}</BeforeFocus>
    <Focus isError={isError}>{typeFocus}</Focus>
    <span>{` ${afterFocus}`}</span>
  </StyledTextField>
);

TextField.propTypes = {
  typeFocus: PropTypes.string,
  afterFocus: PropTypes.string,
  beforeFocus: PropTypes.string,
  isError: PropTypes.bool,
};
