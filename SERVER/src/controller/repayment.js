import '@babel/polyfill';
import data from '../seeder/data/data';
import loanHelpers from '../helpers/loan';
import repaymentHelpers from '../helpers/repayment';

class Repayment {
  static async postRepayment(req, res) {
    const { amount } = req.body; const { email } = req.user;
    const { id } = req.params;
    const loan = await loanHelpers.findLoan('loans', 'id', +id);
    if (loan.exist) {
      if (loan.data.repaid === false && loan.data.status === 'approved') {
        const balance = loanHelpers.calculateBalance(loan.data.balance, amount);
        if (balance === 0) loan.data.repaid = true;
        const loanUpdate = await repaymentHelpers.updateLoanBalance({ balance, repaid: loan.data.repaid }, { id });
        const repay = await repaymentHelpers.postRepayment({
          loanId: id, collector: email, amount, balance: loanUpdate.data.balance,
        });
        res.status(201).json({
          status: 201,
          data: repay.data,
        }).end();
      } else if (['pending', 'rejected'].includes(loan.data.status)) {
        res.status(409).json({ status: 409, error: 'Loan is not approved' }).end();
      } else {
        res.status(409).json({ status: 409, error: 'Repayment error.Loan repayment is balanced' }).end();
      }
    } else {
      res.status(404).json({ status: 404, error: 'loan not found' }).end();
    }
  }

  static getRepaymentHistory(req, res) {
    const { id } = req.params;
    const { email } = req.user;
    const userLoan = loanHelpers.getLoansByEmail(data.loans, id, email);
    if (userLoan.myLoan) {
      const repaymentHistory = repaymentHelpers.getRepaymentHistory(data.repayments, +id, 'loanId');
      repaymentHistory.status = 200;
      res.status(200).json(repaymentHistory);
    } else if (!userLoan.myLoan) {
      res.status(403).json({ status: 403, error: 'access denied' });
    }
  }
}

export default Repayment;
