"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _emailValidator = _interopRequireDefault(require("./emailValidator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var validateUserCredentials = function validateUserCredentials(req) {
  var isValid = true;
  var errors = [];
  Object.keys(req.body).forEach(function (field) {
    switch (field) {
      case 'email':
        if ((0, _emailValidator["default"])(req.body[field].trim()) === false) {
          isValid = false;
          errors.push({
            field: field,
            value: req.body[field],
            error: 'Email is required'
          });
        }

        break;

      case 'password':
        if (req.body[field].trim() === '') {
          isValid = false;
          errors.push({
            field: field,
            value: req.body[field],
            error: 'Password is required '
          });
        }

        if (req.body[field].trim().length < 5) {
          isValid = false;
          errors.push({
            field: field,
            value: req.body[field],
            error: 'Invalid password'
          });
        }

        break;

      default: // do nothing

    }
  });
  return {
    isValid: isValid,
    errors: errors
  };
};

var _default = validateUserCredentials;
exports["default"] = _default;