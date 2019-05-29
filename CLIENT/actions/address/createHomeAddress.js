import validateAddressData from './validateAddressData';
import displayAddress from './displayAddress';

const createHomeAddress = () => {
  const street = document.getElementById('street');
  const state = document.getElementById('state');
  const userId = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');
  const isAddressValid = validateAddressData(street.value, state.value);

  if (isAddressValid.isValid) {
    fetch(`http://localhost:8000/api/v1/users/${userId}/address`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json', authorization: `${token}` },
      body: JSON.stringify({
        address: street.value,
        state: state.value,
      }),
    }).then(res => res.json()).then((data) => {
      if (data.status === 409 && data.error) {
        document.getElementById('msg').innerHTML = data.error;
        open('backdrop2', 'errorBox');
      } else if (data.status === 422 && data.errors) {
        document.getElementById('msg').innerHTML = data.errors[0].error;
        open('backdrop2', 'errorBox');
      } else {
        displayAddress(data.data);
        document.getElementById('msg1').innerHTML = `${data.data.homeaddress} ${data.data.state}`;
        document.getElementById('emailDisplay').innerHTML = `${email}`;
        open('backdrop2', 'addressFeedback');
      }
    });
  }
};

export default createHomeAddress;
