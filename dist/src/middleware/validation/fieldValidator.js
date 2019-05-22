"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var validateFields = function validateFields(req, expectedFields) {
  var allFieldExists = true;
  var error = [];
  var data = req.body;
  var availableFields = Object.keys(data);
  expectedFields.forEach(function (field) {
    if (!availableFields.includes(field)) {
      error.push("".concat(field, " is required"));
      allFieldExists = false;
    }
  });
  return {
    allFieldExists: allFieldExists,
    error: error
  };
};

var _default = validateFields;
exports["default"] = _default;