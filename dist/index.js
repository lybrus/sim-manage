"use strict";

var _commandLineArgs = _interopRequireDefault(require("command-line-args"));

var _request = _interopRequireDefault(require("./request"));

var _auth = _interopRequireDefault(require("./handlers/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mainDefinitions = [{
  name: 'command',
  defaultOption: true
}];
const mainOptions = (0, _commandLineArgs.default)(mainDefinitions, {
  stopAtFirstUnknown: true
});
const commandsDefinitions = {
  auth: _auth.default
};
const {
  command,
  _unknown: argv = []
} = mainOptions;

if (commandsDefinitions[command]) {
  const {
    definitions,
    handle
  } = commandsDefinitions[command];
  const commandOptions = (0, _commandLineArgs.default)(definitions, {
    argv
  });
  handle(commandOptions);
}