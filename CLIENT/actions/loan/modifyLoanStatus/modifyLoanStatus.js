import toggleLoanStatus from './toggleLoanStatus';
import baseUrl from '../../../route/endpointPath';

const modifyLoanStatus = (loanId, LoanStatus) => {
  const token = localStorage.getItem('token');
  fetch(`${baseUrl}/loans/${loanId}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', authorization: `${token}` },
      body: JSON.stringify({ status: LoanStatus.toString() }),
    }).then(res => res.json()).then((data) => {
    if (data.status === 200) {
      const { id, status, client } = data.data;
      toggleLoanStatus({ id, status, client });
    } else if (data.status === 409) {
      document.getElementById('msg').innerHTML = data.error;
      open('backdrop1', 'errorBox');
    } else if (data.status === 422) {
      document.getElementById('msg').innerHTML = data.error;
      open('backdrop1', 'errorBox');
    } else if (data.status === 404) {
      document.getElementById('msg').innerHTML = data.error;
      open('backdrop1', 'errorBox');
    }
  });
};

export default modifyLoanStatus;
