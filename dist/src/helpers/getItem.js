"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var getItem = function getItem(list, id, propName) {
  var len = list.length;
  var exist = false;
  var data;

  if (len > 0) {
    var itemIndex = list.findIndex(function (item) {
      return item[propName] === id;
    });

    if (itemIndex !== -1) {
      exist = true;
      data = list[itemIndex];
    }
  }

  return {
    exist: exist,
    data: data
  };
};

var _default = getItem;
exports["default"] = _default;