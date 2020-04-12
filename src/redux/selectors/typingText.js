export const getActiveText = ({ typingText }) => (typingText ? typingText.activeText : '');
export const getStartData = ({ typingText }) => (typingText ? typingText.isStart : false);
export const getFinishData = ({ typingText }) => (typingText ? typingText.isFinish : false);
export const getTimerData = ({ typingText }) => (typingText ? typingText.isTimer : false);
export const getTime = ({ typingText }) => (typingText ? typingText.startTime : false);
