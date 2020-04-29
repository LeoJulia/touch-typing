import React, { Component } from 'react';
import styled from 'styled-components';

const TimerContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--grayTransparent);

  & span {
    display: block;
    color: var(--white);
    font-size: 150px;
  }
`;

interface TimerState {
  value
}

export class Timer extends Component<any, TimerState> {
  private timerID;

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      const { value } = this.state;
      if (value !== -1) {
        this.tick();
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState(
      ({ value }) => ({
        value: --value,
      }),
      () => {
        const { value } = this.state;
        const { onEnd } = this.props;

        if (value === -1) {
          onEnd(Date.now());
        }
      },
    );
  }

  render() {
    const { value } = this.state;

    return (
      <TimerContainer>
        <span>{value}</span>
      </TimerContainer>
    );
  }
}
