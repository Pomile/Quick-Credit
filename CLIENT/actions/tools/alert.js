const showLoanStatusAlert = (loanId, status, color) => {
  const root = document.getElementById('root');
  const alert = document.createElement('div');
  const header = document.createElement('div');
  const loan = document.createElement('p');
  const stat = document.createElement('p');
  stat.className = '-text-align-center';
  loan.className = '-text-align-center';
  header.className = '-text-align-center';
  const headerText = document.createTextNode(header);
  let statusText;
  statusText = status === 'pending' ? document.createTextNode(`${status} approval`) : document.createTextNode(`Loan ${status}`);
  const loanText = document.createTextNode(`${loanId}`);

  stat.appendChild(statusText);
  loan.appendChild(loanText);
  alert.id = 'alert';
  alert.className = `alert fade-in ${color}`;
  alert.appendChild(stat);
  root.appendChild(alert);
};

const removeAlert = (parent, child) => {
  const root = document.querySelector(`#${parent}`);
  const rootChild = document.querySelector(`#${child}`);
  if (rootChild !== null) {
    root.removeChild(rootChild);
  }
};

const showUserStatusAlert = (email) => {

};

export {
  showLoanStatusAlert,
  showUserStatusAlert,
  removeAlert,
};
