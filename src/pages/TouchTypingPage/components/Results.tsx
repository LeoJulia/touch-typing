import React from 'react';

function msToMinutesAndSeconds(millis) {
  const minutes = Math.floor(millis / 60000);
  const seconds = +((millis % 60000) / 1000).toFixed(0);
  return `${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`;
}

export const Results = ({ startTime, endTime, symbolCount }) => {
  const seconds = endTime - startTime;
  const speed = symbolCount / (seconds / 60000);

  return (
    <>
      <span>{`Время прохождения: ${msToMinutesAndSeconds(seconds)}`}</span>
      <span>{`Скорость: ${Math.round(speed)} зн/мин`}</span>
    </>
  );
};
