const findUserById = (list, id) => {
  let data; let userExists = false;
  const len = list.length;
  if (len > 0) {
    list.map((item) => {
      if (item.id === +id) {
        data = item;
        userExists = true;
      }
    });
  }
  return { userExists, data };
};

export default findUserById;
