import '@babel/polyfill';
import loanHelpers from '../helpers/loan';
import responseHelper from '../helpers/response';


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
      responseHelper.resourceCreated(res, {
        ...newLoan.data, amount, interest, monthlyinstallment: monthlyinstall, balance,
      });
      // res.status(201).json({
      //   status: 201,
      //   data: {
      //     ...newLoan.data, amount, interest, monthlyinstallment: monthlyinstall, balance,
      //   },
      // });
    } else if (userLoan.exist && userLoan.data.repaid === false) {
      responseHelper.conflict(res, 'Previous loan not repaid');
      // res.status(409).json({ status: 409, error: 'Previous loan not repaid' });
    }
  }

  static async getAllLoans(req, res) {
    const { status, repaid } = req.query;
    if (status === 'pending') {
      const pendingLoans = await loanHelpers.getPendingLoans({ status, repaid });
      responseHelper.oK(res, pendingLoans.data);
      // res.status(200).json({ status: 200, data: pendingLoans.data }).end();
    } else if (status === 'approved' && !JSON.parse(repaid) && repaid === 'false') {
      const notRepaidLoans = await loanHelpers.getNotRepaidLoans({ status, repaid });
      responseHelper.oK(res, notRepaidLoans.data);
      // res.status(200).json({ status: 200, data: notRepaidLoans.data }).end();
    } else if (status === 'approved' && JSON.parse(repaid) && repaid === 'true') {
      const repaidLoans = await loanHelpers.getRepaidLoans({ status, repaid });
      responseHelper.oK(res, repaidLoans.data);
      // res.status(200).json({ status: 200, data: repaidLoans.data }).end();
    } else {
      const allLoans = await loanHelpers.getAllLoans();
      responseHelper.oK(res, allLoans.data);
      // res.status(200).json({ status: 200, data: allLoans.data }).end();
    }
  }

  static async modifyLoanStatus(req, res) {
    const { status } = req.body;
    const { id } = req.params;
    const findLoan = await loanHelpers.findLoan('loans', 'id', id);
    if (findLoan.exist) {
      const loan = await loanHelpers.updateLoanStatus({ status }, { id });
      responseHelper.oK(res, loan.data);
      // res.status(200).json({ status: 200, data: loan.data }).end();
    } else {
      responseHelper.notFound(res, 'loan not found');
      // res.status(404).json({ status: 404, error: 'loan not found' }).end();
    }
  }

  static async getLoan(req, res) {
    const { id } = req.params;
    const loan = await loanHelpers.findLoan('loans', 'id', id);
    if (loan.exist) {
      responseHelper.oK(res, loan.data);
      // res.status(200).json({ status: 200, data: loan.data }).end();
    } else {
      responseHelper.notFound(res, 'loan not found');
      // res.status(404).json({ status: 404, error: 'loan not found' }).end();
    }
  }
}

export default Loan;
