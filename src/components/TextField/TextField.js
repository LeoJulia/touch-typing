import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTextField = styled.div`
  width: 40%;
  height: 200px;
  background-color: ${({ theme }) => theme.greyColor};
  color: ${({ theme }) => theme.darkColor};
  padding: 15px;
  border-radius: 15px;
  border: 1px dashed ${({ theme }) => theme.blueColor};
`;

const BeforeFocus = styled.span`
  color: ${({ theme }) => theme.darkGreyColor};
`;

const Focus = styled.span`
  color: ${({ isError, theme }) => (isError ? theme.redColor : theme.blueColor)};
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
