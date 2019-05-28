class LoanOperator {
  static calculateInterestRate(amount) {
    return amount * 0.05;
  }

  static calculateBalance(balance, amountPaid) {
    return balance - amountPaid;
  }

  static findDueDate(noOfMonths) {
    const date = new Date();
    const newDate = new Date(date.setMonth(date.getMonth() + noOfMonths));
    return newDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      time: 'numeric',
    });
  }

  static calulateMonthlyInstall(amount, interest, tenor) {
    return (amount + interest) / tenor;
  }

  static validateLoanData(amount, tenor) {
    let isValid = true;
    const msg = [];
    if (typeof amount !== 'number') {
      isValid = false;
      msg.push('amount must be a number');
    }
    if (typeof tenor !== 'number') {
      isValid = false;
      msg.push('tenor must be a number');
    }

    return { isValid, msg };
  }
}

export default LoanOperator;
