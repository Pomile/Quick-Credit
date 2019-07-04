import read from './crud/read';
import create from './crud/create';
import update from './crud/update';
import readAll from './crud/readAll';
import readRecs from './crud/readRecs';
import counter from './crud/counter';

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

  static async findLoanWithLimit(table, field, value, order, count) {
    const loan = await read(table, field, value, order, count);
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

  static async getPendingLoans({ status, repaid }) {
    const approvedLoans = await readRecs('loans', { status, repaid });
    return approvedLoans;
  }

  static async getRepaidLoans({ status, repaid }) {
    const fullyRepaidLoans = await readRecs('loans', { status, repaid });
    return fullyRepaidLoans;
  }

  static async LoanCounter(conditions) {
    const counted = await counter('loans', conditions);
    return counted;
  }
}

export default LoanHelpers;
