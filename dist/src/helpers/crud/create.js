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

var create =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(table, vals) {
    var fields, values, nodPostVar, client, query, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fields = Object.keys(vals);
            values = Object.values(vals);
            nodPostVar = fields.map(function (key, i) {
              return "$".concat(i + 1);
            }).join(', ');
            _context.next = 5;
            return pool.connect();

          case 5:
            client = _context.sent;
            query = {
              text: "INSERT INTO ".concat(table, " (").concat(fields.join(', '), " ) VALUES(").concat(nodPostVar, ") RETURNING *"),
              values: values
            };
            _context.prev = 7;
            _context.next = 10;
            return client.query(query);

          case 10:
            data = _context.sent;
            return _context.abrupt("return", {
              sucess: true,
              data: data.rows[0]
            });

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](7);
            return _context.abrupt("return", {
              success: false,
              data: null,
              error: _context.t0.message
            });

          case 17:
            _context.prev = 17;
            _context.next = 20;
            return client.release();

          case 20:
            return _context.finish(17);

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[7, 14, 17, 21]]);
  }));

  return function create(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = create;
exports["default"] = _default;