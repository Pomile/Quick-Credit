const validateBankDetails = (data) => {
  let isValid = true;
  const error = [];
  const {
    name, accNumber, accType, accName, bvn,
  } = data;
  if (name === '' || name.length < 5) {
    isValid = false;
    error.push('Bank name is required');
  }
  if (accName === '' || accName.length < 5) {
    isValid = false;
    error.push('Account name is required');
  }
  if (name.length < 5) {
    isValid = false;
    error.push('Bank name is too short');
  }

  if (Number.isNaN(accNumber)) {
    isValid = false;
    error.push('Account number must be an integer');
  }

  if (parseInt(accNumber).toString().length < 9) {
    isValid = false;
    error.push('Account number is too short');
  }
  if (Number.isNaN(bvn)) {
    isValid = false;
    error.push('Invalid BVN');
  }
  if (accType === '' || !['Savings', 'Current', 'Domicilary'].includes(accType)) {
    isValid = false;
    error.push('Invalid BVN');
  }
  return {
    isValid,
    error,
  };
};

export default validateBankDetails;
