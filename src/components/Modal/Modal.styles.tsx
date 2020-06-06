import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  font-size: 2rem;
  justify-content: space-between;
  align-items: center;
  color: var(--blue);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 30px;
  margin-top: 20px;
  text-align: justify;

  & div {
    margin-bottom: 10px;
  }

  & img {
    margin: 30px 0;
    align-self: center;
  }
`;

export { Header, Content };
