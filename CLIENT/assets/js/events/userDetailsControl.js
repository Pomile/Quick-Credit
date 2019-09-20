export const openDetails = () => {
  document.getElementById('modalBox').classList.remove('hide');
  document.getElementById('backdrop1').classList.remove('hide');
  document.getElementById('backdrop1').classList.add('show');
  document.getElementById('modalBox').classList.add('show');
};

export const closeDetails = () => {
  document.getElementById('modalBox').classList.remove('show');
  document.getElementById('backdrop1').classList.remove('show');
  document.getElementById('modalBox').classList.add('hide');
  document.getElementById('backdrop1').classList.add('hide');
};

export const openLoanMsg = () => {
  document.getElementById('loanMsg').classList.remove('hide');
  document.getElementById('backdrop2').classList.remove('hide');
  document.getElementById('backdrop2').classList.add('show');
  document.getElementById('loanMsg').classList.add('show');
};

export const closeLoanMsg = () => {
  document.getElementById('loanMsg').classList.remove('show');
  document.getElementById('backdrop2').classList.remove('show');
  document.getElementById('loanMsg').classList.add('hide');
  document.getElementById('backdrop2').classList.add('hide');
};
