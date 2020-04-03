"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const definitions = [{
  name: 'pair',
  defaultOption: true,
  multiple: true
}];

function auth({
  pair
}) {
  const [username, password] = pair;
  console.log(username, password);
}

var _default = {
  definitions,
  handle: auth
};
exports.default = _default;