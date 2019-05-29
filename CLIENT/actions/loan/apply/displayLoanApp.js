const displayLoanApp = (data) => {
  document.getElementById('loanId').innerHTML = data.id;
  document.getElementById('email').innerHTML = data.client;
  document.getElementById('loanAmountDisplay').innerHTML = data.amount;
  document.getElementById('tenorDisplay').innerHTML = data.tenor;
  document.getElementById('interest').innerHTML = data.interest;
  document.getElementById('totalRepayment').innerHTML = data.balance;
  document.getElementById('monthlyInstall').innerHTML = data.monthlyinstallment;
  document.getElementById('repaymentDate').innerHTML = data.duedate;
};

export default displayLoanApp;
