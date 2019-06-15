
import {
  fieldValidator, userCredentialsValidator, userDataValidator, userJObValidator, homeAddressValidator, loanValidator, validateLoanStatus, validateRepaymentVal, validateUserStatus, validateUserIsAdmin,
} from './validation/index';
import responseHelper from '../helpers/response';
import {
  userFields, loginFields, houseAddress, jobFields, loanFields, loanStatusFields, repaymentFields, userStatusFields, userIsadminFields, bankFields,
} from './validation/fields';
import validateBankData from './validation/bankDataValidator';

export const validateUser = (req, res, next) => {
  const fieldResult = fieldValidator(req, userFields);
  const userDataResult = userDataValidator(req);
  if (!fieldResult.allFieldExists) {
    responseHelper.badRequests(res, fieldResult.errors);
  } else if (!userDataResult.isValid) {
    responseHelper.unprocessables(res, userDataResult.errors);
  } else {
    next();
  }
};

export const validateUserStat = (req, res, next) => {
  const userStatusfieldResult = fieldValidator(req, userStatusFields);
  const userStatusDataResult = validateUserStatus(req);
  if (!userStatusfieldResult.allFieldExists) {
    responseHelper.badRequests(res, userStatusfieldResult.errors);
  } else if (!userStatusDataResult.isValid) {
    responseHelper.unprocessables(res, userStatusDataResult.errors);
  } else {
    next();
  }
};


export const validateCredentials = (req, res, next) => {
  const userCredFieldResult = fieldValidator(req, loginFields);
  const userCredDataResult = userCredentialsValidator(req);
  if (!userCredFieldResult.allFieldExists) {
    responseHelper.badRequests(res, userCredFieldResult.errors);
  } else if (!userCredDataResult.isValid) {
    responseHelper.unprocessables(res, userCredDataResult.errors);
  } else {
    next();
  }
};

export const validateHomeAddress = (req, res, next) => {
  const addressFieldResult = fieldValidator(req, houseAddress);
  const userAddressDataResult = homeAddressValidator(req);
  if (!addressFieldResult.allFieldExists) {
    responseHelper.badRequests(res, addressFieldResult.errors);
  } else if (!userAddressDataResult.isValid) {
    responseHelper.unprocessables(res, userAddressDataResult.errors);
  } else {
    next();
  }
};

export const validateBankDetails = (req, res, next) => {
  const bankFieldResult = fieldValidator(req, bankFields);
  const userBankDataResult = validateBankData(req);
  if (!bankFieldResult.allFieldExists) {
    responseHelper.badRequests(res, bankFieldResult.errors);
  } else if (!userBankDataResult.isValid) {
    responseHelper.unprocessables(res, userBankDataResult.errors);
  } else {
    next();
  }
};

export const validateJob = (req, res, next) => {
  const jobFieldResult = fieldValidator(req, jobFields);
  const userJobDataResult = userJObValidator(req);
  if (!jobFieldResult.allFieldExists) {
    responseHelper.badRequests(res, jobFieldResult.errors);
  } else if (!userJobDataResult.isValid) {
    responseHelper.unprocessables(res, userJobDataResult.errors);
  } else {
    next();
  }
};

export const validateLoan = (req, res, next) => {
  const loanFieldResult = fieldValidator(req, loanFields);
  const loanDataResult = loanValidator(req);
  if (!loanFieldResult.allFieldExists) {
    responseHelper.badRequests(res, loanFieldResult.errors);
  } else if (!loanDataResult.isValid) {
    responseHelper.unprocessables(res, loanDataResult.errors);
  } else {
    next();
  }
};

export const validateLoanStat = (req, res, next) => {
  const loanStatFieldResult = fieldValidator(req, loanStatusFields);
  const loanStatDataResult = validateLoanStatus(req);
  if (!loanStatFieldResult.allFieldExists) {
    responseHelper.badRequests(res, loanStatFieldResult.errors);
  } else if (!loanStatDataResult.isValid) {
    responseHelper.unprocessables(res, loanStatDataResult.errors);
  } else {
    next();
  }
};

export const validateRepayment = (req, res, next) => {
  const repayFieldResult = fieldValidator(req, repaymentFields);
  const repaymentDataResult = validateRepaymentVal(req);
  if (!repayFieldResult.allFieldExists) {
    responseHelper.badRequests(res, repayFieldResult.errors);
  } else if (!repaymentDataResult.isValid) {
    responseHelper.unprocessables(res, repaymentDataResult.errors);
  } else {
    next();
  }
};

export const validateUserIsadminPriv = (req, res, next) => {
  const isadminFieldResult = fieldValidator(req, userIsadminFields);
  const isadminDataResult = validateUserIsAdmin(req);
  if (!isadminFieldResult.allFieldExists) {
    responseHelper.badRequests(res, isadminFieldResult.errors);
  } else if (!isadminDataResult.isValid) {
    responseHelper.unprocessables(res, isadminDataResult.errors);
  } else {
    next();
  }
};
