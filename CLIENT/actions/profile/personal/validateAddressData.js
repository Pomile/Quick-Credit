const validateAddressData = (street, state) => {
  let isValid = true;
  const error = [];

  if (street.trim() === '') {
    isValid = false;
    error.push('street must not be empty');
  }

  if (state.trim() === '') {
    isValid = false;
    error.push('state must not be empty');
  }

  return { isValid, error };
};

export default validateAddressData;
