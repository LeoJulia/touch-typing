import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTextField = styled.div`
  width: 40%;
  height: 200px;
  background-color: ${({ theme }) => theme.gray};
  color: ${({ theme }) => theme.dark};
  padding: 15px;
  border-radius: 15px;
  border: 1px dashed ${({ theme }) => theme.blue};
`;

export const TextField = ({ text }) => <StyledTextField>{text}</StyledTextField>;

TextField.propTypes = {
  text: PropTypes.element,
};
