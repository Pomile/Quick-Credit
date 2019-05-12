const getItem = (list, id, propName) => {
  const len = list.length; let exist = false; let data;
  if (len > 0) {
    const itemIndex = list.findIndex(item => item[propName] === id);
    if (itemIndex !== -1) {
      exist = true;
      data = list[itemIndex];
    }
  }
  return { exist, data };
};

export default getItem;
