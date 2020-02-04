import { profile } from '../../../route/pagePath';

const displayPersonal = (data) => {
  const {
    firstname, lastname, email, phone, image, homeaddress, state,
  } = data;
  if (window.location.pathname === profile) {
    // document.querySelector('#imagePreview').src = image;
    if (image !== null) document.getElementById('userImage').src = `${image}`;
    document.querySelector('#firstname').value = firstname;
    document.querySelector('#lastname').value = lastname;
    document.querySelector('#mail').value = email;
    document.querySelector('#phone').value = phone;
    document.getElementById('userImage2').src = image;
    if (homeaddress !== null) document.querySelector('#street').value = homeaddress;
    if (state !== null) document.querySelector('#state').value = state;
  }
};

export default displayPersonal;
