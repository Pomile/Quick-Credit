"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var permit = function permit(req, res, next) {
  if (req.user.isAdmin === true) {
    next();
  } else {
    res.status(403).json({
      status: 403,
      error: 'access denied'
    });
  }
};

var _default = permit;
exports["default"] = _default;