import removeAllTableChildNode from '../../tools/removeAllChildNode';
import createRepaidLoansRows from './createRows';
import openTab from '../../../assets/js/events/tab';
import repaidLoansHeader from './tableHeaders';

const getRepaidLoans = (status, repaid) => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:8000/api/v1/loans?status=${status}&repaid=${repaid}`,
      {
        method: 'get',
        headers: { 'Content-Type': 'application/json', authorization: `${token}` },
      }).then(res => res.json()).then((data) => {
      removeAllTableChildNode('repaidLoans');
      const repaidLoansTable = document.querySelector('#repaidLoans');
      repaidLoansTable.insertAdjacentHTML('beforeend', repaidLoansHeader);
      createRepaidLoansRows(data.data);
      openTab('repaidLoansBtn', 'repaidLoanContainer', 'repaidLoans');
    });
  };
  
export default getRepaidLoans;
