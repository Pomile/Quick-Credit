"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var validateUserJobData = function validateUserJobData(req) {
  var isValid = true;
  var errors = [];
  Object.keys(req.body).forEach(function (field) {
    switch (field) {
      case 'officeAddress':
        if (req.body[field].trim() === '' || typeof req.body[field] !== 'string') {
          isValid = false;
          errors.push({
            field: field,
            value: req.body[field],
            error: 'Office address is required'
          });
        }

        break;

      case 'state':
        if (req.body[field].trim() === '' || typeof req.body[field] !== 'string') {
          isValid = false;
          errors.push({
            field: field,
            value: req.body[field],
            error: 'State is required'
          });
        }

        break;

      case 'position':
        if (req.body[field].trim() === '' || typeof req.body[field] !== 'string') {
          isValid = false;
          errors.push({
            field: field,
            value: req.body[field],
            error: 'Job position is required'
          });
        }

        break;

      case 'monthlyIncome':
        if (typeof req.body[field] !== 'number' || req.body[field] === '' || req.body[field] <= 0) {
          isValid = false;
          errors.push({
            field: field,
            value: req.body[field],
            error: 'Monthly income is required'
          });
        }

        break;

      case 'grossIncome':
        if (typeof req.body[field] !== 'number' || req.body[field] === '' || req.body[field] <= 0) {
          isValid = false;
          errors.push({
            field: field,
            value: req.body[field],
            error: 'Gross income is required'
          });
        }

        break;

      case 'years':
        if (typeof req.body[field] !== 'number' || req.body[field] === '' || req.body[field] <= 0) {
          isValid = false;
          errors.push({
            field: field,
            value: req.body[field],
            error: 'years is required'
          });
        }

        break;

      case 'companyName':
        if (req.body[field].trim() === '' || typeof req.body[field].trim() !== 'string') {
          isValid = false;
          errors.push({
            field: field,
            value: req.body[field],
            error: 'Company name is required'
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

var _default = validateUserJobData;
exports["default"] = _default;