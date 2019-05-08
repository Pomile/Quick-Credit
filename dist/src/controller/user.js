"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

require("@babel/polyfill");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _findUser = _interopRequireDefault(require("../helpers/findUser"));

var _findUserByEmail = _interopRequireDefault(require("../helpers/findUserByEmail"));

var _findUserById = _interopRequireDefault(require("../helpers/findUserById"));

var _data = _interopRequireDefault(require("../data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var counter = 0;
var homeAddressCounter = 0;
var jobCounter = 0;

var User =
/*#__PURE__*/
function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: "createAccount",
    value: function () {
      var _createAccount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var status, token, _req$body, firstname, lastname, email, phone, password, isAdmin, user;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                status = 'unverified';
                _req$body = req.body, firstname = _req$body.firstname, lastname = _req$body.lastname, email = _req$body.email, phone = _req$body.phone, password = _req$body.password, isAdmin = _req$body.isAdmin;
                _context.next = 4;
                return (0, _findUser["default"])(_data["default"].users, email, 'email');

              case 4:
                user = _context.sent;

                if (user.exist) {
                  res.status(409).json({
                    error: 'user already exists'
                  }).end();
                } else {
                  counter += 1;
                  token = _jsonwebtoken["default"].sign({
                    data: counter
                  }, 'landxxxofxxxopportunity', {
                    expiresIn: '24h'
                  });

                  _data["default"].users.push({
                    id: counter,
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    phone: phone,
                    password: password,
                    status: status,
                    isAdmin: isAdmin
                  });

                  res.status(201).json({
                    status: 201,
                    data: {
                      token: token,
                      id: counter,
                      firstname: firstname,
                      lastname: lastname,
                      email: email,
                      phone: phone,
                      password: password,
                      status: status,
                      isAdmin: isAdmin
                    }
                  }).end();
                }

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createAccount(_x, _x2) {
        return _createAccount.apply(this, arguments);
      }

      return createAccount;
    }()
  }, {
    key: "authenticate",
    value: function () {
      var _authenticate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body2, email, password, findUserData, hash;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
                _context2.next = 3;
                return (0, _findUserByEmail["default"])(_data["default"].users, email, 'email');

              case 3:
                findUserData = _context2.sent;

                if (findUserData.exist) {
                  hash = findUserData.data.password;

                  _bcrypt["default"].compare(password, hash, function (err, result) {
                    var token = _jsonwebtoken["default"].sign({
                      data: findUserData.data.id
                    }, 'landxxxofxxxopportunity', {
                      expiresIn: '24h'
                    });

                    findUserData.data.token = token;

                    if (result) {
                      res.status(200).json({
                        status: 200,
                        data: findUserData.data,
                        msg: 'user logged in successfully',
                        isAuth: true
                      }).end();
                    } else {
                      res.status(401).json({
                        status: 401,
                        error: 'Incorrect password'
                      }).end();
                    }
                  });
                } else {
                  res.status(404).json({
                    status: 404,
                    error: 'user not found'
                  });
                }

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function authenticate(_x3, _x4) {
        return _authenticate.apply(this, arguments);
      }

      return authenticate;
    }()
  }, {
    key: "createUserHomeAddress",
    value: function () {
      var _createUserHomeAddress = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var id, _req$body3, address, state, user, userAddress;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = req.params.id;
                _req$body3 = req.body, address = _req$body3.address, state = _req$body3.state, user = _req$body3.user;
                userAddress = (0, _findUserById["default"])(_data["default"].homeAddresses, +id, 'id');

                if (user === +id && !userAddress.exist) {
                  homeAddressCounter += 1;

                  _data["default"].homeAddresses.push({
                    id: homeAddressCounter,
                    user: +id,
                    address: address,
                    state: state
                  });

                  res.status(201).json({
                    status: 201,
                    data: {
                      id: homeAddressCounter,
                      user: +id,
                      address: address,
                      state: state
                    }
                  }).end();
                } else {
                  res.status(409).json({
                    status: 409,
                    error: 'user address already exists'
                  });
                }

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function createUserHomeAddress(_x5, _x6) {
        return _createUserHomeAddress.apply(this, arguments);
      }

      return createUserHomeAddress;
    }()
  }, {
    key: "createUserJob",
    value: function () {
      var _createUserJob = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var id, _req$body4, officeAddress, monthlyIncome, grossIncome, companyName, companySector, position, years, user, state, userHasAJob;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = req.params.id;
                _req$body4 = req.body, officeAddress = _req$body4.officeAddress, monthlyIncome = _req$body4.monthlyIncome, grossIncome = _req$body4.grossIncome, companyName = _req$body4.companyName, companySector = _req$body4.companySector, position = _req$body4.position, years = _req$body4.years, user = _req$body4.user, state = _req$body4.state;
                userHasAJob = (0, _findUserById["default"])(_data["default"].job, +id, 'id');

                if (user === +id && !userHasAJob.exist) {
                  jobCounter += 1;

                  _data["default"].job.push({
                    id: jobCounter,
                    user: +id,
                    officeAddress: officeAddress,
                    monthlyIncome: monthlyIncome,
                    grossIncome: grossIncome,
                    companyName: companyName,
                    companySector: companySector,
                    position: position,
                    years: years,
                    state: state
                  });

                  res.status(201).json({
                    status: 201,
                    data: {
                      id: jobCounter,
                      user: +id,
                      officeAddress: officeAddress,
                      monthlyIncome: monthlyIncome,
                      grossIncome: grossIncome,
                      companyName: companyName,
                      companySector: companySector,
                      position: position,
                      years: years,
                      state: state
                    }
                  }).end();
                } else {
                  res.status(409).json({
                    status: 409,
                    error: 'user job detail already exist'
                  });
                }

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function createUserJob(_x7, _x8) {
        return _createUserJob.apply(this, arguments);
      }

      return createUserJob;
    }()
  }, {
    key: "verifyUser",
    value: function () {
      var _verifyUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var id, userIndex, updateUser;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = req.body.id;
                userIndex = _data["default"].users.findIndex(function (user) {
                  return user.id === +id;
                });

                if (userIndex !== 1) {
                  updateUser = _objectSpread({}, _data["default"].users[userIndex], {
                    status: 'verified'
                  });
                  _data["default"].users[userIndex] = updateUser;
                  res.status(200).json({
                    status: 200,
                    data: _data["default"].users[userIndex]
                  }).end();
                }

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function verifyUser(_x9, _x10) {
        return _verifyUser.apply(this, arguments);
      }

      return verifyUser;
    }()
  }]);

  return User;
}();

var _default = User;
exports["default"] = _default;