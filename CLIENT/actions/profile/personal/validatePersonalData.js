/**
 * Validate a user personal data
 *
 * */
const validatePersonalData = (data) => {
  let isValid = true;
  const error = [];

  if (data.firstname.value.trim() === '' || data.firstname.value.length <= 1) {
    isValid = false;
    data.firstname.style.border = '1px solid red';
  } else {
    data.firstname.style.border = 'none';
  }

  if (data.lastname.value.trim() === '' || data.lastname.value.length <= 1) {
    isValid = false;
    data.lastname.style.border = '1px solid red';
  } else {
    data.lastname.style.border = 'none';
  }
  if (data.email.value.trim() === '') {
    isValid = false;
    data.email.style.border = '1px solid red';
  } else {
    data.email.style.border = 'none';
  }

  return { isValid, error };
};

export default validatePersonalData;
