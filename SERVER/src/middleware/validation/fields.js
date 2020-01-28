const userFields = ['firstname', 'lastname', 'email', 'phone', 'password', 'cpassword'];
const personalFields = ['firstname', 'lastname', 'email', 'phone', 'homeAddress', 'state'];
const loginFields = ['email', 'password'];
const houseAddress = ['address', 'state'];
const jobFields = ['monthlyIncome', 'grossIncome', 'years', 'position', 'companyName', 'companyWebsite'];
const loanFields = ['amount', 'tenor'];
const loanStatusFields = ['status'];
const userStatusFields = ['status'];
const userIsadminFields = ['isadmin'];
const repaymentFields = ['loanId', 'amount'];
const bankFields = ['name', 'accName', 'accNumber', 'bvn'];
const userImage = ['imageUrl'];
const userPassword = ['password'];

export {
  userFields,
  personalFields,
  loginFields,
  houseAddress,
  jobFields,
  userImage,
  loanFields,
  loanStatusFields,
  repaymentFields,
  userStatusFields,
  userIsadminFields,
  bankFields,
  userPassword,
};
