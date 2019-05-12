import fieldValidator from './validation/fieldValidator';
import userDataValidator from './validation/userDataValidator';
import userCredentialsValidator from './validation/userCredentialsValidator';
import userJObValidator from './validation/userJobDataValidator';
import homeAddressValidator from './validation/homeAddressValidator';
import loanValidator from './validation/laonValidator';
import {
  userFields, loginFields, houseAddress, jobFields, loanFields, loanStatusFields, repaymentFields,
} from './validation/fields';
import validateLoanStatus from './validation/loanStatusValidator';
import validateRepaymentVal from './validation/repaymentDataValidator';

export const validateUser = (req, res, next) => {
  const fieldResult = fieldValidator(req, userFields);
  const userDataResult = userDataValidator(req);
  if (!fieldResult.allFieldExists) {
    res.status(400).json({ status: 400, error: fieldResult.error[0] }).end();
  } else if (!userDataResult.isValid) {
    res.status(422).json({ status: 422, error: userDataResult.errors[0].error }).end();
  } else {
    next();
  }
};

export const validateCredentials = (req, res, next) => {
  const userCredFieldResult = fieldValidator(req, loginFields);
  const userCredDataResult = userCredentialsValidator(req);
  if (!userCredFieldResult.allFieldExists) {
    res.status(400).json({ error: userCredFieldResult.error[0] }).end();
  } else if (!userCredDataResult.isValid) {
    res.status(422).json({ error: userCredDataResult.errors[0].error }).end();
  } else {
    next();
  }
};

export const validateHomeAddress = (req, res, next) => {
  const addressFieldResult = fieldValidator(req, houseAddress);
  const userAddressDataResult = homeAddressValidator(req);
  if (!addressFieldResult.allFieldExists) {
    res.status(400).json({ error: addressFieldResult.error[0] }).end();
  } else if (!userAddressDataResult.isValid) {
    res.status(422).json({ error: userAddressDataResult.errors[0].error }).end();
  } else {
    next();
  }
};

export const validateJob = (req, res, next) => {
  const jobFieldResult = fieldValidator(req, jobFields);
  const userJobDataResult = userJObValidator(req);
  if (!jobFieldResult.allFieldExists) {
    res.status(400).json({ error: jobFieldResult.error[0] }).end();
  } else if (!userJobDataResult.isValid) {
    res.status(422).json({ error: userJobDataResult.errors[0].error }).end();
  } else {
    next();
  }
};

export const validateLoan = (req, res, next) => {
  const loanFieldResult = fieldValidator(req, loanFields);
  const loanDataResult = loanValidator(req);
  if (!loanFieldResult.allFieldExists) {
    res.status(400).json({ error: loanFieldResult.error[0] }).end();
  } else if (!loanDataResult.isValid) {
    res.status(422).json({ error: loanDataResult.errors[0].error }).end();
  } else {
    next();
  }
};

export const validateLoanStat = (req, res, next) => {
  const loanStatFieldResult = fieldValidator(req, loanStatusFields);
  const loanStatDataResult = validateLoanStatus(req);
  if (!loanStatFieldResult.allFieldExists) {
    res.status(400).json({ error: loanStatFieldResult.error[0] }).end();
  } else if (!loanStatDataResult.isValid) {
    res.status(422).json({ error: loanStatDataResult.errors[0].error }).end();
  } else {
    next();
  }
};

export const validateRepayment = (req, res, next) => {
  const repayFieldResult = fieldValidator(req, repaymentFields);
  const repaymentDataResult = validateRepaymentVal(req);
  if (!repayFieldResult.allFieldExists) {
    res.status(400).json({ error: repayFieldResult.error[0] }).end();
  } else if (!repaymentDataResult.isValid) {
    res.status(422).json({ error: repaymentDataResult.errors[0].error }).end();
  } else {
    next();
  }
};
