export const getActiveText = ({ typingText }) => (typingText ? typingText.activeText : '');
export const getStateRace = ({ typingText }) => (typingText ? typingText.isFinish : false);
