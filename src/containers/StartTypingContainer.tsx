import React, { Component } from 'react';
import { connect } from 'react-redux';

import { startTimer, changeLang, fetchTexts, ActionCreator } from '../redux/actions';
import { getTexts } from '../redux/selectors';
import { Avatar, InfoIcon, HelpIcon, ModalWindow } from '../components';
import {
  Button,
  TextContainer,
  Text,
  Title,
  Error,
  Container,
  InfoBlock,
} from './StartTypingContainer.styles';
import { Info, Help } from '../components/Modal/content';

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

interface StartTypingState {
  isOpenModal: any;
}

class StartTyping extends Component<StartTypingProps, StartTypingState> {
  constructor(props) {
    super(props);

    this.state = {
      isOpenModal: {
        info: false,
        help: false,
      },
    };
  }

  componentDidMount() {
    const { fetchTexts } = this.props;

    fetchTexts();
  }

  openModal = (modal) =>
    this.setState((props) => ({ isOpenModal: { ...props.isOpenModal, [modal]: true } }));

  closeModal = (modal) =>
    this.setState((props) => ({ isOpenModal: { ...props.isOpenModal, [modal]: false } }));

  render() {
    const {
      isOpenModal: { info, help },
    } = this.state;
    const { startTimer, texts } = this.props;

    return (
      <>
        <Container>
          <Avatar />
          <InfoBlock>
            <HelpIcon onClick={() => this.openModal('help')} />
            <InfoIcon onClick={() => this.openModal('info')} />
          </InfoBlock>
        </Container>
        <TextContainer>
          {texts.length ? (
            texts.map((text) => (
              // eslint-disable-next-line no-underscore-dangle
              <Text key={text._id}>
                <Title>{text.title}</Title>
                <Button onClick={() => startTimer(text.text.slice(0, 100))}>Старт</Button>
              </Text>
            ))
          ) : (
            <Error>Упс... Что-то пошло не так. Попробуйте перезагрузить страницу.</Error>
          )}
        </TextContainer>
        <ModalWindow content={Help} isOpen={help} onClose={() => this.closeModal('help')} />
        <ModalWindow content={Info} isOpen={info} onClose={() => this.closeModal('info')} />
      </>
    );
  }
}

export const StartTypingContainer = connect(mapStateToProps, mapDispatchToProps)(StartTyping);
