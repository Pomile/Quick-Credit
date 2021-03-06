import removeAllTableChildNode from '../../../tools/removeAllChildNode';
import createRows from '../createRows';
import openTab from '../../../../assets/js/events/tab';
import repaidLoansHeader from '../tableHeaders';
import baseUrl from '../../../../route/endpointPath';

const getNotFullyRepaidLoans = (status, repaid) => {
  const token = localStorage.getItem('token');
  fetch(`${baseUrl}/loans?status=${status}&repaid=${repaid}`,
    {
      method: 'get',
      headers: { 'Content-Type': 'application/json', authorization: `${token}` },
    }).then(res => res.json()).then((data) => {
    removeAllTableChildNode('notFullyRepaidLoans');
    const notFullyRepaidLoansTable = document.querySelector('#notFullyRepaidLoans');
    notFullyRepaidLoansTable.insertAdjacentHTML('beforeend', repaidLoansHeader);
    createRows(data.data, 'notFullyRepaidLoans');
    openTab('notFullyRepaidLoanBtn', 'notFullyRepaidLoanContainer', 'notFullyRepaidLoans');
  });
};
export default getNotFullyRepaidLoans;
