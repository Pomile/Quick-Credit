const validateLoanId = (loanId) => {
  let isValid = true;
  let error = '';
  if (loanId === '' || +loanId <= 0 || isNaN(loanId)) {
    isValid = false;
    error = 'Invalid loan id';
  }
  return { isValid, error };
};

export default validateLoanId;
