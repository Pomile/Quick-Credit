<<<<<<< HEAD
const findUserById = (list, id) => {
  let data; let userExists = false;
  const len = list.length;
  if (len > 0) {
    list.map((item) => {
      if (item.id === +id) {
        data = item;
=======
const findUserById = (listOfUsers, id) => {
  let data; let userExists = false;
  const len = listOfUsers.length;
  if (len > 0) {
    listOfUsers.map((user) => {
      if (user.id === +id) {
        data = user;
>>>>>>> ch-user-jobDetails-test-165664038
        userExists = true;
      }
    });
  }
  return { userExists, data };
};

export default findUserById;
