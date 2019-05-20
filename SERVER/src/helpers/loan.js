import read from './crud/read';
import create from './crud/create';
import update from './crud/update';
import readAll from './crud/readAll';
import readRecs from './crud/readRecs';

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

  static async getAllLoans() {
    const getLoans = await readAll('loans');
    return getLoans;
  }

  static async getNotRepaidLoans({ status, repaid }) {
    const notFullyRepaidLoans = await readRecs('loans', { status, repaid });
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
