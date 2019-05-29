const validateLoanData = (amount, tenor) => {
  let isValid = true;
  const errors = [];
  if (amount.value === '' || isNaN(amount.value)) {
    isValid = false;
    errors.push(`${amount.value} is not a valid amount`);
  }

  if (tenor === '' || typeof +tenor !== 'number') {
    isValid = false;
    errors.push(`${tenor} is not a valid tenor`);
  }

  return { isValid, errors };
};

export default validateLoanData;
