"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _debug = _interopRequireDefault(require("debug"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _route = _interopRequireDefault(require("./src/route/route"));

var _enpointsList = _interopRequireDefault(require("./enpointsList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();

_debug["default"].log("ENV: ".concat(process.env.NODE_ENV));

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
  app.use((0, _morgan["default"])('short'));
}

_dotenv["default"].config();

app.use(_bodyParser["default"].urlencoded({
  extended: false,
  type: '*/x-www-form-urlencoded'
}));
app.use(_bodyParser["default"].json({
  type: 'application/json'
}));
app.use(_bodyParser["default"].text({
  type: 'text/html'
}));
app.use(_bodyParser["default"].text({
  type: 'text/plain'
}));
app.use(_bodyParser["default"].raw({
  type: '*/octet-stream'
}));
app.get('/', function (req, res) {
  res.status(200).send("\n    <div>\n    <h1>Welcome...</h1>\n    <h4>Server is running on https://".concat(req.hostname, "/</h4>\n    <h4>Endpoints</h4>\n    <p>").concat(_enpointsList["default"], "</p>\n    </div>\n    ")).end();
});
app.use('/api/v1', _route["default"]);
var _default = app;
exports["default"] = _default;