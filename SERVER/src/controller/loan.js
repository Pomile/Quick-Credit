import data from '../data';
import calculateInterestRate from '../helpers/calInterest';
import calculateBalance from '../helpers/calbalance';
import calulateMonthlyInstall from '../helpers/calPaymentInstall';
import findDueDate from '../helpers/dueDate';
import findLoanByEmail from '../helpers/findLoanByUserEmail';

let counter = 0;

class Loan {
  static async createLoan(req, res) {
    const { email } = req.user;
    const { amount, tenor } = req.body;
    const repaid = false; const status = 'pending';
    const interest = calculateInterestRate(amount);
    const monthlyInstall = calulateMonthlyInstall(amount, interest, tenor);
    const dueDate = findDueDate(tenor);
    const createdOn = new Date();
    const balance = calculateBalance(amount, interest, 0);
    // finduserByEmail
    const findLoanByUserEmail = findLoanByEmail(data.loans, email);
    if (!findLoanByUserEmail.userExists || findLoanByUserEmail.data.repaid === true) {
      counter += 1;
      data.loans.push({
        id: counter, createdOn, user: email, amount, tenor, status, repaid, interest, monthlyInstall, dueDate, balance,
      });
      res.status(201).json({
        data: {
          id: counter, createdOn, user: email, amount, tenor, status, repaid, interest, monthlyInstall, balance, dueDate,
        },
      });
    } else {
      res.status(409).json({ error: 'Previous loan not repaid' });
    }
  }
}

export default Loan;
