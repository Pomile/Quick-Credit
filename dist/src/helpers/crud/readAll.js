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

var readAll =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(table) {
    var client, queryText, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return pool.connect();

          case 2:
            client = _context.sent;
            queryText = "SELECT * FROM ".concat(table, ";");
            _context.prev = 4;
            _context.next = 7;
            return client.query(queryText);

          case 7:
            data = _context.sent;
            return _context.abrupt("return", {
              success: true,
              data: data.rows
            });

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](4);
            return _context.abrupt("return", {
              error: _context.t0.message
            });

          case 14:
            _context.prev = 14;
            _context.next = 17;
            return client.release();

          case 17:
            return _context.finish(14);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 11, 14, 18]]);
  }));

  return function readAll(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = readAll;
exports["default"] = _default;