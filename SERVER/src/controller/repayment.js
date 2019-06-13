import '@babel/polyfill';
import loanHelpers from '../helpers/loan';
import repaymentHelpers from '../helpers/repayment';
import responseHelper from '../helpers/response';

class Repayment {
  static async postRepayment(req, res) {
    const { amount } = req.body; const { email } = req.user;
    const { id } = req.params;
    const loan = await loanHelpers.findLoan('loans', 'id', +id);
    if (loan.exist) {
      if (loan.data.repaid === false && loan.data.status === 'approved') {
        const balance = loanHelpers.calculateBalance(loan.data.balance, amount);
        if (balance < 0) res.status(422).json({ error: 'Loan repayment Error, Please pay actual balance', balance: loan.data.balance });
        if (balance === 0) loan.data.repaid = true;
        const loanUpdate = await repaymentHelpers.updateLoanBalance({ balance, repaid: loan.data.repaid }, { id });
        const repay = await repaymentHelpers.postRepayment({
          loanId: id, customer: loan.data.client, collector: email, amount, balance: loanUpdate.data.balance,
        });
        responseHelper.resourceCreated(res, repay.data);
      } else if (['pending', 'rejected'].includes(loan.data.status)) {
        responseHelper.unprocessable(res, 'Loan is not approved');
      } else {
        responseHelper.unprocessable(res, 'Repayment error.Loan repayment is balanced');
      }
    } else {
      responseHelper.notFound(res, 'loan not found');
    }
  }

  static async getRepaymentHistory(req, res) {
    const { id } = req.params;
    const { email, isadmin } = req.user;
    const userLoan = await loanHelpers.findLoan('loans', 'id', id);
    if ((userLoan.exist && userLoan.data.client === email) || isadmin) {
      const repaymentHistory = await repaymentHelpers.getAloanRepaymentHistory('loanId', +id);
      const repayments = [...repaymentHistory.allData];
      const loan = { ...userLoan.data };
      const data = { repayments, loan };
      responseHelper.oK(res, data, '');
    } else {
      responseHelper.notFound(res, 'Loan Not Found');
    }
  }

  static async getAllRepaymentHistory(req, res) {
    const { email, isadmin } = req.user;
    const userLoan = await loanHelpers.findLoan('loans', 'client', email);
    if ((userLoan.exist && userLoan.data.client === email) || isadmin) {
      const repaymentHistory = await repaymentHelpers.getAloanRepaymentHistory('customer', email);
      const repayments = [...repaymentHistory.allData];
      const data = { repayments };
      responseHelper.oK(res, data, '');
    } else {
      responseHelper.notFound(res, 'Loan Not Found');
    }
  }
}

export default Repayment;
