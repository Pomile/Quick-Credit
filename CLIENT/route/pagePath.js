// Quick-Credit/dist
const { NODE_ENV } = process.env;
const home = NODE_ENV === 'development' ? '/index.html'
  : '/Quick-Credit/dist/index.html';
const signup = NODE_ENV === 'development' ? '/signup.html'
  : '/Quick-Credit/dist/signup.html';
const signin = NODE_ENV === 'development' ? '/signin.html'
  : '/Quick-Credit/dist/signin.html';
const userDashboardPath = NODE_ENV === 'development' ? '/user.html'
  : '/Quick-Credit/dist/user.html';
const adminDashboardPath = NODE_ENV === 'development' ? '/admin.html'
  : '/Quick-Credit/dist/admin.html';
const loanApplication = NODE_ENV === 'development' ? '/loanapp.html'
  : '/Quick-Credit/dist/loanapp.html';
const profile = NODE_ENV === 'development' ? '/profile.html'
  : '/Quick-Credit/dist/profile.html';
const passwordReset = NODE_ENV === 'development' ? '/reset.html'
  : '/Quick-Credit/dist/reset.html';
const verifyUser = NODE_ENV === 'development' ? '/verifyuser.html'
  : '/Quick-Credit/dist/verifyuser.html';
const loan = NODE_ENV === 'development' ? '/manageloan.html'
  : '/Quick-Credit/dist/manageloan.html';
const makePayment = NODE_ENV === 'development' ? '/makepayment.html'
  : '/Quick-Credit/dist/makepayment.html';
const repayment = NODE_ENV === 'development' ? '/repayment.html'
  : '/Quick-Credit/dist/repayment.html';
const manageloan = NODE_ENV === 'development' ? '/manageloan.html'
  : '/Quick-Credit/dist/manageloan.html';

export {
  home,
  manageloan,
  signup,
  signin,
  userDashboardPath,
  adminDashboardPath,
  loanApplication,
  profile,
  loan,
  passwordReset,
  makePayment,
  verifyUser,
  repayment,
};
