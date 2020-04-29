import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { StartTypingContainer, TouchTyping } from '../../containers';
import { getStartTime, getEndTime, getActiveText, getTimerData } from '../../redux/selectors';
import { startRace, restartRace } from '../../redux/actions';
import { Results, Timer } from './components';

const Button = styled.button`
  margin-top: 15px;
  border-radius: 10px;
  border: 1px dashed var(--white);
  padding: 5px;
  width: 100px;
  text-align: center;
  background-color: transparent;
  color:var(--white);
  outline: none;

  &:hover {
    cursor: pointer;
    background-color: var(--red);
  }
`;

const mapStateToProps = state => ({
  startTime: getStartTime(state),
  endTime: getEndTime(state),
  text: getActiveText(state),
  isTimer: getTimerData(state),
});
const mapDispatchToProps = {
  start: startRace,
  restart: restartRace,
};

const TouchTypingContainer = ({ startTime, endTime, text, isTimer, start, restart }) => (
  <>
    {!startTime && !endTime && <StartTypingContainer />}
    {isTimer && <Timer onEnd={start} />}
    {startTime && !endTime && <TouchTyping />}
    {endTime && startTime && (
      <>
        <Results startTime={startTime} endTime={endTime} symbolCount={text.length} />
        <Button onClick={restart}>Restart</Button>
      </>
    )}
  </>
);

export const TouchTypingPage = connect(mapStateToProps, mapDispatchToProps)(TouchTypingContainer);
