const findLoanByEmail = (list, email) => {
  let data; let exist = false;
  const len = list.length;
  if (len > 0) {
    list.forEach((item) => {
      if (item.user === email) {
        data = item;
        exist = true;
      }
    });
  }
  return { exist, data };
};

export default findLoanByEmail;
