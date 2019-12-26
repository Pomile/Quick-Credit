import fetch from 'node-fetch';
import '@babel/polyfill';
import validateRegData from './validate';
import baseUrl from '../../route/endpointPath';
import displayError from '../tools/displayError';
import { userDashboard} from '../../route/pagePath';

const signup = async (event) => {
  event.preventDefault();
  const firstname = document.getElementById('firstname');
  const lastname = document.getElementById('lastname');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');

  const isValid = validateRegData({
    firstname, lastname, email, phone, password, confirmPassword,
  });
  if (isValid) {
    fetch(`${baseUrl}/auth/signup`, {
      method: 'post',
      body: JSON.stringify({
        firstname: firstname.value, lastname: lastname.value, email: email.value, phone: phone.value, password: password.value, cpassword: confirmPassword.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json()).then((data) => {
      if(data.errors || data.error){
        throw data.errors || data.error
      }else{
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('name', `${data.data.firstname} ${data.data.lastname}`);
        localStorage.setItem('email', `${data.data.email}`);
        setTimeout(() => {
          window.location.href = `http://${window.location.host}${userDashboard}`;
        }, 100);
      }
    }).catch((err) => {
      displayError(err);
    });
  }
};

export default signup;
