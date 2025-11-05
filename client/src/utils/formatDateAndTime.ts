export const formatTime = (dateInput: string | number | Date) => {
  const date = new Date(dateInput);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};

export const formatDate = (dateInput: string | number | Date) => {
  const date = new Date(dateInput);
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};
