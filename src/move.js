/**
 * Created by andrew on 23/4/18.
 */
var assert = require('assert');

/**
 * Mapping of functions to move the robot based on it's orientation
 */
var moveMapping = {
  NORTH: function moveNorth(state) {
    return {
      x: state.x,
      y: state.y + 1
    }
  },
  SOUTH: function moveSouth(state) {
    return {
      x: state.x,
      y: state.y - 1
    }
  },
  EAST: function moveEast(state) {
    return {
      x: state.x + 1,
      y: state.y
    }
  },
  WEST: function moveWest(state) {
    return {
      x: state.x - 1,
      y: state.y
    }
  }
};

/**
 * Given the current location and orientation of the robot,
 * moves it one unit forward.
 *
 * @param command
 * @param currentState
 */
function move(command, currentState) {

  // Check that the robot is placed on the board with an initial state
  assert(currentState !== null);

  // Get the appropriate move function based on the direction the robot is facing
  var moveFunction = moveMapping[currentState.f];
  var newState = moveFunction(currentState);

  // f is unchanged and the same for all moves
  newState.f = currentState.f;

  return newState
}

module.exports = move;