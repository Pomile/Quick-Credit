"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var getItemsById = function getItemsById(list, id, type) {
  var data = [];
  var len = list.length;

  if (len > 0) {
    list.forEach(function (item) {
      if (item[type] === +id) {
        data.push(item);
      }
    });
  }

  return {
    data: data
  };
};

var _default = getItemsById;
exports["default"] = _default;