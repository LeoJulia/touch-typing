import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {
  startTimer,
  changeLang,
  fetchTexts,
  ActionCreator,
  TextConfigCreator,
} from '../redux/actions';
import { Avatar } from '../components';

const Button = styled.button`
  border-radius: 10px;
  border: 1px dashed var(--white);
  padding: 5px;
  width: 100px;
  text-align: center;
  background-color: transparent;
  color: var(--white);
  outline: none;

  &:hover {
    cursor: pointer;
    background-color: var(--red);
  }
`;

const DropDown = styled.select`
  border-radius: 10px;
  border: 1px dashed var(--dark);
  padding: 5px;
  margin-right: 5px;
  outline: none;
`;

const Container = styled.div`
  display: flex;
  height: 30px;
`;

const mapDispatchToProps = {
  startTimer,
  changeLang,
  fetchTexts,
};

interface StartTypingProps {
  startTimer(): ActionCreator;
  changeLang(langCode: string): TextConfigCreator;
  fetchTexts();
}

class StartTyping extends Component<StartTypingProps> {
  componentDidMount() {
    const { fetchTexts } = this.props;

    fetchTexts();
  }

  render() {
    const { startTimer, changeLang } = this.props;

    return (
      <>
        <Avatar />
        <Container>
          <DropDown onChange={({ target }) => changeLang(target.value)}>
            <option value="en">English</option>
            <option value="ru">Russian</option>
          </DropDown>
          <Button onClick={startTimer}>Start</Button>
        </Container>
      </>
    );
  }
}

export const StartTypingContainer = connect(null, mapDispatchToProps)(StartTyping);
