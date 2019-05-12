const getRepaidLoans = (loans) => {
  const fullyRepaidLoans = [];
  loans.forEach((loan) => {
    if (loan.status === 'approved' && loan.repaid === true) {
      fullyRepaidLoans.push(loan);
    }
  });
  return fullyRepaidLoans;
};

export default getRepaidLoans;
