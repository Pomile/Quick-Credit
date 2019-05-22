"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _update = _interopRequireDefault(require("./crud/update"));

var _create = _interopRequireDefault(require("./crud/create"));

var _read = _interopRequireDefault(require("./crud/read"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RepaymentHelpers =
/*#__PURE__*/
function () {
  function RepaymentHelpers() {
    _classCallCheck(this, RepaymentHelpers);
  }

  _createClass(RepaymentHelpers, null, [{
    key: "postRepayment",
    value: function () {
      var _postRepayment = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref) {
        var loanId, collector, amount, balance, repay;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                loanId = _ref.loanId, collector = _ref.collector, amount = _ref.amount, balance = _ref.balance;
                _context.next = 3;
                return (0, _create["default"])('repayments', {
                  loanId: loanId,
                  collector: collector,
                  amount: amount,
                  balance: balance
                });

              case 3:
                repay = _context.sent;
                return _context.abrupt("return", repay);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function postRepayment(_x) {
        return _postRepayment.apply(this, arguments);
      }

      return postRepayment;
    }()
  }, {
    key: "updateLoanBalance",
    value: function () {
      var _updateLoanBalance = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(_ref2, _ref3) {
        var balance, repaid, id, updateBalance;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                balance = _ref2.balance, repaid = _ref2.repaid;
                id = _ref3.id;
                _context2.next = 4;
                return (0, _update["default"])('loans', {
                  balance: balance,
                  repaid: repaid
                }, {
                  id: id
                });

              case 4:
                updateBalance = _context2.sent;
                return _context2.abrupt("return", updateBalance);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function updateLoanBalance(_x2, _x3) {
        return _updateLoanBalance.apply(this, arguments);
      }

      return updateLoanBalance;
    }()
  }, {
    key: "getAloanRepaymentHistory",
    value: function () {
      var _getAloanRepaymentHistory = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(field, id) {
        var getRepaymentHistory;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _read["default"])('repayments', field, id);

              case 2:
                getRepaymentHistory = _context3.sent;
                return _context3.abrupt("return", getRepaymentHistory);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getAloanRepaymentHistory(_x4, _x5) {
        return _getAloanRepaymentHistory.apply(this, arguments);
      }

      return getAloanRepaymentHistory;
    }()
  }]);

  return RepaymentHelpers;
}();

var _default = RepaymentHelpers;
exports["default"] = _default;