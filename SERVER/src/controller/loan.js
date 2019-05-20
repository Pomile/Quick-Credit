import '@babel/polyfill';
import data from '../seeder/data/data';
import loanHelpers from '../helpers/loan';


const counter = 4;

class Loan {
  static async createLoan(req, res) {
    const { email } = req.user;
    const { amount, tenor } = req.body;
    const interest = loanHelpers.calculateInterestRate(amount);
    const monthlyinstall = loanHelpers.calulateMonthlyInstall(amount, interest, tenor);
    const duedate = loanHelpers.findDueDate(tenor);
    const balance = amount + interest;
    // finduserByEmail
    const userLoan = await loanHelpers.findLoan('loans', 'client', email);
    if (!userLoan.exist || userLoan.data.repaid === true) {
      const newLoan = await loanHelpers.createLoan({
        client: email, amount, tenor, interest, monthlyinstallment: monthlyinstall, duedate, balance,
      });
      res.status(201).json({
        status: 201,
        data: {
          ...newLoan.data, amount, interest, monthlyinstallment: monthlyinstall, balance,
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
      const pendingLoans = loanHelpers.getPendingLoans(loans);
      res.status(200).json({ status: 200, data: pendingLoans }).end();
    } else if (status === 'approved' && !JSON.parse(repaid)) {
      const notRepaidLoans = loanHelpers.getNotRepaidLoans(loans);
      res.status(200).json({ status: 200, data: notRepaidLoans }).end();
    } else if (status === 'approved' && JSON.parse(repaid)) {
      const repaidLoans = loanHelpers.getRepaidLoans(loans);
      res.status(200).json({ status: 200, data: repaidLoans }).end();
    } else {
      const allLoans = await loanHelpers.getAllLoans();
      res.status(200).json({ status: 200, data: allLoans.data }).end();
    }
  }

  static async modifyLoanStatus(req, res) {
    const { status } = req.body;
    const { id } = req.params;
    const findLoan = await loanHelpers.findLoan('loans', 'id', id);
    if (findLoan.exist) {
      const loan = await loanHelpers.updateLoanStatus({ status }, { id });
      res.status(200).json({ status: 200, data: loan.data }).end();
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
