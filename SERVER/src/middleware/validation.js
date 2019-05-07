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
  const fieldResult = fieldValidator(req, loginFields);
  const userDataResult = userCredentialsValidator(req);
  if (!fieldResult.allFieldExists) {
    res.status(400).json({ error: fieldResult.error[0] }).end();
  } else if (!userDataResult.isValid) {
    res.status(422).json({ error: userDataResult.errors[0].error }).end();
  } else {
    next();
  }
};

export const validateHomeAddress = (req, res, next) => {
  const fieldResult = fieldValidator(req, houseAddress);
  const userDataResult = homeAddressValidator(req);
  if (!fieldResult.allFieldExists) {
    res.status(400).json({ error: fieldResult.error[0] }).end();
  } else if (!userDataResult.isValid) {
    res.status(422).json({ error: userDataResult.errors[0].error }).end();
  } else {
    next();
  }
};

export const validateJob = (req, res, next) => {
  const fieldResult = fieldValidator(req, jobFields);
  const userDataResult = userJObValidator(req);
  if (!fieldResult.allFieldExists) {
    res.status(400).json({ error: fieldResult.error[0] }).end();
  } else if (!userDataResult.isValid) {
    res.status(422).json({ error: userDataResult.errors[0].error }).end();
  } else {
    next();
  }
};

export const validateLoan = (req, res, next) => {
  const fieldResult = fieldValidator(req, loanFields);
  const loanDataResult = loanValidator(req);
  if (!fieldResult.allFieldExists) {
    res.status(400).json({ error: fieldResult.error[0] }).end();
  } else if (!loanDataResult.isValid) {
    res.status(422).json({ error: loanDataResult.errors[0].error }).end();
  } else {
    next();
  }
};

export const validateLoanStat = (req, res, next) => {
  const fieldResult = fieldValidator(req, loanStatusFields);
  const loanDataResult = validateLoanStatus(req);
  if (!fieldResult.allFieldExists) {
    res.status(400).json({ error: fieldResult.error[0] }).end();
  } else if (!loanDataResult.isValid) {
    res.status(422).json({ error: loanDataResult.errors[0].error }).end();
  } else {
    next();
  }
};

export const validateRepayment = (req, res, next) => {
  const fieldResult = fieldValidator(req, repaymentFields);
  const repaymentDataResult = validateRepaymentVal(req);
  if (!fieldResult.allFieldExists) {
    res.status(400).json({ error: fieldResult.error[0] }).end();
  } else if (!repaymentDataResult.isValid) {
    res.status(422).json({ error: repaymentDataResult.errors[0].error }).end();
  } else {
    next();
  }
};
