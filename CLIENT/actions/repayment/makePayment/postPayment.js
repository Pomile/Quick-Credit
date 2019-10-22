import displayRepayment from './displayRepayment';
import displayError from './displayError';
import baseUrl from '../../../route/endpointPath'
const postPayment = (loanId, amount, token) => {
  fetch(`${baseUrl}/loans/${loanId}/repayment`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', authorization: `${token}` },
      body: JSON.stringify({ amount: +amount, loanId: +loanId }),
    }).then(res => res.json()).then((data) => {
    if (data.status === 201) {
      displayRepayment(data.data);
      open('backdrop1', 'paymentFeedback');
    } else if (data.status === 404) {
      displayError(data.error, validateData.isValid);
    } else if (data.status === 422 && data.error) {
      displayError(data.error, validateData.isValid);
    } else if (data.status === 422 && data.errors) {
      displayError(data.errors[0].error, validateData.isValid);
    } else if (data.status === 400 && data.errors) {
      displayError(data.errors[0].error, validateData.isValid);
    }
  });
};

export default postPayment;
