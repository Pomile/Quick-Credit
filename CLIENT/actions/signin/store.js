const store = (token, firstname, lastname, image, email, id, isadmin) => {
  localStorage.setItem('token', token);
  localStorage.setItem('name', `${firstname} ${lastname}`);
  localStorage.setItem('firstname', `${firstname}`);
  localStorage.setItem('image', `${image}`);
  localStorage.setItem('email', `${email}`);
  localStorage.setItem('id', `${id}`);
  localStorage.setItem('isadmin', `${isadmin}`);
};
export default store;
