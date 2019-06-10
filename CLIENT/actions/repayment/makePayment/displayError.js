
const displayError = (error, isValid) => {
  if (isValid) {
    document.querySelector('#msg').innerHTML = error;
    open('backdrop1', 'errorBox');
  } else {
    const p1 = document.createElement('p');
    const errMsg = document.querySelector('#errorMsg');
    p1.className = '-text-align-center -fc-red';
    p1.innerHTML = error;
    errMsg.appendChild(p1);
  }
};

export default displayError;
