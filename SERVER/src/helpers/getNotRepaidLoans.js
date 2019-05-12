const getNotRepaidLoans = (loans) => {
  const notFullyRepaidLoans = [];
  loans.forEach((loan) => {
    if (loan.status === 'approved' && loan.repaid === false) {
      notFullyRepaidLoans.push(loan);
    }
  });
  return notFullyRepaidLoans;
};

export default getNotRepaidLoans;

