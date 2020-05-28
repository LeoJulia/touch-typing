import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { startTimer, changeLang, fetchTexts, ActionCreator } from '../redux/actions';
import { getTexts } from '../redux/selectors';
import { Avatar } from '../components';

const Button = styled.button`
  flex-grow: 1;
  border-radius: 10px;
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.div`
  display: flex;
  padding: 5px;
  width: 200px;
`;
const Title = styled.div`
  flex-grow: 3;
`;

const mapDispatchToProps = {
  startTimer,
  changeLang,
  fetchTexts,
};

const mapStateToProps = (state) => ({
  texts: getTexts(state),
});

interface StartTypingProps {
  startTimer(text: string): ActionCreator;
  fetchTexts();
  texts: any;
}

class StartTyping extends Component<StartTypingProps> {
  componentDidMount() {
    const { fetchTexts } = this.props;

    fetchTexts();
  }

  render() {
    const { startTimer, texts } = this.props;

    return (
      <>
        <Avatar />
        <Container>
          {texts.map((text) => (
            // eslint-disable-next-line no-underscore-dangle
            <Text key={text._id}>
              <Title>{text.title}</Title>
              <Button onClick={() => startTimer(text.text.slice(0, 100))}>Начать</Button>
            </Text>
          ))}
        </Container>
      </>
    );
  }
}

export const StartTypingContainer = connect(mapStateToProps, mapDispatchToProps)(StartTyping);
