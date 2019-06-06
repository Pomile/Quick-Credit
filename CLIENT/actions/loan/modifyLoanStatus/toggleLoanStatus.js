import { showLoanStatusAlert, removeAlert } from '../../tools/alert';

const toggleLoanStatus = (loan) => {
  const pendingLoan = document.querySelector(`#pending-${loan.id}`);
  const approveLoan = document.querySelector(`#approve-${loan.id}`);
  const cancelLoan = document.querySelector(`#cancel-${loan.id}`);
  if (loan.status === 'approved') {
    pendingLoan.classList.remove('-fc-amber-1');
    cancelLoan.classList.remove('-fc-red');
    approveLoan.classList.remove('-fc-gray-1');
    pendingLoan.classList.add('-fc-gray-1');
    cancelLoan.classList.add('-fc-gray-1');
    approveLoan.classList.add('-fc-green');
    showLoanStatusAlert(loan.id, loan.status, '-green-1');
  } else if (loan.status === 'pending') {
    pendingLoan.classList.remove('-fc-gray-1');
    cancelLoan.classList.remove('-fc-red');
    approveLoan.classList.remove('-fc-green');
    pendingLoan.classList.add('-fc-amber-1');
    cancelLoan.classList.add('-fc-gray-1');
    approveLoan.classList.add('-fc-gray-1');
    removeAlert('root', 'alert');
    showLoanStatusAlert(loan.id, loan.status, '-amber-1');
  } else if (loan.status === 'rejected') {
    pendingLoan.classList.remove('-fc-amber-1');
    cancelLoan.classList.remove('-fc-gray-1');
    approveLoan.classList.remove('-fc-green');
    pendingLoan.classList.add('-fc-gray-1');
    cancelLoan.classList.add('-fc-red');
    approveLoan.classList.add('-fc-gray-1');
    showLoanStatusAlert(loan.id, loan.status, '-red');
  }
};

export default toggleLoanStatus;
