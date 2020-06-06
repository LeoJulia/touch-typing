import React from 'react';
import Modal from 'react-modal';
import { CloseIcon } from '../index';
import { Header, Content } from './Modal.styles';

export const ModalWindow = ({ onClose, isOpen, content }: any) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    style={{
      overlay: {
        'background-color': 'var(--grayTransparent)',
      },
      content: {
        top: '20%',
        left: '20%',
        right: '20%',
        bottom: 'auto',
        border: '1px dashed var(--dark)',
        'border-radius': '10px',
        'background-color': '#ebebeb',
      },
    }}
  >
    <Header>
      {content.title}
      <CloseIcon color="var(--dark)" onClick={onClose} />
    </Header>
    <Content>
      {content.content.map((item) => (
        <div>{item}</div>
      ))}
      {content.img && <img src={content.img} alt="keyboard" />}
    </Content>
  </Modal>
);
