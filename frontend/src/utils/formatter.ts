export const formatTime = (dateInput: string | number | Date) => {
  const date = new Date(dateInput);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};
