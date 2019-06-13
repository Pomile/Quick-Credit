import removeAllTableChildNode from '../../tools/removeAllChildNode';
import header2 from './headers/header2';
import createRows from './createRows';

const getALoanRepayments = () => {
  const loanId = document.querySelector('#loanID');
  const id = loanId.value.trim();
  if (!Number.isNaN(id) && id !== '') {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:8000/api/v1/loans/${id}/repayment`,
      {
        method: 'get',
        headers: { 'Content-Type': 'application/json', authorization: `${token}` },
      }).then(res => res.json()).then((data) => {
      if (data.status === 200) {
        removeAllTableChildNode('allRepayments');
        const allRepaymentsTable = document.querySelector('#allRepayments');
        allRepaymentsTable.insertAdjacentHTML('beforeend', header2);
        createRows(data.data, 'allRepayments', 2);
      } else if (data.status === 404) {
        document.getElementById('msg').innerHTML = data.error;
        open('backdrop1', 'errorBox');
      } else if (data.status === 422) {
        document.getElementById('msg').innerHTML = data.error;
        open('backdrop1', 'errorBox');
      }
    });
  } else {
    document.getElementById('msg').innerHTML = 'Empty loan Id detected. Please enter a loan Id';
    open('backdrop1', 'errorBox');
  }
};

export default getALoanRepayments;
