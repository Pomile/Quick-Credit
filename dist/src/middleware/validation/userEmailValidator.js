"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _emailValidator = _interopRequireDefault(require("./emailValidator"));

var _data = _interopRequireDefault(require("../../data"));

var _findUserByEmail = _interopRequireDefault(require("../../helpers/findUserByEmail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var validateUserEmail = function validateUserEmail(req, res, next) {
  var email = req.params.email;
  var isEmailValid = (0, _emailValidator["default"])(email);

  if (isEmailValid) {
    var findUser = (0, _findUserByEmail["default"])(_data["default"].users, email, 'email');

    if (findUser.exist) {
      req.body = findUser.data;
      next();
    } else {
      res.status(404).json({
        status: 404,
        error: 'user not found'
      });
    }
  } else {
    res.status(422).json({
      status: 422,
      error: 'Invalid email'
    });
  }
};

var _default = validateUserEmail;
exports["default"] = _default;