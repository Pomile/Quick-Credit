const loan = {

  user1creditRequest: {
    amount: 200000,
    tenor: 5,
  },
  user1creditRequestWithoutAmount: {
    amount: 0,
    tenor: 5,
  },
  user1creditRequestWithoutAmountProp: {
    tenor: 5,
  },
  user1creditRequestWithoutTenor: {
    amount: 200000,
    tenor: 0,
  },
};

export default loan;
