import createRows from './createRows';
import verifyUserTableHeader from './header';
import removeAllTableChildNode from '../tools/removeAllChildNode';

const loadUserStatusWithAddressAndLoan = (status) => {
  removeAllTableChildNode('verifyUserTable');
  const token = localStorage.getItem('token');
  fetch(`http://localhost:8000/api/v1/users?status=${status}`,
    {
      method: 'get',
      headers: { 'Content-Type': 'application/json', authorization: `${token}` },
    }).then(res => res.json()).then((data) => {
    console.log(data.data);

    const verifyTable = document.querySelector('#verifyUserTable');
    verifyTable.insertAdjacentHTML('beforeend', verifyUserTableHeader);
    createRows(data.data);
  });
};

export default loadUserStatusWithAddressAndLoan;
