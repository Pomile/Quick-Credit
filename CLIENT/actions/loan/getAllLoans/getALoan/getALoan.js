import allLoansHeader from '../tableHeader';
import createAllLoansRows from '../createRows';
import openTab from '../../../../assets/js/events/tab';
import removeAllTableChildNode from '../../../tools/removeAllChildNode';
import validateLoanId from './validateLoanId';

const getALoan = () => {
  removeAllTableChildNode('aLoan');
  const token = localStorage.getItem('token');
  const loanId = document.querySelector('#loanID').value.trim();
  const isLoanIdValid = validateLoanId(loanId);
  if (isLoanIdValid.isValid) {
    fetch(`http://localhost:8000/api/v1/loans/${loanId}`,
      {
        method: 'get',
        headers: { 'Content-Type': 'application/json', authorization: `${token}` },
      }).then(res => res.json()).then((data) => {
      console.log(data);
      if (data.status === 400 || data.status === 422) {
        document.getElementById('msg').innerHTML = data.error;
        open('backdrop1', 'errorBox');
      } else if (data.status === 404) {
        document.getElementById('msg').innerHTML = data.error;
        open('backdrop1', 'errorBox');
      } else if (data.status === 200) {
        removeAllTableChildNode('aLoan');
        const aLoansTable = document.querySelector('#aLoan');
        aLoansTable.insertAdjacentHTML('beforeend', allLoansHeader);
        createAllLoansRows([data.data], 'aLoan');
        openTab('searchLoanBtn', 'aLoanContainer', 'aLoan');
      }
    });
  } else {
    return null;
  }
};

export default getALoan;
