import { home } from '../../route/pagePath';
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  localStorage.removeItem('firstname');
  localStorage.removeItem('email');
  localStorage.removeItem('isadmin');
  localStorage.removeItem('image');
  localStorage.removeItem('id');
  setTimeout(() => {
    window.location.href = `http://${window.location.host}${home}`;
  }, 100);
};


export default logout;
