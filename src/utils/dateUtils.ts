export const getTimeSlots = () => {
  const date = new Date();
  const dateSlices = [];
  date.setSeconds(date.getSeconds() - 200);
  for (let i = 0; i < 8; i++) {
    const timeString = date.toISOString();
    dateSlices.push(timeString);
    date.setSeconds(date.getSeconds() + 5);
  }
  return dateSlices;
};

export const getFormattedTimeSlots = (timeSlots: string[]): string[] => {
  return timeSlots.map((el) => {
    const time = new Date(el).toLocaleTimeString();
    return time.slice(0, time.length - 3);
  });
};

export const getEarlierDateISO = (seconds: number): string => {
  const date = new Date();
  date.setSeconds(date.getSeconds() - seconds);
  return date.toISOString();
};

export const getStartOfTheDayISO = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date.toISOString();
};
