// Function to check if 24h has passed from previous fetching
export const have24HoursPassed = (
  previousDate: Date | null,
  currentDate: Date | null
): boolean => {
  const millisecondsIn24Hours = 24 * 60 * 60 * 1000;
  if (previousDate !== null && currentDate !== null) {
    return (
      currentDate.getTime() - new Date(previousDate).getTime() >
      millisecondsIn24Hours
    );
  }
  // Otherwise not previous date fetch, so return true
  return true;
};

const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, '0');
};

// Function to convert milliseconds to minutes and seconds
export const convertMsToTime = (milliseconds: number): string => {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
    seconds
  )}`;
};
