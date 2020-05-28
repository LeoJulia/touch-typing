import React from 'react';
import styled from 'styled-components';

const StyledTextField = styled.div`
  width: 40%;
  height: 200px;
  background-color: var(--gray);
  color: var(--dark);
  padding: 15px;
  border-radius: 15px;
  border: 1px dashed var(--blue);
`;

export const TextField = ({ text }) => <StyledTextField>{text}</StyledTextField>;
