import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { TouchTyping } from '../containers';

const Variables = {
  whiteColor: '#f9f7f7',
  greyColor: '#dbe2ef',
  darkGreyColor: '#808080',
  blueColor: '#3f72af',
  darkColor: '#112d4e',
  redColor: '#f28c9f',
};

const StyledApp = styled.div`
  background-color: ${({ theme }) => theme.darkColor};
  color: ${({ theme }) => theme.whiteColor};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

function App() {
  return (
    <ThemeProvider theme={Variables}>
      <StyledApp>
        <TouchTyping />
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
