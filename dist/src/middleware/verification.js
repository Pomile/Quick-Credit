"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _findUserById = _interopRequireDefault(require("../helpers/findUserById"));

var _data = _interopRequireDefault(require("../data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var verifyUser = function verifyUser(req, res, next) {
  var payload = req.headers.authorization || req.headers['x-access-token'];

  if (req.headers.isauth === undefined || req.headers.isauth === false) {
    res.status(401).json({
      status: 401,
      error: 'Not authorized',
      success: false
    }).end();
  } else if (JSON.parse(req.headers.isauth)) {
    _jsonwebtoken["default"].verify(payload, 'landxxxofxxxopportunity',
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(err, decoded) {
        var user;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!err) {
                  user = (0, _findUserById["default"])(_data["default"].users, +decoded.data, 'id');

                  if (user.exist) {
                    req.body.user = +decoded.data;
                    req.user = user.data;
                    next();
                  }
                } else {
                  res.status(422).json({
                    status: 422,
                    error: 'Invalid token',
                    errMsg: err.message
                  }).end();
                }

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  }
};

var _default = verifyUser;
exports["default"] = _default;