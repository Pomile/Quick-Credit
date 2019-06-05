import removeAllTableChildNode from '../../tools/removeAllChildNode';
import createPendingLoansRows from './createRows';
import openTab from '../../../assets/js/events/tab';
import pendingLoansHeader from './tableHeader';

const getPendingLoans = (status, repaid) => {
  removeAllTableChildNode('pendingLoans');
  const token = localStorage.getItem('token');
  fetch(`http://localhost:8000/api/v1/loans?status=${status}&repaid=${repaid}`,
    {
      method: 'get',
      headers: { 'Content-Type': 'application/json', authorization: `${token}` },
    }).then(res => res.json()).then((data) => {
    const pendingLoansTable = document.querySelector('#pendingLoans');
    pendingLoansTable.insertAdjacentHTML('beforeend', pendingLoansHeader);
    createPendingLoansRows(data.data);
    openTab('pendingLoanBtn', 'pendingLoanContainer', 'pendingLoans');
  });
};

export default getPendingLoans;
