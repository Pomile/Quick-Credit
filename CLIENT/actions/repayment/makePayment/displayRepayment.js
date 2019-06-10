const displayRepayment = (data) => {
  const loanId = document.querySelector('#loanIdDisplay');
  const amount = document.querySelector('#amountDisplay');
  const collector = document.querySelector('#collectorDisplay');
  const balance = document.querySelector('#balanceDisplay');

  loanId.innerHTML = `${data.loanid}`;
  amount.innerHTML = `${data.amount}`;
  collector.innerHTML = `${data.collector}`;
  balance.innerHTML = `${data.balance}`;
};

export default displayRepayment;
