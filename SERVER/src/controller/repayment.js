import data from '../data';
import calculateBalance from '../helpers/calbalance';
import getRepaymentHistory from '../helpers/getLoanRepaymentHistory';
import findLoanByEmail from '../helpers/findLoanByUserEmail';
import getLoansByEmail from '../helpers/getLoansByEmail';

let counter = 0;
class Repayment {
  static async postRepayment(req, res) {
    const { amount } = req.body; const { email } = req.user;
    const { id } = req.params; const createdOn = new Date(); const loans = [...data.loans]; // copy data.loans
    const loanIndex = loans.findIndex(item => item.id === +id); // find loan
    if (loanIndex !== -1) {
      const loan = loans[loanIndex];
      if (loan.repaid === false && loan.status === 'approved') { // determine if loan repayment is complete
        if ((loan.amount + loan.interest) - (loan.balance) === 0) loan.repaid = true;
        const balance = calculateBalance(loan.amount, loan.interest, amount);
        const loanUpdate = { ...loan, balance };
        data.loans[loanIndex] = loanUpdate; // update loan balance
        counter += 1;
        data.repayments.push({
          id: counter, loanId: +id, amount, collector: email, createdOn,
        }); // create repayment
        res.status(201).json({
          data: {
            id: counter, loanId: +id, amount, collector: email, createdOn, balance,
          },
        }).end();
      } else if (['pending', 'rejected'].includes(loan.status)) {
        res.status(409).json({ error: 'Loan is not approved' });
      } else {
        res.status(409).json({ error: 'Repayment error.Loan repayment is balanced' });
      }
    } else {
      res.status(404).json({ error: 'loan not found' }).end();
    }
  }

  static async getRepaymentHistory(req, res) {
    const { id } = req.params;
    const { email } = req.user;
    const userLoan = getLoansByEmail(data.loans, id, email);
    if (userLoan.myLoan) {
      const repaymentHistory = getRepaymentHistory(data.repayments, +id, 'loanId');
      res.status(200).json(repaymentHistory);
    } else if (!userLoan.myLoan) {
      res.status(403).json({ error: 'access denied' });
    }
  }
}

export default Repayment;
