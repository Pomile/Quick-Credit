import data from '../data';
import calculateInterestRate from '../helpers/calInterest';
import calculateBalance from '../helpers/calbalance';
import calulateMonthlyInstall from '../helpers/calPaymentInstall';
import findDueDate from '../helpers/dueDate';
import findLoanByEmail from '../helpers/findLoanByUserEmail';
import getPendingLoans from '../helpers/getPendingLoans';
import getNotRepaidLoans from '../helpers/getNotRepaidLoans';


let counter = 4;

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
        id: counter, createdOn, user: email, amount, tenor, status, repaid, interest, monthlyInstallment: monthlyInstall, dueDate, balance,
      });
      res.status(201).json({
        data: {
          id: counter, createdOn, user: email, amount, tenor, status, repaid, interest, monthlyInstallment: monthlyInstall, balance, dueDate,
        },
      });
    } else {
      res.status(409).json({ error: 'Previous loan not repaid' });
    }
  }

  static async getAllLoans(req, res) {
    const loans = [...data.loans];
    const { status, repaid } = req.query;
    if (status === 'pending') {
      const pendingLoans = getPendingLoans(loans);
      res.status(200).json({ data: pendingLoans }).end();
    } else if (status === 'approved' && !JSON.parse(repaid)) {
      const notRepaidLoans = getNotRepaidLoans(loans);
      res.status(200).json({ data: notRepaidLoans }).end();
    } else {
      res.status(200).json({ data: loans }).end();
    }
  }
}

export default Loan;
