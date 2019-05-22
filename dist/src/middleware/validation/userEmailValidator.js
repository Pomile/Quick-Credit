"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _emailValidator = _interopRequireDefault(require("./emailValidator"));

var _user = _interopRequireDefault(require("../../helpers/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var validateUserEmail =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var email, isEmailValid, findUser;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            email = req.params.email;
            isEmailValid = (0, _emailValidator["default"])(email);

            if (!isEmailValid) {
              _context.next = 9;
              break;
            }

            _context.next = 5;
            return _user["default"].findUser('users', 'email', email);

          case 5:
            findUser = _context.sent;

            if (findUser.exist) {
              next();
            } else {
              res.status(404).json({
                status: 404,
                error: 'user not found'
              });
            }

            _context.next = 10;
            break;

          case 9:
            res.status(422).json({
              status: 422,
              error: 'Invalid email'
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function validateUserEmail(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = validateUserEmail;
exports["default"] = _default;