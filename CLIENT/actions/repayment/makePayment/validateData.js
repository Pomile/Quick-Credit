const validatePaymentData = (loanId, amountPaid) => {
  let isValid = true;
  const errors = [];
  console.log(+loanId, parseFloat(amountPaid));
  if (loanId === '' || parseInt(loanId) <= 0 || isNaN(loanId)) {
    isValid = false;
    errors.push(`${loanId} is not a valid loan id. Please enter a valid loan Id`);
  }

  if (amountPaid === '' || isNaN(amountPaid) || parseFloat(amountPaid) <= 0) {
    isValid = false;
    errors.push(`${amountPaid} is not a valid amount. Please enter a valid amount`);
  }

  return { isValid, errors };
};

export default validatePaymentData;
