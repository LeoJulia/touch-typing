import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TouchTyping } from '../containers';
import { getStartTime, getEndTime, getActiveText, getTimerData } from '../redux/selectors';
import { startTimer, startRace, restartRace } from '../redux/actions';
import { Results, Timer } from '../components';

const Button = styled.button`
  margin-top: 15px;
  border-radius: 10px;
  border: 1px dashed ${({ theme }) => theme.white};
  padding: 5px;
  width: 100px;
  text-align: center;
  background-color: transparent;
  color: ${({ theme }) => theme.white};
  outline: none;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.red};
  }
`;

const mapStateToProps = state => ({
  startTime: getStartTime(state),
  endTime: getEndTime(state),
  text: getActiveText(state),
  isTimer: getTimerData(state),
});
const mapDispatchToProps = {
  setTimer: startTimer,
  start: startRace,
  restart: restartRace,
};

const TouchTypingContainer = ({ startTime, endTime, setTimer, text, isTimer, start, restart }) => (
  <>
    {!startTime && !endTime && <Button onClick={setTimer}>Start</Button>}
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

TouchTypingContainer.propTypes = {
  text: PropTypes.string,
  startTime: PropTypes.number,
  endTime: PropTypes.number,
  setTimer: PropTypes.func,
  start: PropTypes.func,
  restart: PropTypes.func,
  isTimer: PropTypes.bool,
};
