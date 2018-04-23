/**
 * Updates the state of the robot to a given location x,y and orientation f.
 *
 * @returns object - The new state after the command has been applied
 */
var SUPPORTED_ORIENTATIONS = ['NORTH', 'SOUTH', 'EAST', 'WEST'];

module.exports = function place(command) {

  // Parse the new x,y,f values from the command
  var tokenisedCommand = command.split(' ');

  // Ensure that the args are available
  if(tokenisedCommand.length !== 2) {
    throw new Error("Place command requires exactly 1 argument in the form 'x,y,f'");
  }
  var tokenisedArgs = tokenisedCommand[1].split(',');

  // Check the args are in the correct format
  if(tokenisedArgs.length !== 3) {
    throw new Error("Argument to place command should contain exactly 3 values in the form 'x,y,f'")
  }

  var x = tokenisedArgs[0],
    y = tokenisedArgs[1],
    f = tokenisedArgs[2];

  // Check that the first 2 args parse as integers
  [x, y].forEach(function(arg) {

    // Check it parses as a Number
    var parsedCoordinate = parseFloat(arg);

    if(!isFinite(parsedCoordinate)) {
      throw new Error('Arguments x and y should be Number')
    }
    // Check it's an integer
    if(!Number.isInteger(parsedCoordinate)) {
      throw new Error('Arguments x and y should be integers')
    }
  });

  // Check that the 'f' argument is valid
  var isValidOrientation = SUPPORTED_ORIENTATIONS.reduce(function(acc, availableOrientation) {
    return acc || availableOrientation === f;
  }, false);

  if(!isValidOrientation) {
    throw new Error("Orientation 'f' should be one of NORTH, SOUTH, EAST or WEST")
  }

  // All the args are valid, apply the place command to create a new state
  return {
    x: parseInt(x),
    y: parseInt(y),
    f: f
  }
};