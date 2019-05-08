"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _emailValidator = _interopRequireDefault(require("./emailValidator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var validateUserData = function validateUserData(req) {
  var isValid = true;
  var errors = [];
  Object.keys(req.body).forEach(function (field) {
    switch (field) {
      case 'firstname':
        if (req.body[field].trim() === '' || typeof req.body[field].trim() !== 'string') {
          isValid = false;
          errors.push({
            field: field,
            value: req.body[field],
            error: 'Firstname is required'
          });
        }

        break;

      case 'lastname':
        if (req.body[field].trim() === '' || typeof req.body[field].trim() !== 'string') {
          isValid = false;
          errors.push({
            field: field,
            value: req.body[field],
            error: 'Lastname is required'
          });
        }

        break;

      case 'email':
        if ((0, _emailValidator["default"])(req.body[field].trim()) === false || typeof req.body[field].trim() !== 'string') {
          isValid = false;
          errors.push({
            field: field,
            value: req.body[field],
            error: 'Email is required'
          });
        }

        break;

      case 'phone':
        if (req.body[field].trim() === '' || typeof req.body[field].trim() !== 'string') {
          isValid = false;
          errors.push({
            field: field,
            value: req.body[field],
            error: 'Phone is required'
          });
        }

        break;

      case 'password':
        if (req.body[field].trim() === '' || typeof req.body[field].trim() !== 'string') {
          isValid = false;
          errors.push({
            field: field,
            value: req.body[field],
            error: 'Password is required '
          });
        }

        if (req.body[field].trim() !== req.body.cpassword.trim()) {
          isValid = false;
          errors.push({
            field: field,
            value: req.body[field],
            error: 'Password mismatch'
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

var _default = validateUserData;
exports["default"] = _default;