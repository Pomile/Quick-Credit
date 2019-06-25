const displayAccount = (data) => {
  const {
    firstname, lastname, email, phone,
  } = data;
  document.querySelector('#firstname').value = firstname;
  document.querySelector('#lastname').value = lastname;
  document.querySelector('#mail').value = email;
  document.querySelector('#phone').value = phone;
};

export default displayAccount;
