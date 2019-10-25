import displayRepayment from './displayRepayment';
import displayError from './displayError';
import baseUrl from '../../../route/endpointPath'
;
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
      throw new Error(data.error);
    } else if (data.status === 422 && data.error) {
      throw new Error(data.error);
    } else if (data.status === 422 && data.errors) {
      throw new Error(data.errors[0].error);
    } else if (data.status === 400 && data.errors) {
      throw new Error(data.errors[0].error);
    }
  }).catch((err) => {
    displayError(err.message, validateData.isValid);
  });
};

export default postPayment;
