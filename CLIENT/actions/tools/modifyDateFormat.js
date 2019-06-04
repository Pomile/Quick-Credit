const modifyDateFormat = (date) => {
  const newFormat = new Date(date);
  return {
    date: newFormat.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      time: 'numeric',
    }),
    time: newFormat.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
  };
};

export default modifyDateFormat;
