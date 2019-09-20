import removeChildNodes from '../../tools/removeAllChildNode';
import cashTemplate from './template/cashTemplate';
import cardTemplate from './template/cardTemplate';

const renderPaymentOptions = (option) => {
  const postPaymentContent = document.getElementById('postPaymentContent');
  const card = document.querySelector('#card');
  const cash = document.querySelector('#cash');
  removeChildNodes('postPaymentContent');
  if (option === 'cash') {
    cash.classList.add('active');
    card.classList.remove('active');
    const cashTemp = cashTemplate();
    postPaymentContent.insertAdjacentHTML('beforeend', cashTemp);
  } else {
    cash.classList.remove('active');
    card.classList.add('active');
    const cardTemp = cardTemplate();
    postPaymentContent.insertAdjacentHTML('beforeend', cardTemp);
  }
};

export default renderPaymentOptions;
