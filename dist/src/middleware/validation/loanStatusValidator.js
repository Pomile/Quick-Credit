"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var validateLoanStatus = function validateLoanStatus(req) {
  var isValid = true;
  var errors = [];
  Object.keys(req.body).forEach(function (field) {
    switch (field) {
      case 'status':
        if (!['approved', 'rejected'].includes(req.body[field].trim()) || req.body[field].trim() === '') {
          isValid = false;
          errors.push({
            field: field,
            value: req.body[field],
            error: 'Loan status is required'
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

var _default = validateLoanStatus;
exports["default"] = _default;