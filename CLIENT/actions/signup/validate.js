
const validateRegData = (regData) => {
  let valid = true;
  console.log(regData.firstname.value.trim() === '', regData.firstname.value.length <= 1);
  if (regData.firstname.value.trim() === '' || regData.firstname.value.length <= 1) {
    valid = false;
    regData.firstname.style.borderBottom = '1px solid red';
  } else {
    regData.firstname.style.borderColor = '';
  }

  if (regData.lastname.value.trim() === '' || regData.lastname.value.length <= 1) {
    valid = false;
    regData.lastname.style.borderColor = 'red';
  } else {
    regData.lastname.style.borderColor = '';
  }
  if (regData.email.value.trim() === '') {
    valid = false;
    regData.email.style.borderColor = 'red';
  } else {
    regData.email.style.borderColor = '';
  }
  if (regData.password.value.trim() === '' || regData.password.value.trim() !== regData.confirmPassword.value.trim()) {
    regData.password.style.borderColor = 'red';
    regData.confirmPassword.style.borderColor = 'red';
  } else {
    regData.password.style.borderColor = '';
    regData.confirmPassword.style.borderColor = '';
  }

  return valid;
};

export default validateRegData;
