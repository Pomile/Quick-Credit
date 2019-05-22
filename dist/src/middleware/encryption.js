"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var saltRounds = 10;

var passwordEncryption = function passwordEncryption(req, res, next) {
  var password = req.body.password;

  _bcrypt["default"].hash(password, saltRounds, function (err, hash) {
    // Store hash in your password DB.
    if (!err) {
      req.body.password = hash;
      next();
    }
  });
};

var _default = passwordEncryption;
exports["default"] = _default;