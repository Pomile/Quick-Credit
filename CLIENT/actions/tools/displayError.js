const displayError = (msg) => {
  document.getElementById('errorMsg').innerHTML = msg;
  document.getElementById('errorMsg').style.color = 'red';
};

export default displayError;
