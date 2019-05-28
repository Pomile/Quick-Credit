import displayLoan from './loanCalculator';

const setSliderAmount = () => {
  const amount1 = document.getElementById('myLoanRange');
  const amount2 = document.getElementById('myLoan');
  amount1.value = amount2.value;
  displayLoan();
};

export default setSliderAmount;
