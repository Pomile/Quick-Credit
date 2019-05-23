import update from './crud/update';
import create from './crud/create';
import read from './crud/read';

class RepaymentHelpers {
  static async postRepayment({
    loanId, collector, amount, balance,
  }) {
    const repay = await create('repayments', {
      loanId, collector, amount, balance,
    });
    return repay;
  }

  static async updateLoanBalance({ balance, repaid }, { id }) {
    const updateBalance = await update('loans', { balance, repaid }, { id });
    return updateBalance;
  }

  static async getAloanRepaymentHistory(field, id) {
    const getRepaymentHistory = await read('repayments', field, id);
    return getRepaymentHistory;
  }
}

export default RepaymentHelpers;
