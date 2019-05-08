"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.repaymentFields = exports.loanStatusFields = exports.loanFields = exports.jobFields = exports.houseAddress = exports.loginFields = exports.userFields = void 0;
var userFields = ['firstname', 'lastname', 'email', 'phone', 'password', 'cpassword'];
exports.userFields = userFields;
var loginFields = ['email', 'password'];
exports.loginFields = loginFields;
var houseAddress = ['address', 'state'];
exports.houseAddress = houseAddress;
var jobFields = ['monthlyIncome', 'grossIncome', 'years', 'position', 'companyName', 'companySector', 'officeAddress', 'state'];
exports.jobFields = jobFields;
var loanFields = ['amount', 'tenor'];
exports.loanFields = loanFields;
var loanStatusFields = ['status'];
exports.loanStatusFields = loanStatusFields;
var repaymentFields = ['loanId', 'amount'];
exports.repaymentFields = repaymentFields;