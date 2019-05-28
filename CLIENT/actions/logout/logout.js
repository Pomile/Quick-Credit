const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  localStorage.removeItem('firstname');
  localStorage.removeItem('email');
  setTimeout(() => {
    window.location.href = `http://${window.location.host}/index.html`;
  }, 100);
};


export default logout;
