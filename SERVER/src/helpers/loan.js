import read from './crud/read';
import create from './crud/create';
import update from './crud/update';

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

  static async findLoan(table, field, value) {
    const loan = await read(table, field, value);
    return loan;
  }

  static async createLoan({
    client, amount, tenor, interest, monthlyinstallment, duedate, balance,
  }) {
    const newLoan = await create('loans', {
      client, amount, tenor, interest, monthlyinstallment, duedate, balance,
    });
    return newLoan;
  }

  static async updateLoanStatus({ status }, { id }) {
    const updateStatus = await update('loans', { status }, { id });
    return updateStatus;
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
