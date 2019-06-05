const toggleLoanStatus = (id, status) => {
  const pendingLoan = document.querySelector(`#pending-${id}`);
  const approveLoan = document.querySelector(`#approve-${id}`);
  const cancelLoan = document.querySelector(`#cancel-${id}`);
  if (status === 'approved') {
    pendingLoan.classList.remove('-fc-amber-1');
    cancelLoan.classList.remove('-fc-red');
    approveLoan.classList.remove('-fc-gray-1');
    pendingLoan.classList.add('-fc-gray-1');
    cancelLoan.classList.add('-fc-gray-1');
    approveLoan.classList.add('-fc-green');
  } else if (status === 'pending') {
    pendingLoan.classList.remove('-fc-gray-1');
    cancelLoan.classList.remove('-fc-red');
    approveLoan.classList.remove('-fc-green');
    pendingLoan.classList.add('-fc-amber-1');
    cancelLoan.classList.add('-fc-gray-1');
    approveLoan.classList.add('-fc-gray-1');
  } else if (status === 'rejected') {
    pendingLoan.classList.remove('-fc-amber-1');
    cancelLoan.classList.remove('-fc-gray-1');
    approveLoan.classList.remove('-fc-green');
    pendingLoan.classList.add('-fc-gray-1');
    cancelLoan.classList.add('-fc-red');
    approveLoan.classList.add('-fc-gray-1');
  }
};

export default toggleLoanStatus;
