import { userDashboard, home } from '../../route/pagePath';

const dashboard = () => {
  const loader = document.getElementById('loaderContainer');
  const name = localStorage.getItem('name');
  const firstname = localStorage.getItem('firstname');
  const email = localStorage.getItem('email');
  const image = localStorage.getItem('image');

  if (window.location.pathname === userDashboard ) {
    document.getElementById('greet').innerHTML = `Welcome ${firstname}`;
  }

  document.getElementById('emailDisplay').innerHTML = `${email}`;
  document.getElementById('username').innerHTML = `${name}`;

  if (image !== 'null') {
    document.getElementById('userImage').src = `${image}`;
    document.getElementById('sidenavUserImage').src = `${image}`;
  }

  if (email === null) {
    window.location.href = home;
  } else {
    loader.style.display = 'none';
  }
};

export default dashboard;
