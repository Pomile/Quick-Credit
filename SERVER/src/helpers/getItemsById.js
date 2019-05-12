const getItemsById = (list, id, type) => {
  const data = [];
  const len = list.length;
  if (len > 0) {
    list.forEach((item) => {
      if (item[type] === +id) {
        data.push(item);
      }
    });
  }
  return { data };
};

export default getItemsById;
