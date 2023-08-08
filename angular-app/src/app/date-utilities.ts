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
