import { profile } from '../../route/pagePath';

const displayAccount = (data) => {
  const {
    firstname, lastname, email, phone, image,
  } = data;
  if (image !== null && window.location.pathname === profile ) {
    document.querySelector('#imagePreview').src = image;
    document.getElementById('userImage').src = `${image}`;
    document.querySelector('#firstname').value = firstname;
    document.querySelector('#lastname').value = lastname;
    document.querySelector('#mail').value = email;
    document.querySelector('#phone').value = phone;
  }
};

export default displayAccount;
