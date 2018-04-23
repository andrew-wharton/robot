/**
 * Created by andrew on 23/4/18.
 */

module.exports = function report(command, currentState) {
  console.log([currentState.x, currentState.y, currentState.f].join(','));
  return currentState
};