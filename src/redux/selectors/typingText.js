export const getActiveText = ({ typingText }) => (typingText ? typingText.activeText : '');
export const getTimerData = ({ typingText }) => (typingText ? typingText.isTimer : false);
export const getStartTime = ({ typingText }) => (typingText ? typingText.startTime : null);
export const getEndTime = ({ typingText }) => (typingText ? typingText.endTime : null);
