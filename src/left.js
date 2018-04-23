/**
 * Created by andrew on 23/4/18.
 */
var assert = require('assert');
var orientations = require('./orientations');

// Dead simple mapping for which direction is to the left of the given orientation
var leftOrientationMapping = {
  "NORTH": "WEST",
  "WEST": "SOUTH",
  "SOUTH": "EAST",
  "EAST": "NORTH"
};

/**
 *
 *
 * @param command
 * @param currentState
 * @returns {{x: (*|number|boolean|Number), y: (*|number|boolean|Number), f: *}}
 */
module.exports = function left(command, currentState) {

  // We should only be calling this function if the robot has already been
  // placed on the table
  assert(currentState !== null, "Robot must be placed on table before turning left");

  return {
    x: currentState.x,
    y: currentState.y,
    f: leftOrientationMapping[currentState.f]
  }

};
