"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateRepayment = exports.validateLoanStat = exports.validateLoan = exports.validateJob = exports.validateHomeAddress = exports.validateCredentials = exports.validateUser = void 0;

var _fieldValidator = _interopRequireDefault(require("./validation/fieldValidator"));

var _userDataValidator = _interopRequireDefault(require("./validation/userDataValidator"));

var _userCredentialsValidator = _interopRequireDefault(require("./validation/userCredentialsValidator"));

var _userJobDataValidator = _interopRequireDefault(require("./validation/userJobDataValidator"));

var _homeAddressValidator = _interopRequireDefault(require("./validation/homeAddressValidator"));

var _laonValidator = _interopRequireDefault(require("./validation/laonValidator"));

var _fields = require("./validation/fields");

var _loanStatusValidator = _interopRequireDefault(require("./validation/loanStatusValidator"));

var _repaymentDataValidator = _interopRequireDefault(require("./validation/repaymentDataValidator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var validateUser = function validateUser(req, res, next) {
  var fieldResult = (0, _fieldValidator["default"])(req, _fields.userFields);
  var userDataResult = (0, _userDataValidator["default"])(req);

  if (!fieldResult.allFieldExists) {
    res.status(400).json({
      status: 400,
      error: fieldResult.error[0]
    }).end();
  } else if (!userDataResult.isValid) {
    res.status(422).json({
      status: 422,
      error: userDataResult.errors[0].error
    }).end();
  } else {
    next();
  }
};

exports.validateUser = validateUser;

var validateCredentials = function validateCredentials(req, res, next) {
  var userCredFieldResult = (0, _fieldValidator["default"])(req, _fields.loginFields);
  var userCredDataResult = (0, _userCredentialsValidator["default"])(req);

  if (!userCredFieldResult.allFieldExists) {
    res.status(400).json({
      error: userCredFieldResult.error[0]
    }).end();
  } else if (!userCredDataResult.isValid) {
    res.status(422).json({
      error: userCredDataResult.errors[0].error
    }).end();
  } else {
    next();
  }
};

exports.validateCredentials = validateCredentials;

var validateHomeAddress = function validateHomeAddress(req, res, next) {
  var addressFieldResult = (0, _fieldValidator["default"])(req, _fields.houseAddress);
  var userAddressDataResult = (0, _homeAddressValidator["default"])(req);

  if (!addressFieldResult.allFieldExists) {
    res.status(400).json({
      error: addressFieldResult.error[0]
    }).end();
  } else if (!userAddressDataResult.isValid) {
    res.status(422).json({
      error: userAddressDataResult.errors[0].error
    }).end();
  } else {
    next();
  }
};

exports.validateHomeAddress = validateHomeAddress;

var validateJob = function validateJob(req, res, next) {
  var jobFieldResult = (0, _fieldValidator["default"])(req, _fields.jobFields);
  var userJobDataResult = (0, _userJobDataValidator["default"])(req);

  if (!jobFieldResult.allFieldExists) {
    res.status(400).json({
      error: jobFieldResult.error[0]
    }).end();
  } else if (!userJobDataResult.isValid) {
    res.status(422).json({
      error: userJobDataResult.errors[0].error
    }).end();
  } else {
    next();
  }
};

exports.validateJob = validateJob;

var validateLoan = function validateLoan(req, res, next) {
  var loanFieldResult = (0, _fieldValidator["default"])(req, _fields.loanFields);
  var loanDataResult = (0, _laonValidator["default"])(req);

  if (!loanFieldResult.allFieldExists) {
    res.status(400).json({
      error: loanFieldResult.error[0]
    }).end();
  } else if (!loanDataResult.isValid) {
    res.status(422).json({
      error: loanDataResult.errors[0].error
    }).end();
  } else {
    next();
  }
};

exports.validateLoan = validateLoan;

var validateLoanStat = function validateLoanStat(req, res, next) {
  var loanStatFieldResult = (0, _fieldValidator["default"])(req, _fields.loanStatusFields);
  var loanStatDataResult = (0, _loanStatusValidator["default"])(req);

  if (!loanStatFieldResult.allFieldExists) {
    res.status(400).json({
      error: loanStatFieldResult.error[0]
    }).end();
  } else if (!loanStatDataResult.isValid) {
    res.status(422).json({
      error: loanStatDataResult.errors[0].error
    }).end();
  } else {
    next();
  }
};

exports.validateLoanStat = validateLoanStat;

var validateRepayment = function validateRepayment(req, res, next) {
  var repayFieldResult = (0, _fieldValidator["default"])(req, _fields.repaymentFields);
  var repaymentDataResult = (0, _repaymentDataValidator["default"])(req);

  if (!repayFieldResult.allFieldExists) {
    res.status(400).json({
      error: repayFieldResult.error[0]
    }).end();
  } else if (!repaymentDataResult.isValid) {
    res.status(422).json({
      error: repaymentDataResult.errors[0].error
    }).end();
  } else {
    next();
  }
};

exports.validateRepayment = validateRepayment;