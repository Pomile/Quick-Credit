"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../../models/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var pool = _index["default"].pool;

var update =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(table, vals, expr) {
    var fields, values, exprVal, exprField, nodPgVars, variables, client, queryText, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fields = Object.keys(vals);
            values = Object.values(vals);
            exprVal = Object.values(expr)[0];
            exprField = Object.keys(expr)[0];
            nodPgVars = fields.map(function (field, i) {
              return "".concat(field, "=$").concat(1 + i);
            });
            variables = fields.length > 1 ? nodPgVars.join(', ') : nodPgVars.toString();
            _context.next = 8;
            return pool.connect();

          case 8:
            client = _context.sent;
            queryText = {
              text: "UPDATE ".concat(table, " SET ").concat(variables, " WHERE ").concat(exprField, "='").concat(exprVal, "' RETURNING *"),
              values: values
            };
            _context.prev = 10;
            _context.next = 13;
            return client.query(queryText);

          case 13:
            data = _context.sent;
            return _context.abrupt("return", {
              success: true,
              data: data.rows[0]
            });

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](10);
            return _context.abrupt("return", {
              success: false,
              data: null,
              msg: _context.t0.message
            });

          case 20:
            _context.prev = 20;
            client.release();
            return _context.finish(20);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[10, 17, 20, 23]]);
  }));

  return function update(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = update;
exports["default"] = _default;