const findUserByEmail = (listofUsers, email) => {
  let data; let userExists = false;
  const len = listofUsers.length;
  if (len > 0) {
    listofUsers.map((user) => {
      if (user.email === email) {
        data = user;
        userExists = true;
      }
    });
  }
  return { userExists, data };
};

export default findUserByEmail;
