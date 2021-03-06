import fetch from 'node-fetch';
import '@babel/polyfill';
import validateLoanData from './validateLoanData';
import displayLoanApp from './displayLoanApp';
import baseUrl from '../../../route/endpointPath';

const apply = () => {
  const amount = document.getElementById('amount');
  const tenor = document.getElementById('tenor');
  const token = localStorage.getItem('token');
  const isLoanDataValid = validateLoanData(amount, tenor.value);
  if (isLoanDataValid.isValid) {
    fetch(`${baseUrl}/loans`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json', authorization: `${token}` },
      body: JSON.stringify({
        amount: +amount.value,
        tenor: +tenor.value,
      }),

    }).then(res => res.json()).then((data) => {
      if (data.status === 422 && data.error) {
        throw new Error(data.error);
      } else if (data.status === 422 && data.errors) {
        throw new Error(data.errors[0].error);
      } else if (data.data.id) {
        displayLoanApp(data.data);
        open('backdrop2', 'loanFeedback');
      }
    }).catch((err) => {
      document.getElementById('msg').innerHTML = err.message;
      open('backdrop2', 'errorBox');
    });
  } else {
    const screen = document.getElementById('amountScreen');
    screen.innerHTML = isLoanDataValid.errors;
    screen.style.color = 'red';
  }
};

export default apply;
