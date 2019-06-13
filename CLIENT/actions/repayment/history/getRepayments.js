import createRows from './createRows';
import headers from './headers';
import removeAllTableChildNode from '../../tools/removeAllChildNode';

const getAllRepayments = () => {
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');
  fetch(`http://localhost:8000/api/v1/users/${email}/repayments`,
    {
      method: 'get',
      headers: { 'Content-Type': 'application/json', authorization: `${token}` },
    }).then(res => res.json()).then((data) => {
    removeAllTableChildNode('allRepayments');
    console.log(data.data);
    const allRepaymentsTable = document.querySelector('#allRepayments');
    allRepaymentsTable.insertAdjacentHTML('beforeend', headers);
    createRows(data.data, 'allRepayments');
  });
};

export default getAllRepayments;
