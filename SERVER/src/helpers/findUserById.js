const findUserById = (listOfUsers, id) => {
  let data; let userExists = false;
  const len = listOfUsers.length;
  if (len > 0) {
    listOfUsers.map((user) => {
      if (user.id === +id) {
        data = user;
        userExists = true;
      }
    });
  }
  return { userExists, data };
};

export default findUserById;
