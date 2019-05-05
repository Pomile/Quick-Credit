const getPendingLoans = (loans) => {
  const approvedLoans = [];
  loans.forEach((loan) => {
    if (loan.status === 'pending' && loan.repaid === false) {
      approvedLoans.push(loan);
    }
  });
  return approvedLoans;
};

export default getPendingLoans;
