const findUserByEmail = (list, email) => {
  let data; let userExists = false;
  const len = list.length;
  if (len > 0) {
    list.map((item) => {
      if (item.email === email) {
        data = item;
        userExists = true;
      }
    });
  }
  return { userExists, data };
};

export default findUserByEmail;