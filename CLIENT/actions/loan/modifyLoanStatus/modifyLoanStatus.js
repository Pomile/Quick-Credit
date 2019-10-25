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
      throw new Error(data.error);
    } else if (data.status === 422) {
      throw new Error(data.error);
    } else if (data.status === 404) {
      throw new Error(data.error);
    }
  }).catch((err) => {
    document.getElementById('msg').innerHTML = err.message;
    open('backdrop1', 'errorBox');
  });
};

export default modifyLoanStatus;
