import data from '../data';
import calculateInterestRate from '../helpers/calInterest';
import calulateMonthlyInstall from '../helpers/calPaymentInstall';
import findDueDate from '../helpers/dueDate';
import findLoanByEmail from '../helpers/findLoanByUserEmail';
import getPendingLoans from '../helpers/getPendingLoans';
import getNotRepaidLoans from '../helpers/getNotRepaidLoans';
import getRepaidLoans from '../helpers/getFullyRepaidLoans';


let counter = 4;

class Loan {
  static async createLoan(req, res) {
    const { email } = req.user;
    const { amount, tenor } = req.body;
    const repaid = false; const status = 'pending';
    const interest = await calculateInterestRate(amount);
    const monthlyInstall = await calulateMonthlyInstall(amount, interest, tenor);
    const dueDate = await findDueDate(tenor);
    const createdOn = new Date();
    const balance = amount + interest;
    // finduserByEmail
    const userLoan = await findLoanByEmail(data.loans, email);
    if (!userLoan.exist || userLoan.data.repaid === true) {
      counter += 1;
      data.loans.push({
        id: counter, createdOn, user: email, amount, tenor, status, repaid, interest, monthlyInstallment: monthlyInstall, dueDate, balance,
      });
      res.status(201).json({
        status: 201,
        data: {
          id: counter, createdOn, user: email, amount, tenor, status, repaid, interest, monthlyInstallment: monthlyInstall, balance, dueDate,
        },
      });
    } else if (userLoan.exist && userLoan.data.repaid === false) {
      res.status(409).json({ status: 409, error: 'Previous loan not repaid' });
    }
  }

  static async getAllLoans(req, res) {
    const loans = [...data.loans];
    const { status, repaid } = req.query;
    if (status === 'pending') {
      const pendingLoans = getPendingLoans(loans);
      res.status(200).json({ status: 200, data: pendingLoans }).end();
    } else if (status === 'approved' && !JSON.parse(repaid)) {
      const notRepaidLoans = getNotRepaidLoans(loans);
      res.status(200).json({ status: 200, data: notRepaidLoans }).end();
    } else if (status === 'approved' && JSON.parse(repaid)) {
      const repaidLoans = getRepaidLoans(loans);
      res.status(200).json({ status: 200, data: repaidLoans }).end();
    } else {
      res.status(200).json({ status: 200, data: loans }).end();
    }
  }

  static async modifyLoanStatus(req, res) {
    const { status } = req.body;
    const { id } = req.params;
    const loans = [...data.loans];
    const loanIndex = loans.findIndex(loan => loan.id === +id);
    if (loanIndex !== -1) {
      const updateLoan = { ...data.loans[loanIndex], status };
      data.loans[loanIndex] = updateLoan;
      res.status(200).json({ status: 200, data: data.loans[loanIndex] }).end();
    } else {
      res.status(404).json({ status: 404, error: 'loan not found' }).end();
    }
  }

  static async getLoan(req, res) {
    const { id } = req.params;
    const loans = [...data.loans];
    const loanIndex = loans.findIndex(loan => loan.id === +id);
    if (loanIndex !== -1) {
      res.status(200).json({ status: 200, data: data.loans[loanIndex] }).end();
    } else {
      res.status(404).json({ status: 404, error: 'loan not found' }).end();
    }
  }
}

export default Loan;
