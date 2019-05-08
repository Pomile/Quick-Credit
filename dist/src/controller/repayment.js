"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _data = _interopRequireDefault(require("../data"));

var _calbalance = _interopRequireDefault(require("../helpers/calbalance"));

var _getLoanRepaymentHistory = _interopRequireDefault(require("../helpers/getLoanRepaymentHistory"));

var _getLoansByEmail = _interopRequireDefault(require("../helpers/getLoansByEmail"));

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

var counter = 0;

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
        var amount, email, id, createdOn, loans, loanIndex, loan, balance, loanUpdate;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                amount = req.body.amount;
                email = req.user.email;
                id = req.params.id;
                createdOn = new Date();
                loans = _toConsumableArray(_data["default"].loans); // copy data.loans

                loanIndex = loans.findIndex(function (item) {
                  return item.id === +id;
                }); // find loan

                if (loanIndex !== -1) {
                  loan = loans[loanIndex];
                  if (loan.balance === 0) loan.repaid = true;

                  if (loan.repaid === false && loan.status === 'approved') {
                    // determine if loan repayment is complete
                    balance = (0, _calbalance["default"])(loan.balance, amount);
                    loanUpdate = _objectSpread({}, loan, {
                      balance: balance
                    });
                    _data["default"].loans[loanIndex] = loanUpdate; // update loan balance

                    counter += 1;

                    _data["default"].repayments.push({
                      id: counter,
                      loanId: +id,
                      amount: amount,
                      collector: email,
                      createdOn: createdOn
                    }); // create repayment


                    res.status(201).json({
                      status: 201,
                      data: {
                        id: counter,
                        loanId: +id,
                        amount: amount,
                        collector: email,
                        createdOn: createdOn,
                        balance: balance
                      }
                    }).end();
                  } else if (['pending', 'rejected'].includes(loan.status)) {
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
                } else {
                  res.status(404).json({
                    status: 404,
                    error: 'loan not found'
                  }).end();
                }

              case 7:
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
      var _getRepaymentHistory2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var id, email, userLoan, repaymentHistory;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = req.params.id;
                email = req.user.email;
                userLoan = (0, _getLoansByEmail["default"])(_data["default"].loans, id, email);

                if (userLoan.myLoan) {
                  repaymentHistory = (0, _getLoanRepaymentHistory["default"])(_data["default"].repayments, +id, 'loanId');
                  repaymentHistory.status = 200;
                  res.status(200).json(repaymentHistory);
                } else if (!userLoan.myLoan) {
                  res.status(403).json({
                    status: 403,
                    error: 'access denied'
                  });
                }

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getRepaymentHistory(_x3, _x4) {
        return _getRepaymentHistory2.apply(this, arguments);
      }

      return getRepaymentHistory;
    }()
  }]);

  return Repayment;
}();

var _default = Repayment;
exports["default"] = _default;