export const getFiveSecondsEarlierDate = (): string => {
  const date = new Date();
  date.setSeconds(date.getSeconds() - 5);
  return date.toISOString();
};
