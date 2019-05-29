const dashboard = () => {
  const loader = document.getElementById('loaderContainer');
  const name = localStorage.getItem('name');
  const firstname = localStorage.getItem('firstname');
  const email = localStorage.getItem('email');
  if (window.location.pathname === '/user.html') {
    document.getElementById('greet').innerHTML = `Welcome ${firstname}`;
  }

  document.getElementById('emailDisplay').innerHTML = `${email}`;
  document.getElementById('username').innerHTML = `${name}`;
  loader.style.display = 'none';
};

export default dashboard;
