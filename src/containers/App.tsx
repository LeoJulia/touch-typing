import React from 'react';
import styled from 'styled-components';

import { TouchTypingPage } from '../pages';

const StyledApp = styled.div`
  background-color: var(--dark);
  color: var(--white);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

export function App() {
  return (
    <StyledApp>
      <TouchTypingPage />
    </StyledApp>
  );
}
