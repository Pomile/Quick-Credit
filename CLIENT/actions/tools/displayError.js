import removeAllTableChildNode from './removeAllChildNode';

const errorTemplate = (err) => {
    const p1 = document.createElement('p');
    const errMsg = document.querySelector('#errorMsg');

    p1.className = '-text-align-center -fc-red';
    p1.innerHTML = err;
    errMsg.appendChild(p1);
}
const displayError = (errors) => {
    errorMsg.innerHTML = '';
    if (Array.isArray(errors)){
      for(let counter=0; counter < errors.length; counter++ ){
        errorTemplate(errors[counter].error)
      }
    } else{
      errorTemplate(errors);
    }
};

export default displayError;
