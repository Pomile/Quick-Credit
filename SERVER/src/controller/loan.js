import '@babel/polyfill';
import loanHelpers from '../helpers/loan';
import responseHelper from '../helpers/response';
import UserHelpers from '../helpers/user';

class Loan {
  static async createLoan(req, res) {
    const { email } = req.user;
    const { amount, tenor } = req.body;
    const interest = loanHelpers.calculateInterestRate(amount);
    const monthlyinstall = loanHelpers.calulateMonthlyInstall(amount, interest, tenor);
    const duedate = loanHelpers.findDueDate(tenor);
    const balance = amount + interest;
    const userLoan = await loanHelpers.findLoan('loans', 'client', email);
    if (!userLoan.exist || userLoan.data.repaid === true) {
      const newLoan = await loanHelpers.createLoan({
        client: email, amount, tenor, interest, monthlyinstallment: monthlyinstall, duedate, balance,
      });
      responseHelper.resourceCreated(res, {
        ...newLoan.data, amount, interest, monthlyinstallment: monthlyinstall, balance,
      });
    } else if (userLoan.exist && userLoan.data.repaid === false) {
      responseHelper.unprocessable(res, 'Previous loan not repaid');
    }
  }

  static async getAllLoans(req, res) {
    const { status, repaid } = req.query;
    if (status === 'pending') {
      const pendingLoans = await loanHelpers.getPendingLoans({ status, repaid });
      responseHelper.oK(res, pendingLoans.data);
    } else if (status === 'approved' && !JSON.parse(repaid) && repaid === 'false') {
      const notRepaidLoans = await loanHelpers.getNotRepaidLoans({ status, repaid });
      responseHelper.oK(res, notRepaidLoans.data);
    } else if (status === 'approved' && JSON.parse(repaid) && repaid === 'true') {
      const repaidLoans = await loanHelpers.getRepaidLoans({ status, repaid });
      responseHelper.oK(res, repaidLoans.data);
    } else {
      const allLoans = await loanHelpers.getAllLoans();
      responseHelper.oK(res, allLoans.data);
    }
  }

  static async modifyLoanStatus(req, res) {
    const { status } = req.body;
    const { id } = req.params;
    let loan;
    const findLoan = await loanHelpers.findLoan('loans', 'id', id);

    if (findLoan.exist) {
      const user = await UserHelpers.findUser('users', 'email', findLoan.data.client);
      if (user.data.status === 'verified' && status === 'approved') {
        loan = await loanHelpers.updateLoanStatus({ status }, { id });
        responseHelper.oK(res, loan.data);
      } else if (user.data.status !== 'verified' && status === 'approved') {
        responseHelper.unprocessable(res, 'loan status not modified. please ensure the user is verified');
      } else {
        loan = await loanHelpers.updateLoanStatus({ status }, { id });
        responseHelper.oK(res, loan.data);
      }
    } else {
      responseHelper.notFound(res, 'loan not found');
    }
  }

  static async getLoan(req, res) {
    const { id } = req.params;
    const loan = await loanHelpers.findLoan('loans', 'id', id);
    if (loan.exist) {
      responseHelper.oK(res, loan.data);
    } else {
      responseHelper.notFound(res, 'loan not found');
    }
  }

  static async getUserLatestLoan(req, res) {
    const { email } = req.params;
    const loan = await loanHelpers.findLoanWithLimit('loans', 'client', email);
    if ((loan.exist && email === req.user.email) || req.user.isadmin) {
      responseHelper.oK(res, loan.data);
    } else {
      responseHelper.notFound(res, 'loan not found');
    }
  }

  static async getLoanSummary(req, res) {
    const total = await loanHelpers.LoanCounter();
    const countLoans1 = await loanHelpers.LoanCounter({ status: 'approved', repaid: 'false' });
    const countLoans2 = await loanHelpers.LoanCounter({ status: 'rejected', repaid: 'true' });
    const countLoans3 = await loanHelpers.LoanCounter({ status: 'pending' });

    if (countLoans1 && countLoans2 && countLoans3) {
      responseHelper.oK(res, [total, ...countLoans1, ...countLoans3, ...countLoans2]);
    }
  }

  static async getUserLoanDetails(req, res) {
    const { id } = req.params;
    const matches = {
      loans: [
        'client',
        'id',
        'amount',
        'duedate',
        'balance',
        'monthlyinstallment',
        'interest',
      ],
      users: [
        'email',
        'status',
        'phone',
        'firstname',
        'lastname',
        'image',
        'homeaddress',
        'state',
      ],

    };
    const usersLoanDetails = await loanHelpers.getUserLoanDetails(matches, { id });
    if (usersLoanDetails.data) {
      responseHelper.oK(res, { ...usersLoanDetails.data[0] });
    }
  }
}

export default Loan;
