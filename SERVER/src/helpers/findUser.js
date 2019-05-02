const findUser = (listofUsers, email) => {
  let userExist = false;
  const len = listofUsers.length;
  if (len > 0) {
    listofUsers.map((user) => {
      if (user.email === email) {
        userExist = true;
      }
    });
  }
  return userExist;
};

export default findUser;
