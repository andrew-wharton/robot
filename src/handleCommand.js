/**
 * Handles the parsing of the command and args, as well as dispatching
 * to the appropriate command, as well as applying any constraints
 */
var assert = require('assert');
var place = require('./place');
var move = require('./move');
var left = require('./left');
var right = require('./right');
var report = require('./report');


/**
 * Wire in the configured commands, along with their keywords
 *
 * @type {{PLACE: (*|exports|module.exports)}}
 */
var commandMapping = {
  "PLACE": place,
  "MOVE": move,
  "LEFT": left,
  "RIGHT": right,
  "REPORT": report
};

/**
 * Handles the logic to figure out which command is being called, dispatching it
 * to the correct handler and checking the new state against any constraints
 * to make sure it is valid.
 *
 * @param command
 * @param currentState
 * @param constraints {array} - an Array of function which check that a state is valid
 * @returns {object} - The new state after the given command has been executed
 */
function handleCommand(command, currentState, constraints = []) {

  // Parse the command to figure out which function it should be dispatched to
  var tokenisedCommand = command.split(' ');
  var commandName = tokenisedCommand[0];

  // If there has not yet been a PLACE command
  // to set an initial valid state, ignore the command
  if(currentState === null && commandName !== 'PLACE') {
    return currentState
  } else {
    // Check if the command is available
    if(commandMapping[commandName]) {

      // Apply the command to the state to get the new state
      var commandFunction = commandMapping[commandName];
      var newState = commandFunction(command, currentState);

      // Quick sanity check that the types for the new state are valid
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