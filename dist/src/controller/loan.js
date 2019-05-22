"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _data = _interopRequireDefault(require("../seeder/data/data"));

var _loan = _interopRequireDefault(require("../helpers/loan"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
        var email, _req$body, amount, tenor, interest, monthlyinstall, duedate, balance, userLoan, newLoan;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                email = req.user.email;
                _req$body = req.body, amount = _req$body.amount, tenor = _req$body.tenor;
                interest = _loan["default"].calculateInterestRate(amount);
                monthlyinstall = _loan["default"].calulateMonthlyInstall(amount, interest, tenor);
                duedate = _loan["default"].findDueDate(tenor);
                balance = amount + interest; // finduserByEmail

                _context.next = 8;
                return _loan["default"].findLoan('loans', 'client', email);

              case 8:
                userLoan = _context.sent;

                if (!(!userLoan.exist || userLoan.data.repaid === true)) {
                  _context.next = 16;
                  break;
                }

                _context.next = 12;
                return _loan["default"].createLoan({
                  client: email,
                  amount: amount,
                  tenor: tenor,
                  interest: interest,
                  monthlyinstallment: monthlyinstall,
                  duedate: duedate,
                  balance: balance
                });

              case 12:
                newLoan = _context.sent;
                res.status(201).json({
                  status: 201,
                  data: _objectSpread({}, newLoan.data, {
                    amount: amount,
                    interest: interest,
                    monthlyinstallment: monthlyinstall,
                    balance: balance
                  })
                });
                _context.next = 17;
                break;

              case 16:
                if (userLoan.exist && userLoan.data.repaid === false) {
                  res.status(409).json({
                    status: 409,
                    error: 'Previous loan not repaid'
                  });
                }

              case 17:
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
        var _req$query, status, repaid, pendingLoans, notRepaidLoans, repaidLoans, allLoans;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$query = req.query, status = _req$query.status, repaid = _req$query.repaid;

                if (!(status === 'pending')) {
                  _context2.next = 8;
                  break;
                }

                _context2.next = 4;
                return _loan["default"].getPendingLoans({
                  status: status,
                  repaid: repaid
                });

              case 4:
                pendingLoans = _context2.sent;
                res.status(200).json({
                  status: 200,
                  data: pendingLoans.data
                }).end();
                _context2.next = 26;
                break;

              case 8:
                if (!(status === 'approved' && !JSON.parse(repaid))) {
                  _context2.next = 15;
                  break;
                }

                _context2.next = 11;
                return _loan["default"].getNotRepaidLoans({
                  status: status,
                  repaid: repaid
                });

              case 11:
                notRepaidLoans = _context2.sent;
                res.status(200).json({
                  status: 200,
                  data: notRepaidLoans.data
                }).end();
                _context2.next = 26;
                break;

              case 15:
                if (!(status === 'approved' && JSON.parse(repaid))) {
                  _context2.next = 22;
                  break;
                }

                _context2.next = 18;
                return _loan["default"].getRepaidLoans({
                  status: status,
                  repaid: repaid
                });

              case 18:
                repaidLoans = _context2.sent;
                res.status(200).json({
                  status: 200,
                  data: repaidLoans.data
                }).end();
                _context2.next = 26;
                break;

              case 22:
                _context2.next = 24;
                return _loan["default"].getAllLoans();

              case 24:
                allLoans = _context2.sent;
                res.status(200).json({
                  status: 200,
                  data: allLoans.data
                }).end();

              case 26:
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
        var status, id, findLoan, loan;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                status = req.body.status;
                id = req.params.id;
                _context3.next = 4;
                return _loan["default"].findLoan('loans', 'id', id);

              case 4:
                findLoan = _context3.sent;

                if (!findLoan.exist) {
                  _context3.next = 12;
                  break;
                }

                _context3.next = 8;
                return _loan["default"].updateLoanStatus({
                  status: status
                }, {
                  id: id
                });

              case 8:
                loan = _context3.sent;
                res.status(200).json({
                  status: 200,
                  data: loan.data
                }).end();
                _context3.next = 13;
                break;

              case 12:
                res.status(404).json({
                  status: 404,
                  error: 'loan not found'
                }).end();

              case 13:
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
        var id, loan;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = req.params.id;
                _context4.next = 3;
                return _loan["default"].findLoan('loans', 'id', id);

              case 3:
                loan = _context4.sent;

                if (loan.exist) {
                  res.status(200).json({
                    status: 200,
                    data: loan.data
                  }).end();
                } else {
                  res.status(404).json({
                    status: 404,
                    error: 'loan not found'
                  }).end();
                }

              case 5:
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