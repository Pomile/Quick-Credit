import validatePersonalData from './validatePersonalData';
import baseUrl from '../../../route/endpointPath';
import displayPersonal from './renderPersonaDatal';
/**
 * Save a user personal data
 */
const savePersonalData = () => {
  document.getElementById('spinner-sm').style.display = 'inline-block';
  const street = document.getElementById('street');
  const firstname = document.getElementById('firstname');
  const lastname = document.getElementById('lastname');
  const phone = document.getElementById('phone');
  const email = document.getElementById('mail');
  const state = document.getElementById('state');
  const userId = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const isPersonalDataValid = validatePersonalData({
    firstname, lastname, email, phone,
  });

  if (isPersonalDataValid.isValid) {
    fetch(`${baseUrl}/users/${userId}`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json', authorization: `${token}` },
      body: JSON.stringify({
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        phone: phone.value,
        homeAddress: street.value,
        state: state.value,
      }),
    }).then(res => res.json()).then((data) => {
      document.getElementById('spinner-sm').style.display = 'none';
      if (data.status === 422) {
        console.log(data);
        let msg = '';
        data.errors.forEach((element) => {
          msg = `${element.error}\n`;
        });
        throw new Error(msg);
      } else {
        console.log(data);
        displayPersonal(data.data);
      }
    }).catch((err) => {
      // display error box
      document.getElementById('msg').innerHTML = err.message;
      open('backdrop2', 'errorBox');
    });
  }
};

export default savePersonalData;
