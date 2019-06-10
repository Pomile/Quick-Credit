import validatePaymentData from './validateData';
import displayRepayment from './displayRepayment';
import displayError from './displayError';
import removeAllChildNode from '../../tools/removeAllChildNode';

const makePayment = () => {
  const token = localStorage.getItem('token');
  const loanId = document.querySelector('#loanId').value.trim();
  const amount = document.querySelector('#amountPaid').value.trim();
  const validateData = validatePaymentData(loanId, amount);
  if (validateData.isValid) {
    fetch(`http://localhost:8000/api/v1/loans/${loanId}/repayment`,
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
  } else {
    removeAllChildNode('errorMsg');
    validateData.errors.map((error) => {
      displayError(error, validateData.isValid);
    });
  }
};

export default makePayment;
