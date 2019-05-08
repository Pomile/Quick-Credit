"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var validateLoan = function validateLoan(req) {
  var isValid = true;
  var errors = [];
  Object.keys(req.body).forEach(function (field) {
    switch (field) {
      case 'amount':
        if (req.body[field] <= 0 || typeof req.body[field] !== 'number' || req.body[field] === '') {
          isValid = false;
          errors.push({
            field: field,
            value: req.body[field],
            error: 'Loan amount is required'
          });
        }

        break;

      case 'tenor':
        if (req.body[field] <= 0 || typeof req.body[field] !== 'number' || req.body[field] === '') {
          isValid = false;
          errors.push({
            field: field,
            value: req.body[field],
            error: 'Tenor is required'
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

var _default = validateLoan;
exports["default"] = _default;