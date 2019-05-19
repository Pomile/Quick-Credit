import '@babel/polyfill';
import data from '../seeder/data/data';
import loanHelpers from '../helpers/loan';
import repaymentHelpers from '../helpers/repayment';

let counter = 0;
class Repayment {
  static postRepayment(req, res) {
    const { amount } = req.body; const { email } = req.user;
    const { id } = req.params; const createdOn = new Date(); const loans = [...data.loans]; // copy data.loans
    const loanIndex = loans.findIndex(item => item.id === +id); // find loan
    if (loanIndex !== -1) {
      const loan = loans[loanIndex];
      if (loan.balance === 0) loan.repaid = true;
      if (loan.repaid === false && loan.status === 'approved') { // determine if loan repayment is complete
        const balance = loanHelpers.calculateBalance(loan.balance, amount);
        const loanUpdate = { ...loan, balance };
        data.loans[loanIndex] = loanUpdate; // update loan balance
        counter += 1;
        data.repayments.push({
          id: counter, loanId: +id, amount, collector: email, createdOn,
        }); // create repayment
        res.status(201).json({
          status: 201,
          data: {
            id: counter, loanId: +id, amount, collector: email, createdOn, balance,
          },
        }).end();
      } else if (['pending', 'rejected'].includes(loan.status)) {
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
