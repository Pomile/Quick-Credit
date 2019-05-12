import getItemsById from './getItemsById';

const getLoansByEmail = (list, id, email) => {
  let data = null; let myLoan = false;
  const loans = getItemsById(list, id, 'id');
  if (loans.data.length > 0 && loans.data[0].user === email) {
    data = { ...loans.data[0] };
    myLoan = true;
    return { myLoan, data };
  }
  return { myLoan, data };
};
export default getLoansByEmail;
