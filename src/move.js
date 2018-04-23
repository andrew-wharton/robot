/**
 * Created by andrew on 23/4/18.
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
  var moveFunction = moveMapping[currentState.f];
  var newState = moveFunction(currentState);
  // f is unchanged and the same for all moves when moving
  newState.f = currentState.f;
  return newState
}

module.exports = move;