"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _validation = require("../middleware/validation");

var _encryption = _interopRequireDefault(require("../middleware/encryption"));

var _verification = _interopRequireDefault(require("../middleware/verification"));

var _user = _interopRequireDefault(require("../controller/user"));

var _loan = _interopRequireDefault(require("../controller/loan"));

var _userEmailValidator = _interopRequireDefault(require("../middleware/validation/userEmailValidator"));

var _permission = _interopRequireDefault(require("../middleware/permission"));

var _idValidator = _interopRequireDefault(require("../middleware/validation/idValidator"));

var _repayment = _interopRequireDefault(require("../controller/repayment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routes = _express["default"].Router();

routes.post('/auth/signup', _validation.validateUser, _encryption["default"], _user["default"].createAccount);
routes.post('/auth/signin', _validation.validateCredentials, _user["default"].authenticate);
routes.post('/users/:id/address', _verification["default"], _idValidator["default"], _validation.validateHomeAddress, _user["default"].createUserHomeAddress);
routes.post('/users/:id/job', _verification["default"], _idValidator["default"], _validation.validateJob, _user["default"].createUserJob);
routes.post('/loans', _verification["default"], _validation.validateLoan, _loan["default"].createLoan);
routes.patch('/users/:email/verify', _verification["default"], _permission["default"], _userEmailValidator["default"], _user["default"].verifyUser);
routes.get('/loans', _verification["default"], _permission["default"], _loan["default"].getAllLoans);
routes.patch('/loans/:id', _verification["default"], _permission["default"], _validation.validateLoanStat, _idValidator["default"], _loan["default"].modifyLoanStatus);
routes.get('/loans/:id', _verification["default"], _permission["default"], _idValidator["default"], _loan["default"].getLoan);
routes.post('/loans/:id/repayment', _verification["default"], _permission["default"], _idValidator["default"], _validation.validateRepayment, _repayment["default"].postRepayment);
routes.get('/loans/:id/repayment', _verification["default"], _idValidator["default"], _repayment["default"].getRepaymentHistory);
var _default = routes;
exports["default"] = _default;