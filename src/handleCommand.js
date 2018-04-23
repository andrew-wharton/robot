
var assert = require('assert');
var place = require('./place');
var move = require('./move');
var left = require('./left');
var right = require('./right');
var report = require('./report');


/**
 * Mapping of configured commands and their keywords
 */
var commandMapping = {
  "PLACE": place,
  "MOVE": move,
  "LEFT": left,
  "RIGHT": right,
  "REPORT": report
};

/**
 * Array of functions which describe the constraints on the movement of the robot
 */
var constraints = [
  function tableIs5UnitsWide(state) {
    return state.x >= 0 && state.x <= 4
  },
  function tableIs5UnitsHigh(state) {
    return state.y >= 0 && state.y <= 4
  }
];

/**
 * Handles the parsing of the command and dispatching
 * to the appropriate command function, as well as checking the new state
 * against any constraints to make sure it's valid
 *
 * @param command
 * @param currentState
 * @returns {object} - The new state after the given command has been executed
 */
function handleCommand(command, currentState) {

  // Parse the command to figure out which function it should be dispatched to
  var tokenizedCommand = command.split(' ');
  assert(tokenizedCommand.length > 0);
  var commandName = tokenizedCommand[0];

  // If there is not a current valid state, and this is not a 'PLACE' command,
  // then ignore the command
  if(currentState === null && commandName !== 'PLACE') {
    return currentState
  } else {
    // Check if the command is available
    if(commandMapping[commandName]) {

      // Get the appropriate command function and apply the command to the
      // state to get the new state
      var commandFunction = commandMapping[commandName];
      var newState = commandFunction(command, currentState);

      // Quick sanity check that the types for the new state are what is expected
      assert(typeof newState.x === 'number', 'x should be a Number');
      assert(typeof newState.y === 'number', 'y should be a Number');
      assert(typeof newState.f === 'string', 'f should be a String');

      // Apply constraints to check that the new state is valid
      var isValid = constraints.reduce(function(acc, constraint) {
        return acc && constraint(newState);
      }, true);

      return isValid ? newState : currentState

    } else {
      // Unsupported command, ignore it
      console.log("unrecognised command: " + command);
      return currentState
    }
  }
}

module.exports = handleCommand;