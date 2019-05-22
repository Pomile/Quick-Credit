"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var validateRepaymentVal = function validateRepaymentVal(req) {
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
            error: 'Amount is required'
          });
        }

        break;

      case 'loanId':
        if (req.body[field] <= 0 || typeof req.body[field] !== 'number' || req.body[field] === '') {
          isValid = false;
          errors.push({
            field: field,
            value: req.body[field],
            error: 'LoanId is required'
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

var _default = validateRepaymentVal;
exports["default"] = _default;