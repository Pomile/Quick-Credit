import createRows from './createRows';
import verifyUserTableHeader from './header';
import removeAllTableChildNode from '../tools/removeAllChildNode';
import baseUrl from '../../route/endpointPath';

const loadUserStatusWithAddressAndLoan = (status) => {
  removeAllTableChildNode('verifyUserTable');
  const token = localStorage.getItem('token');
  fetch(`${baseUrl}/users?status=${status}`,
    {
      method: 'get',
      headers: { 'Content-Type': 'application/json', authorization: `${token}` },
    }).then(res => res.json()).then((data) => {
    const verifyTable = document.querySelector('#verifyUserTable');
    verifyTable.insertAdjacentHTML('beforeend', verifyUserTableHeader);
    createRows(data.data);
  });
};

export default loadUserStatusWithAddressAndLoan;
