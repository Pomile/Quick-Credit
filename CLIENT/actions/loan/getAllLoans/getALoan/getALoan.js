import allLoansHeader from '../tableHeader';
import createAllLoansRows from '../createRows';
import openTab from '../../../../assets/js/events/tab';
import removeAllTableChildNode from '../../../tools/removeAllChildNode';
import validateLoanId from './validateLoanId';
import baseUrl from '../../../../route/endpointPath';

const getALoan = () => {
  removeAllTableChildNode('aLoan');
  const token = localStorage.getItem('token');
  const loanId = document.querySelector('#loanID').value.trim();
  const isLoanIdValid = validateLoanId(loanId);
  if (isLoanIdValid.isValid) {
    fetch(`${baseUrl}/loans/${loanId}`,
      {
        method: 'get',
        headers: { 'Content-Type': 'application/json', authorization: `${token}` },
      }).then(res => res.json()).then((data) => {
      if (data.status === 400 || data.status === 422) {
        throw new Error(data.error);
      } else if (data.status === 404) {
        throw new Error(data.error);
      } else if (data.status === 200) {
        removeAllTableChildNode('aLoan');
        const aLoansTable = document.querySelector('#aLoan');
        aLoansTable.insertAdjacentHTML('beforeend', allLoansHeader);
        createAllLoansRows([data.data], 'aLoan');
        openTab('searchLoanBtn', 'aLoanContainer', 'aLoan');
      }
    }).catch((err) => {
      document.getElementById('msg').innerHTML = err.message;
      open('backdrop1', 'errorBox');
    });
  } else {
    return null;
  }
};

export default getALoan;
