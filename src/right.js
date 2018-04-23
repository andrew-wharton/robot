/**
 * Created by andrew on 23/4/18.
 */
var assert = require('assert');
var orientations = require('./orientations');

// Dead simple mapping for which direction is to the left of the given orientation
// Was using an object literal, but wanted to get rid of the magic strings...
var rightTurnMapping = {};
rightTurnMapping[orientations.NORTH] = orientations.EAST;
rightTurnMapping[orientations.EAST] = orientations.SOUTH;
rightTurnMapping[orientations.SOUTH] = orientations.WEST;
rightTurnMapping[orientations.WEST] = orientations.NORTH;

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
    f: rightTurnMapping[currentState.f]
  }
};