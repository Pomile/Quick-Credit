
import {
  fieldValidator, userCredentialsValidator, userDataValidator, userJObValidator, homeAddressValidator, loanValidator, validateLoanStatus, validateRepaymentVal, validateUserStatus, validateUserIsAdmin,
} from './validation/index';
import responseHelper from '../helpers/response';
import {
  userFields, loginFields, houseAddress, jobFields, loanFields, loanStatusFields, repaymentFields, userStatusFields, userIsadminFields,
} from './validation/fields';

export const validateUser = (req, res, next) => {
  const fieldResult = fieldValidator(req, userFields);
  const userDataResult = userDataValidator(req);
  if (!fieldResult.allFieldExists) {
    responseHelper.badRequest(res, fieldResult.error[0]);
  } else if (!userDataResult.isValid) {
    responseHelper.unprocessable(res, userDataResult.errors[0].error);
  } else {
    next();
  }
};

export const validateUserStat = (req, res, next) => {
  const userStatusfieldResult = fieldValidator(req, userStatusFields);
  const userStatusDataResult = validateUserStatus(req);
  if (!userStatusfieldResult.allFieldExists) {
    responseHelper.badRequest(res, userStatusfieldResult.error[0]);
  } else if (!userStatusDataResult.isValid) {
    responseHelper.unprocessable(res, userStatusDataResult.errors[0].error);
  } else {
    next();
  }
};


export const validateCredentials = (req, res, next) => {
  const userCredFieldResult = fieldValidator(req, loginFields);
  const userCredDataResult = userCredentialsValidator(req);
  if (!userCredFieldResult.allFieldExists) {
    responseHelper.badRequest(res, userCredFieldResult.error[0]);
  } else if (!userCredDataResult.isValid) {
    responseHelper.unprocessable(res, userCredDataResult.errors[0].error);
  } else {
    next();
  }
};

export const validateHomeAddress = (req, res, next) => {
  const addressFieldResult = fieldValidator(req, houseAddress);
  const userAddressDataResult = homeAddressValidator(req);
  if (!addressFieldResult.allFieldExists) {
    responseHelper.badRequest(res, addressFieldResult.error[0]);
  } else if (!userAddressDataResult.isValid) {
    responseHelper.unprocessable(res, userAddressDataResult.errors[0].error);
  } else {
    next();
  }
};

export const validateJob = (req, res, next) => {
  const jobFieldResult = fieldValidator(req, jobFields);
  const userJobDataResult = userJObValidator(req);
  if (!jobFieldResult.allFieldExists) {
    responseHelper.badRequest(res, jobFieldResult.error[0]);
  } else if (!userJobDataResult.isValid) {
    responseHelper.unprocessable(res, userJobDataResult.errors[0].error);
  } else {
    next();
  }
};

export const validateLoan = (req, res, next) => {
  const loanFieldResult = fieldValidator(req, loanFields);
  const loanDataResult = loanValidator(req);
  if (!loanFieldResult.allFieldExists) {
    responseHelper.badRequest(res, loanFieldResult.error[0]);
  } else if (!loanDataResult.isValid) {
    responseHelper.unprocessable(res, loanDataResult.errors[0].error);
  } else {
    next();
  }
};

export const validateLoanStat = (req, res, next) => {
  const loanStatFieldResult = fieldValidator(req, loanStatusFields);
  const loanStatDataResult = validateLoanStatus(req);
  if (!loanStatFieldResult.allFieldExists) {
    responseHelper.badRequest(res, loanStatFieldResult.error[0]);
  } else if (!loanStatDataResult.isValid) {
    responseHelper.unprocessable(res, loanStatDataResult.errors[0].error);
  } else {
    next();
  }
};

export const validateRepayment = (req, res, next) => {
  const repayFieldResult = fieldValidator(req, repaymentFields);
  const repaymentDataResult = validateRepaymentVal(req);
  if (!repayFieldResult.allFieldExists) {
    responseHelper.badRequest(res, repayFieldResult.error[0]);
  } else if (!repaymentDataResult.isValid) {
    responseHelper.unprocessable(res, repaymentDataResult.errors[0].error);
  } else {
    next();
  }
};

export const validateUserIsadminPriv = (req, res, next) => {
  const isadminFieldResult = fieldValidator(req, userIsadminFields);
  const isadminDataResult = validateUserIsAdmin(req);
  if (!isadminFieldResult.allFieldExists) {
    responseHelper.badRequest(res, isadminFieldResult.error[0]);
  } else if (!isadminDataResult.isValid) {
    responseHelper.unprocessable(res, isadminDataResult.errors[0].error);
  } else {
    next();
  }
};
