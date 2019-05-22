"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _data = _interopRequireDefault(require("../seeder/data/data"));

var _loan = _interopRequireDefault(require("../helpers/loan"));

var _repayment = _interopRequireDefault(require("../helpers/repayment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Repayment =
/*#__PURE__*/
function () {
  function Repayment() {
    _classCallCheck(this, Repayment);
  }

  _createClass(Repayment, null, [{
    key: "postRepayment",
    value: function () {
      var _postRepayment = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var amount, email, id, loan, balance, loanUpdate, repay;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                amount = req.body.amount;
                email = req.user.email;
                id = req.params.id;
                _context.next = 5;
                return _loan["default"].findLoan('loans', 'id', +id);

              case 5:
                loan = _context.sent;

                if (!loan.exist) {
                  _context.next = 22;
                  break;
                }

                if (!(loan.data.repaid === false && loan.data.status === 'approved')) {
                  _context.next = 19;
                  break;
                }

                balance = _loan["default"].calculateBalance(loan.data.balance, amount);
                if (balance === 0) loan.data.repaid = true;
                _context.next = 12;
                return _repayment["default"].updateLoanBalance({
                  balance: balance,
                  repaid: loan.data.repaid
                }, {
                  id: id
                });

              case 12:
                loanUpdate = _context.sent;
                _context.next = 15;
                return _repayment["default"].postRepayment({
                  loanId: id,
                  collector: email,
                  amount: amount,
                  balance: loanUpdate.data.balance
                });

              case 15:
                repay = _context.sent;
                res.status(201).json({
                  status: 201,
                  data: repay.data
                }).end();
                _context.next = 20;
                break;

              case 19:
                if (['pending', 'rejected'].includes(loan.data.status)) {
                  res.status(409).json({
                    status: 409,
                    error: 'Loan is not approved'
                  }).end();
                } else {
                  res.status(409).json({
                    status: 409,
                    error: 'Repayment error.Loan repayment is balanced'
                  }).end();
                }

              case 20:
                _context.next = 23;
                break;

              case 22:
                res.status(404).json({
                  status: 404,
                  error: 'loan not found'
                }).end();

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function postRepayment(_x, _x2) {
        return _postRepayment.apply(this, arguments);
      }

      return postRepayment;
    }()
  }, {
    key: "getRepaymentHistory",
    value: function () {
      var _getRepaymentHistory = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var id, _req$user, email, isadmin, userLoan, repaymentHistory;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = req.params.id;
                _req$user = req.user, email = _req$user.email, isadmin = _req$user.isadmin;
                _context2.next = 4;
                return _loan["default"].findLoan('loans', 'id', id);

              case 4:
                userLoan = _context2.sent;

                if (!(userLoan.exist && userLoan.data.client === email || isadmin)) {
                  _context2.next = 12;
                  break;
                }

                _context2.next = 8;
                return _repayment["default"].getAloanRepaymentHistory('loanId', +id);

              case 8:
                repaymentHistory = _context2.sent;
                res.status(200).json({
                  status: 200,
                  data: repaymentHistory.allData
                });
                _context2.next = 13;
                break;

              case 12:
                res.status(404).json({
                  status: 404,
                  error: 'Loan Not Found'
                });

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getRepaymentHistory(_x3, _x4) {
        return _getRepaymentHistory.apply(this, arguments);
      }

      return getRepaymentHistory;
    }()
  }]);

  return Repayment;
}();

var _default = Repayment;
exports["default"] = _default;