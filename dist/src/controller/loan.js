"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _data = _interopRequireDefault(require("../data"));

var _calInterest = _interopRequireDefault(require("../helpers/calInterest"));

var _calPaymentInstall = _interopRequireDefault(require("../helpers/calPaymentInstall"));

var _dueDate = _interopRequireDefault(require("../helpers/dueDate"));

var _findLoanByUserEmail = _interopRequireDefault(require("../helpers/findLoanByUserEmail"));

var _getPendingLoans = _interopRequireDefault(require("../helpers/getPendingLoans"));

var _getNotRepaidLoans = _interopRequireDefault(require("../helpers/getNotRepaidLoans"));

var _getFullyRepaidLoans = _interopRequireDefault(require("../helpers/getFullyRepaidLoans"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var counter = 4;

var Loan =
/*#__PURE__*/
function () {
  function Loan() {
    _classCallCheck(this, Loan);
  }

  _createClass(Loan, null, [{
    key: "createLoan",
    value: function () {
      var _createLoan = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var email, _req$body, amount, tenor, repaid, status, interest, monthlyInstall, dueDate, createdOn, balance, userLoan;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                email = req.user.email;
                _req$body = req.body, amount = _req$body.amount, tenor = _req$body.tenor;
                repaid = false;
                status = 'pending';
                _context.next = 6;
                return (0, _calInterest["default"])(amount);

              case 6:
                interest = _context.sent;
                _context.next = 9;
                return (0, _calPaymentInstall["default"])(amount, interest, tenor);

              case 9:
                monthlyInstall = _context.sent;
                _context.next = 12;
                return (0, _dueDate["default"])(tenor);

              case 12:
                dueDate = _context.sent;
                createdOn = new Date();
                balance = amount + interest; // finduserByEmail

                _context.next = 17;
                return (0, _findLoanByUserEmail["default"])(_data["default"].loans, email);

              case 17:
                userLoan = _context.sent;

                if (!userLoan.exist || userLoan.data.repaid === true) {
                  counter += 1;

                  _data["default"].loans.push({
                    id: counter,
                    createdOn: createdOn,
                    user: email,
                    amount: amount,
                    tenor: tenor,
                    status: status,
                    repaid: repaid,
                    interest: interest,
                    monthlyInstallment: monthlyInstall,
                    dueDate: dueDate,
                    balance: balance
                  });

                  res.status(201).json({
                    status: 201,
                    data: {
                      id: counter,
                      createdOn: createdOn,
                      user: email,
                      amount: amount,
                      tenor: tenor,
                      status: status,
                      repaid: repaid,
                      interest: interest,
                      monthlyInstallment: monthlyInstall,
                      balance: balance,
                      dueDate: dueDate
                    }
                  });
                } else if (userLoan.exist && userLoan.data.repaid === false) {
                  res.status(409).json({
                    status: 409,
                    error: 'Previous loan not repaid'
                  });
                }

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createLoan(_x, _x2) {
        return _createLoan.apply(this, arguments);
      }

      return createLoan;
    }()
  }, {
    key: "getAllLoans",
    value: function () {
      var _getAllLoans = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var loans, _req$query, status, repaid, pendingLoans, notRepaidLoans, repaidLoans;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                loans = _toConsumableArray(_data["default"].loans);
                _req$query = req.query, status = _req$query.status, repaid = _req$query.repaid;

                if (status === 'pending') {
                  pendingLoans = (0, _getPendingLoans["default"])(loans);
                  res.status(200).json({
                    status: 200,
                    data: pendingLoans
                  }).end();
                } else if (status === 'approved' && !JSON.parse(repaid)) {
                  notRepaidLoans = (0, _getNotRepaidLoans["default"])(loans);
                  res.status(200).json({
                    status: 200,
                    data: notRepaidLoans
                  }).end();
                } else if (status === 'approved' && JSON.parse(repaid)) {
                  repaidLoans = (0, _getFullyRepaidLoans["default"])(loans);
                  res.status(200).json({
                    status: 200,
                    data: repaidLoans
                  }).end();
                } else {
                  res.status(200).json({
                    status: 200,
                    data: loans
                  }).end();
                }

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getAllLoans(_x3, _x4) {
        return _getAllLoans.apply(this, arguments);
      }

      return getAllLoans;
    }()
  }, {
    key: "modifyLoanStatus",
    value: function () {
      var _modifyLoanStatus = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var status, id, loans, loanIndex, updateLoan;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                status = req.body.status;
                id = req.params.id;
                loans = _toConsumableArray(_data["default"].loans);
                loanIndex = loans.findIndex(function (loan) {
                  return loan.id === +id;
                });

                if (loanIndex !== -1) {
                  updateLoan = _objectSpread({}, _data["default"].loans[loanIndex], {
                    status: status
                  });
                  _data["default"].loans[loanIndex] = updateLoan;
                  res.status(200).json({
                    status: 200,
                    data: _data["default"].loans[loanIndex]
                  }).end();
                } else {
                  res.status(404).json({
                    status: 404,
                    error: 'loan not found'
                  }).end();
                }

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function modifyLoanStatus(_x5, _x6) {
        return _modifyLoanStatus.apply(this, arguments);
      }

      return modifyLoanStatus;
    }()
  }, {
    key: "getLoan",
    value: function () {
      var _getLoan = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var id, loans, loanIndex;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = req.params.id;
                loans = _toConsumableArray(_data["default"].loans);
                loanIndex = loans.findIndex(function (loan) {
                  return loan.id === +id;
                });

                if (loanIndex !== -1) {
                  res.status(200).json({
                    status: 200,
                    data: _data["default"].loans[loanIndex]
                  }).end();
                } else {
                  res.status(404).json({
                    status: 404,
                    error: 'loan not found'
                  }).end();
                }

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function getLoan(_x7, _x8) {
        return _getLoan.apply(this, arguments);
      }

      return getLoan;
    }()
  }]);

  return Loan;
}();

var _default = Loan;
exports["default"] = _default;