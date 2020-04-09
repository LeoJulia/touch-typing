import React from 'react';
import styled from 'styled-components';

import { TouchTyping } from '../containers';
import { white, dark } from '../styles/colorVariables';

const StyledApp = styled.div`
  background-color: ${dark};
  color: ${white};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

function App() {
  return (
    <StyledApp>
      <TouchTyping />
    </StyledApp>
  );
}

export default App;
