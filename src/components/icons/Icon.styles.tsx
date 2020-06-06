import styled from 'styled-components';

export const Icon = styled.svg`
  fill: ${(props) => props.color || 'white'};
  width: ${(props) => props.width || '24px'};
  height: ${(props) => props.height || '24px'};
  opacity: 0.7;

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;
