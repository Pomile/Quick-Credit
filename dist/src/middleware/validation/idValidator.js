"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var validateId = function validateId(req, res, next) {
  var id = req.params.id;

  if (Number.isInteger(+id) && +id > 0) {
    next();
  } else {
    res.status(422).json({
      error: 'Invalid id. id must be an integer'
    }).end();
  }
};

var _default = validateId;
exports["default"] = _default;