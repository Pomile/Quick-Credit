const validateCardData = ({
  loanId, amount, cardnumber, secret,
}) => {
  let isValid = true;
  const errors = [];
  const cardnum = cardnumber.split('').filter(item => item !== ' ').join('');
  if (cardnum === '' || cardnum.length >= 12 || cardnum.length <= 0 || isNaN(cardnum)) {
    isValid = false;
    errors.push(`${cardnum} Enter a valid card number`);
  }

  if (loanId === '' || parseInt(loanId) <= 0 || isNaN(loanId)) {
    isValid = false;
    errors.push(`${loanId} Enter a valid loan Id`);
  }

  if (amount === '' || isNaN(amount) || parseFloat(amount) <= 0) {
    isValid = false;
    errors.push('Enter a valid amount');
  }
  return { isValid, errors };
};


export default validateCardData;
