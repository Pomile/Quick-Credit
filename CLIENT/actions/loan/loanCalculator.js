import loanOperators from './operations';


const getLoanData = () => {
  const amount1 = document.getElementById('myLoanRange');
  const tenor = document.getElementById('myMonths');
  const isLoanDataValid = loanOperators.validateLoanData(+amount1.value, +tenor.value);
  if (isLoanDataValid.isValid) {
    return {
      amount: amount1.value,
      tenor: tenor.value,
    };
  }
  return null;
};

const calculateLoan = () => {
  const loan = getLoanData();
  if (loan) {
    const interest = loanOperators.calculateInterestRate(+loan.amount);
    const paymentInstall = loanOperators.calulateMonthlyInstall(+loan.amount, +interest, +loan.tenor);
    const totalRepayment = parseFloat(interest) + parseFloat(loan.amount);
    const dueDate = loanOperators.findDueDate(+loan.tenor);
    return {
      amount: loan.amount,
      tenor: loan.tenor,
      interest,
      paymentInstall,
      totalRepayment,
      dueDate,
    };
  }
  return null;
};

const displayLoan = () => {
  const result = calculateLoan();
  const {
    amount, tenor, interest, paymentInstall, totalRepayment, dueDate,
  } = result;
  document.getElementById('loanAmount').innerHTML = `${amount}`;
  document.getElementById('months').innerHTML = `${tenor}`;
  document.getElementById('interest').value = `${interest}`;
  document.getElementById('paymentInstall').value = `${paymentInstall}`;
  document.getElementById('totalRepayment').value = `${totalRepayment}`;
  document.getElementById('repaymentDueDate').value = `${dueDate}`;
};


export default displayLoan;
