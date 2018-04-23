/**
 * Created by andrew on 23/4/18.
 */
var assert = require('assert');

var rightOrientationMapping = {
  NORTH: "EAST",
  EAST: "SOUTH",
  SOUTH: "WEST",
  WEST: "NORTH"
};

/**
 *
 * @param command
 * @param currentState
 */
module.exports = function right(command, currentState) {
  // We should only be calling this function if the robot has already been
  // placed on the table
  assert(currentState !== null, "Robot must be placed on table before turning right");

  return {
    x: currentState.x,
    y: currentState.y,
    f: rightOrientationMapping[currentState.f]
  }
};