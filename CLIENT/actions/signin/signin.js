import validateEmail from '../emailValidation';


const signin = async (event) => {
  event.preventDefault();
  const email = document.getElementById('email');
  const password = document.getElementById('password');

  const isValid = validateEmail(email.value);

  if (isValid) {
    fetch('http://localhost:8000/api/v1/auth/signin', {
      method: 'post',
      body: JSON.stringify({
        email: email.value, password: password.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json()).then((data) => {
      console.log(data);
      if (data.data.id) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('name', `${data.data.firstname} ${data.data.lastname}`);
        localStorage.setItem('firstname', `${data.data.firstname}`);
        localStorage.setItem('image', `${data.data.image}`);
        localStorage.setItem('email', `${data.data.email}`);
        localStorage.setItem('id', `${data.data.id}`);
        if (!data.data.isadmin) {
          setTimeout(() => {
            window.location.href = `http://${window.location.host}/user.html`;
          }, 100);
        } else if (data.data.isadmin) {
          setTimeout(() => {
            window.location.href = `http://${window.location.host}/admin.html`;
          }, 100);
        }
      }
    });
  }
};

export default signin;
