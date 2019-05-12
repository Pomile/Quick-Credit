const findDueDate = (noOfMonths) => {
  const date = new Date();
  const newDate = new Date(date.setMonth(date.getMonth() + noOfMonths));
  return newDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    time: 'numeric',
  });
};

export default findDueDate;
