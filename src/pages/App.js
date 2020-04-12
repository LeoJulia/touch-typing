/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { TouchTyping } from '../containers';

// eslint-disable-next-line max-len
const variables = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/colorVariables.scss');

const StyledApp = styled.div`
  background-color: ${({ theme }) => theme.dark};
  color: ${({ theme }) => theme.white};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

function App() {
  return (
    <ThemeProvider theme={variables}>
      <StyledApp>
        <TouchTyping />
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
