import validateSiginData from './validateData';
import displayError from './displayError';
import store from './store';


const signin = async (event) => {
  event.preventDefault();
  const email = document.getElementById('email');
  const password = document.getElementById('password');

  const isValid = validateSiginData(email.value, password.value);
  console.log(isValid);
  if (isValid) {
    fetch('http://localhost:8000/api/v1/auth/signin', {
      method: 'post',
      body: JSON.stringify({
        email: email.value, password: password.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json()).then((data) => {
      if (data.status === 200) {
        const {
          token, firstname, lastname, image, id, isadmin,
        } = data.data;
        store(token, firstname, lastname, image, email.value, id, isadmin);
        if (!data.data.isadmin) {
          setTimeout(() => {
            window.location.href = `http://${window.location.host}/user.html`;
          }, 100);
        } else if (data.data.isadmin) {
          setTimeout(() => {
            window.location.href = `http://${window.location.host}/admin.html`;
          }, 100);
        }
      } else if (data.status === 401) {
        displayError(data.error);
      }
    });
  } else {
    displayError('Incorrect email or password');
  }
};

export default signin;
