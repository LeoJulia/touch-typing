import styled from 'styled-components';

const Button = styled.button`
  border-radius: 10px;
  margin-left: 10px;
  border: 1px dashed var(--white);
  padding: 5px;
  width: 100px;
  background-color: transparent;
  color: var(--white);
  outline: none;

  &:hover {
    cursor: pointer;
    background-color: var(--red);
  }
`;

const InfoBlock = styled.div`
  display: flex;
  position: absolute;
  left: 125px;
`;

const Container = styled.div`
  display: flex;
  position: relative;
  align-items: flex-end;
  margin-bottom: 15px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.div`
  display: flex;
  padding: 5px;
`;

const Title = styled.div`
  flex-grow: 3;
`;

const Error = styled.div`
  font-size: 20px;
`;

export { Button, TextContainer, Text, Title, Error, Container, InfoBlock };
