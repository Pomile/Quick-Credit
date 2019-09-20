import validatePaymentData from './validateData';
import displayRepayment from './displayRepayment';
import displayError from './displayError';
import removeAllChildNode from '../../tools/removeAllChildNode';
import validateCardData from './validateCardData';
import postPayment from './postPayment';

const makePayment = (method) => {
  const token = localStorage.getItem('token');
  const loanId = document.querySelector('#loanId').value.trim();
  const amount = document.querySelector('#amountPaid').value.trim();
  const cardnumber = method === 'card' ? document.querySelector('#cardnumber').value.trim() : null;
  const secret = method === 'card' ? document.querySelector('#cardsecret').value.trim() : null;
  const month = method === 'card' ? document.querySelector('#month').value.trim() : null;
  const year = method === 'card' ? document.querySelector('#year').value.trim() : null;
  const expiry = { month, year };
  const validateData = method === 'cash' ? validatePaymentData(loanId, amount) : validateCardData({
    loanId, amount, cardnumber, secret,
  });
  if (validateData.isValid && method === 'cash') {
    postPayment(loanId, amount, token);
  } else if (validateData.isValid && method === 'card') {
    return null;
  } else {
    removeAllChildNode('errorMsg');
    validateData.errors.map((error) => {
      displayError(error, validateData.isValid);
    });
  }
};

export default makePayment;
