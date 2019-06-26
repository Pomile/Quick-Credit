const dashboard = () => {
  const loader = document.getElementById('loaderContainer');
  const name = localStorage.getItem('name');
  const firstname = localStorage.getItem('firstname');
  const email = localStorage.getItem('email');
  const image = localStorage.getItem('image');
  if (window.location.pathname === '/user.html') {
    document.getElementById('greet').innerHTML = `Welcome ${firstname}`;
  }

  document.getElementById('emailDisplay').innerHTML = `${email}`;
  document.getElementById('username').innerHTML = `${name}`;

  if (image !== 'null') {
    document.getElementById('userImage').src = `${image}`;
  }
  loader.style.display = 'none';
};

export default dashboard;
