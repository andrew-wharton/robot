/**
 * Created by andrew on 23/4/18.
 */

module.exports = function report(command, currentState) {
  console.log("Report: " + JSON.stringify(currentState));
  return currentState
};