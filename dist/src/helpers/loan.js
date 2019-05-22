"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _read = _interopRequireDefault(require("./crud/read"));

var _create = _interopRequireDefault(require("./crud/create"));

var _update = _interopRequireDefault(require("./crud/update"));

var _readAll = _interopRequireDefault(require("./crud/readAll"));

var _readRecs = _interopRequireDefault(require("./crud/readRecs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LoanHelpers =
/*#__PURE__*/
function () {
  function LoanHelpers() {
    _classCallCheck(this, LoanHelpers);
  }

  _createClass(LoanHelpers, null, [{
    key: "calculateInterestRate",
    value: function calculateInterestRate(amount) {
      return amount * 0.05;
    }
  }, {
    key: "calculateBalance",
    value: function calculateBalance(balance, amountPaid) {
      return balance - amountPaid;
    }
  }, {
    key: "findDueDate",
    value: function findDueDate(noOfMonths) {
      var date = new Date();
      var newDate = new Date(date.setMonth(date.getMonth() + noOfMonths));
      return newDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        time: 'numeric'
      });
    }
  }, {
    key: "calulateMonthlyInstall",
    value: function calulateMonthlyInstall(amount, interest, tenor) {
      return (amount + interest) / tenor;
    }
  }, {
    key: "findLoan",
    value: function () {
      var _findLoan = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(table, field, value) {
        var loan;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _read["default"])(table, field, value);

              case 2:
                loan = _context.sent;
                return _context.abrupt("return", loan);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function findLoan(_x, _x2, _x3) {
        return _findLoan.apply(this, arguments);
      }

      return findLoan;
    }()
  }, {
    key: "createLoan",
    value: function () {
      var _createLoan = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(_ref) {
        var client, amount, tenor, interest, monthlyinstallment, duedate, balance, newLoan;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                client = _ref.client, amount = _ref.amount, tenor = _ref.tenor, interest = _ref.interest, monthlyinstallment = _ref.monthlyinstallment, duedate = _ref.duedate, balance = _ref.balance;
                _context2.next = 3;
                return (0, _create["default"])('loans', {
                  client: client,
                  amount: amount,
                  tenor: tenor,
                  interest: interest,
                  monthlyinstallment: monthlyinstallment,
                  duedate: duedate,
                  balance: balance
                });

              case 3:
                newLoan = _context2.sent;
                return _context2.abrupt("return", newLoan);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function createLoan(_x4) {
        return _createLoan.apply(this, arguments);
      }

      return createLoan;
    }()
  }, {
    key: "updateLoanStatus",
    value: function () {
      var _updateLoanStatus = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(_ref2, _ref3) {
        var status, id, updateStatus;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                status = _ref2.status;
                id = _ref3.id;
                _context3.next = 4;
                return (0, _update["default"])('loans', {
                  status: status
                }, {
                  id: id
                });

              case 4:
                updateStatus = _context3.sent;
                return _context3.abrupt("return", updateStatus);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function updateLoanStatus(_x5, _x6) {
        return _updateLoanStatus.apply(this, arguments);
      }

      return updateLoanStatus;
    }()
  }, {
    key: "getAllLoans",
    value: function () {
      var _getAllLoans = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var getLoans;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return (0, _readAll["default"])('loans');

              case 2:
                getLoans = _context4.sent;
                return _context4.abrupt("return", getLoans);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function getAllLoans() {
        return _getAllLoans.apply(this, arguments);
      }

      return getAllLoans;
    }()
  }, {
    key: "getNotRepaidLoans",
    value: function () {
      var _getNotRepaidLoans = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(_ref4) {
        var status, repaid, notFullyRepaidLoans;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                status = _ref4.status, repaid = _ref4.repaid;
                _context5.next = 3;
                return (0, _readRecs["default"])('loans', {
                  status: status,
                  repaid: repaid
                });

              case 3:
                notFullyRepaidLoans = _context5.sent;
                return _context5.abrupt("return", notFullyRepaidLoans);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function getNotRepaidLoans(_x7) {
        return _getNotRepaidLoans.apply(this, arguments);
      }

      return getNotRepaidLoans;
    }()
  }, {
    key: "getPendingLoans",
    value: function () {
      var _getPendingLoans = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(_ref5) {
        var status, repaid, approvedLoans;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                status = _ref5.status, repaid = _ref5.repaid;
                _context6.next = 3;
                return (0, _readRecs["default"])('loans', {
                  status: status,
                  repaid: repaid
                });

              case 3:
                approvedLoans = _context6.sent;
                return _context6.abrupt("return", approvedLoans);

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function getPendingLoans(_x8) {
        return _getPendingLoans.apply(this, arguments);
      }

      return getPendingLoans;
    }()
  }, {
    key: "getRepaidLoans",
    value: function () {
      var _getRepaidLoans = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(_ref6) {
        var status, repaid, fullyRepaidLoans;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                status = _ref6.status, repaid = _ref6.repaid;
                _context7.next = 3;
                return (0, _readRecs["default"])('loans', {
                  status: status,
                  repaid: repaid
                });

              case 3:
                fullyRepaidLoans = _context7.sent;
                return _context7.abrupt("return", fullyRepaidLoans);

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function getRepaidLoans(_x9) {
        return _getRepaidLoans.apply(this, arguments);
      }

      return getRepaidLoans;
    }()
  }]);

  return LoanHelpers;
}();

var _default = LoanHelpers;
exports["default"] = _default;