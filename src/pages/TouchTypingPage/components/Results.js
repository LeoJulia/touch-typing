import React from 'react';
import PropTypes from 'prop-types';

function millisToMinutesAndSeconds(millis) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`;
}

export const Results = ({ startTime, endTime, symbolCount }) => {
  const seconds = endTime - startTime;
  const speed = symbolCount / (seconds / 60000);

  return (
    <>
      <span>{millisToMinutesAndSeconds(seconds)}</span>
      <span>{Math.round(speed)}</span>
    </>
  );
};

Results.propTypes = {
  startTime: PropTypes.number,
  endTime: PropTypes.number,
  symbolCount: PropTypes.number,
};
