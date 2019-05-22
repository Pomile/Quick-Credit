"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var validateUserHomeAddress = function validateUserHomeAddress(req) {
  var isValid = true;
  var errors = [];
  Object.keys(req.body).forEach(function (field) {
    switch (field) {
      case 'address':
        if (req.body[field].trim() === '') {
          isValid = false;
          errors.push({
            field: field,
            value: req.body[field],
            error: 'Address is required'
          });
        }

        break;

      case 'state':
        if (req.body[field].trim() === '') {
          isValid = false;
          errors.push({
            field: field,
            value: req.body[field],
            error: 'State is required'
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

var _default = validateUserHomeAddress;
exports["default"] = _default;