import validateEmail from '../emailValidation';

const validateSiginData = (email, password) => {
  let isValid = true;
  const isValidEmail = validateEmail(email);
  if (password.length < 5 || !isValidEmail) {
    isValid = false;
  }
  return isValid;
};

export default validateSiginData;
