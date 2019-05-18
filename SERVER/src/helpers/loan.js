import getItemsById from './readMul';

class LoanHelpers {
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

  static findLoanByEmail(list, email) {
    let data; let exist = false;
    const len = list.length;
    if (len > 0) {
      list.forEach((item) => {
        if (item.user === email) {
          data = item;
          exist = true;
        }
      });
    }
    return { exist, data };
  }

  static getLoansByEmail(list, id, email) {
    let data = null; let myLoan = false;
    const loans = getItemsById(list, id, 'id');
    if (loans.data.length > 0 && loans.data[0].user === email) {
      data = { ...loans.data[0] };
      myLoan = true;
      return { myLoan, data };
    }
    return { myLoan, data };
  }

  static getNotRepaidLoans(loans) {
    const notFullyRepaidLoans = [];
    loans.forEach((loan) => {
      if (loan.status === 'approved' && loan.repaid === false) {
        notFullyRepaidLoans.push(loan);
      }
    });
    return notFullyRepaidLoans;
  }

  static getPendingLoans(loans) {
    const approvedLoans = [];
    loans.forEach((loan) => {
      if (loan.status === 'pending') {
        approvedLoans.push(loan);
      }
    });
    return approvedLoans;
  }

  static getRepaidLoans(loans) {
    const fullyRepaidLoans = [];
    loans.forEach((loan) => {
      if (loan.status === 'approved' && loan.repaid === true) {
        fullyRepaidLoans.push(loan);
      }
    });
    return fullyRepaidLoans;
  }
}

export default LoanHelpers;
