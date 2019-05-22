"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var loan = {
  user1creditRequest: {
    amount: 200000,
    tenor: 5
  },
  user1creditRequestWithoutAmount: {
    amount: 0,
    tenor: 5
  },
  user1creditRequestWithoutAmountProp: {
    tenor: 5
  },
  user1creditRequestWithoutTenor: {
    amount: 200000,
    tenor: 0
  }
};
var _default = loan;
exports["default"] = _default;