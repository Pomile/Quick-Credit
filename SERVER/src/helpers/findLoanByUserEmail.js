const findLoanByEmail = (list, email) => {
  let data; let userExists = false;
  const len = list.length;
  if (len > 0) {
    list.forEach((item) => {
      if (item.user === email) {
        data = item;
        userExists = true;
      }
    });
  }
  return { userExists, data };
};

export default findLoanByEmail;
