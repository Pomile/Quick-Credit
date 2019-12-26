import validateSiginData from './validateData';
import displayError from '../tools/displayError';
import store from './store';
import baseUrl from '../../route/endpointPath';
import { userDashboardPath, adminDashboardPath } from '../../route/pagePath'


const signin = async (event) => {
  event.preventDefault();
  const email = document.getElementById('email');
  const password = document.getElementById('password');

  const isValid = validateSiginData(email.value, password.value);
  if (isValid) {
    fetch(`${baseUrl}/auth/signin`, {
      method: 'post',
      body: JSON.stringify({
        email: email.value, password: password.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json()).then((data) => {
      if(data.error){
        throw data.error
      } else {
        const {
          token, firstname, lastname, image, id, isadmin,
        } = data.data;
        store(token, firstname, lastname, image, email.value, id, isadmin);
        if (!data.data.isadmin) {
          setTimeout(() => {
            window.location.href = `http://${window.location.host}${userDashboardPath}`;
          }, 100);
        } else if (data.data.isadmin) {
          setTimeout(() => {
            window.location.href = `http://${window.location.host}${adminDashboardPath}`;
          }, 100);
        }
      }
    }).catch((err) => {
      displayError('Incorrect email or password or check your network connection');
    });
  } else {
    displayError('Incorrect email or password or check your network connection');
  }
};

export default signin;
