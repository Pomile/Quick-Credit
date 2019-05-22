"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _read = _interopRequireDefault(require("./crud/read"));

var _create = _interopRequireDefault(require("./crud/create"));

var _update = _interopRequireDefault(require("./crud/update"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserHelpers =
/*#__PURE__*/
function () {
  function UserHelpers() {
    _classCallCheck(this, UserHelpers);
  }

  _createClass(UserHelpers, null, [{
    key: "findUser",
    value: function () {
      var _findUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(table, field, value) {
        var userResult;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _read["default"])(table, field, value);

              case 2:
                userResult = _context.sent;
                return _context.abrupt("return", userResult);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function findUser(_x, _x2, _x3) {
        return _findUser.apply(this, arguments);
      }

      return findUser;
    }()
  }, {
    key: "findAddress",
    value: function () {
      var _findAddress = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(table, field, value) {
        var addressResult;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _read["default"])(table, field, value);

              case 2:
                addressResult = _context2.sent;
                return _context2.abrupt("return", addressResult);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function findAddress(_x4, _x5, _x6) {
        return _findAddress.apply(this, arguments);
      }

      return findAddress;
    }()
  }, {
    key: "createUser",
    value: function () {
      var _createUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(_ref) {
        var firstname, lastname, email, phone, password, isAdmin, userResult;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                firstname = _ref.firstname, lastname = _ref.lastname, email = _ref.email, phone = _ref.phone, password = _ref.password, isAdmin = _ref.isAdmin;
                _context3.next = 3;
                return (0, _create["default"])('users', {
                  firstname: firstname,
                  lastname: lastname,
                  email: email,
                  phone: phone,
                  password: password,
                  isAdmin: isAdmin
                });

              case 3:
                userResult = _context3.sent;
                return _context3.abrupt("return", userResult);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function createUser(_x7) {
        return _createUser.apply(this, arguments);
      }

      return createUser;
    }()
  }, {
    key: "createAddress",
    value: function () {
      var _createAddress = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(_ref2) {
        var userid, homeAddress, state, address;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                userid = _ref2.userid, homeAddress = _ref2.homeAddress, state = _ref2.state;
                _context4.next = 3;
                return (0, _create["default"])('addresses', {
                  userid: userid,
                  homeAddress: homeAddress,
                  state: state
                });

              case 3:
                address = _context4.sent;
                return _context4.abrupt("return", address);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function createAddress(_x8) {
        return _createAddress.apply(this, arguments);
      }

      return createAddress;
    }()
  }, {
    key: "createJob",
    value: function () {
      var _createJob = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(_ref3) {
        var officeAddress, monthlyIncome, grossIncome, companyName, companySector, position, years, userid, state, job;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                officeAddress = _ref3.officeAddress, monthlyIncome = _ref3.monthlyIncome, grossIncome = _ref3.grossIncome, companyName = _ref3.companyName, companySector = _ref3.companySector, position = _ref3.position, years = _ref3.years, userid = _ref3.userid, state = _ref3.state;
                _context5.next = 3;
                return (0, _create["default"])('jobs', {
                  officeAddress: officeAddress,
                  monthlyIncome: monthlyIncome,
                  grossIncome: grossIncome,
                  companyName: companyName,
                  companySector: companySector,
                  position: position,
                  years: years,
                  userid: userid,
                  state: state
                });

              case 3:
                job = _context5.sent;
                return _context5.abrupt("return", job);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function createJob(_x9) {
        return _createJob.apply(this, arguments);
      }

      return createJob;
    }()
  }, {
    key: "updateUserStatus",
    value: function () {
      var _updateUserStatus = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(_ref4, _ref5) {
        var status, email, userStatus;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                status = _ref4.status;
                email = _ref5.email;
                _context6.next = 4;
                return (0, _update["default"])('users', {
                  status: status
                }, {
                  email: email
                });

              case 4:
                userStatus = _context6.sent;
                return _context6.abrupt("return", userStatus);

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function updateUserStatus(_x10, _x11) {
        return _updateUserStatus.apply(this, arguments);
      }

      return updateUserStatus;
    }()
  }]);

  return UserHelpers;
}();

var _default = UserHelpers;
exports["default"] = _default;