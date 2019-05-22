"use strict";

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _data = _interopRequireDefault(require("./data/data"));

var _user = _interopRequireDefault(require("../helpers/user"));

var _loan = _interopRequireDefault(require("../helpers/loan"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var salt = 10;

var encryptPassword = function encryptPassword(password) {
  var pass = _bcrypt["default"].hashSync(password, salt, function (err, hash) {
    if (!err) {
      return hash;
    }

    return null;
  });

  return pass;
};

var seeder =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(datap) {
    var users;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            users = datap.users;
            _context2.next = 3;
            return users.forEach(
            /*#__PURE__*/
            function () {
              var _ref2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee(user, i, arr) {
                var passwrd, firstname, lastname, email, phone, isAdmin;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return encryptPassword(user.password);

                      case 2:
                        passwrd = _context.sent;

                        if (i === 0) {
                          console.log('Start populating user data....');
                        }

                        if (!(user.id === i + 1)) {
                          _context.next = 8;
                          break;
                        }

                        firstname = user.firstname, lastname = user.lastname, email = user.email, phone = user.phone, isAdmin = user.isAdmin;
                        _context.next = 8;
                        return _user["default"].createUser({
                          firstname: firstname,
                          lastname: lastname,
                          email: email,
                          phone: phone,
                          password: passwrd,
                          isAdmin: isAdmin
                        });

                      case 8:
                        if (i + 1 === arr.length) {
                          console.log('....done');
                        }

                      case 9:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x2, _x3, _x4) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function seeder(_x) {
    return _ref.apply(this, arguments);
  };
}();

var seeder2 =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(datap) {
    var loans;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            loans = datap.loans;
            _context4.next = 3;
            return loans.forEach(
            /*#__PURE__*/
            function () {
              var _ref4 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee3(loan, i, arr) {
                var client, amount, tenor, interest, monthlyinstallment, duedate, balance, createon;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        if (i === 0) {
                          console.log('\n Start populating loan data....');
                        }

                        client = loan.client, amount = loan.amount, tenor = loan.tenor, interest = loan.interest, monthlyinstallment = loan.monthlyinstallment, duedate = loan.duedate, balance = loan.balance, createon = loan.createon;
                        _context3.next = 4;
                        return _loan["default"].createLoan({
                          client: client,
                          createon: createon,
                          amount: amount,
                          tenor: tenor,
                          status: loan.status,
                          repaid: loan.repaid,
                          interest: interest,
                          monthlyinstallment: monthlyinstallment,
                          duedate: duedate,
                          balance: balance
                        });

                      case 4:
                        if (i + 1 === arr.length) {
                          console.log('....done');
                        }

                      case 5:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x6, _x7, _x8) {
                return _ref4.apply(this, arguments);
              };
            }());

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function seeder2(_x5) {
    return _ref3.apply(this, arguments);
  };
}();

var seedall =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6() {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return seeder(_data["default"]);

          case 2:
            _context6.next = 4;
            return setTimeout(
            /*#__PURE__*/
            _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee5() {
              return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      _context5.next = 2;
                      return seeder2(_data["default"]);

                    case 2:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee5);
            })), 2000);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function seedall() {
    return _ref5.apply(this, arguments);
  };
}();

seedall();