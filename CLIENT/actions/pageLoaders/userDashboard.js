const loadUserDashboard = () => {
  const loader = document.getElementById('loaderContainer');
  const name = localStorage.getItem('name');
  document.getElementById('greet').innerHTML = `Welcome ${name}`;
  loader.style.display = 'none';
};

export default loadUserDashboard;
