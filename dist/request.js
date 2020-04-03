"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const tokenFile = '../token';

const tokenFilePath = _path.default.resolve(__dirname, tokenFile);

let token = '';

if (_fs.default.existsSync(tokenFilePath)) {
  token = _fs.default.readFileSync(tokenFilePath, {
    encoding: 'utf-8'
  });
}

console.log(token);