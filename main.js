/**
 * Main entry point. Handles the loading and parsing of the input file data and
 * running the commands to get to our final state.
 */
var fs = require('fs');
var handleCommand = require('./src/handleCommand');

if(process.argv.length > 2) {

  /*
    Start by reading in the file, splitting into lines and then executing
    each line of the file, starting with an initial state and progressing
    to an end state.
   */
  fs.readFile(process.argv[2], 'utf8', function(err, contents) {
    if(err) {
      console.log("Error reading input file: " + err.message);
      process.exit(1);
    } else {

      var commands = contents.split('\n');

      // Run the commands, starting with the state as null
      // ie. the robot is not on the board
      commands.reduce(function(currentState, command) {
        try {
          // Handle command takes a command and currentState
          // and returns a new state
          return handleCommand(command, currentState);
        } catch(err) {
          // Something went wrong handling the command, eg. invalid args,
          // so skip it.
          return currentState;
        }
      }, null);
    }
  });
} else {
  console.log("Please specify a path to the file containing the list of commands");
  process.exit(1);
}
