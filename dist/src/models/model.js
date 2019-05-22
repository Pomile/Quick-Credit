"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

var _debug = _interopRequireDefault(require("debug"));

var _dotenv = _interopRequireDefault(require("dotenv"));

require("@babel/polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var Model =
/*#__PURE__*/
function () {
  function Model(table) {
    _classCallCheck(this, Model);

    this.table = table;

    if (process.env.NODE_ENV === 'production') {
      this.pool = new _pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: true
      });
    } else if (process.env.NODE_ENV === 'development') {
      this.pool = new _pg.Pool({
        database: process.env.DEV_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
      });
    } else if (process.env.NODE_ENV === 'test') {
      this.pool = new _pg.Pool({
        database: process.env.TEST_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
      });
    }

    this.pool.on('error', function (err, client) {
      Model.logger('Unexpected error on idle client', err);
      process.exit(-1);
    });
  }

  _createClass(Model, [{
    key: "logger",
    value: function logger(message) {
      return _debug["default"].log(message);
    }
  }, {
    key: "createTable",
    value: function () {
      var _createTable = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(def) {
        var query, run;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = "CREATE TABLE IF NOT EXISTS ".concat(this.table, "(").concat(def, ");");
                this.logger("our query is ".concat(query));
                _context.next = 4;
                return this.pool.query(query);

              case 4:
                run = _context.sent;
                return _context.abrupt("return", run);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createTable(_x) {
        return _createTable.apply(this, arguments);
      }

      return createTable;
    }()
  }, {
    key: "dropTable",
    value: function () {
      var _dropTable = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var query, run;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = "DROP TABLE IF EXISTS ".concat(this.table, ";");
                this.logger("our query is ".concat(query));
                _context2.next = 4;
                return this.pool.query(query);

              case 4:
                run = _context2.sent;
                return _context2.abrupt("return", run);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function dropTable() {
        return _dropTable.apply(this, arguments);
      }

      return dropTable;
    }()
  }]);

  return Model;
}();

var _default = Model;
exports["default"] = _default;