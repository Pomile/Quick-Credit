import fetch from 'node-fetch';
import '@babel/polyfill';
import validateRegData from './validate';

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
    fetch('http://localhost:8000/api/v1/auth/signup', {
      method: 'post',
      body: JSON.stringify({
        firstname: firstname.value, lastname: lastname.value, email: email.value, phone: phone.value, password: password.value, cpassword: confirmPassword.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json()).then((data) => {
      if (data.data.id) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('name', `${data.data.firstname} ${data.data.lastname}`);
        localStorage.setItem('email', `${data.data.email}`);
        setTimeout(() => {
          window.location.href = `http://${window.location.host}/user.html`;
        }, 100);
      }
    });
  }
};

export default signup;
