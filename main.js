/**
 * Created by andrew on 23/4/18.
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
      console.log("Error reading input file");
      process.exit(1);
    } else {
      var commands = contents.split('\n');
      commands.reduce(function(currentState, command, i) {
        try {
          // Handle command takes a command and currentState
          // and returns a new state
          return handleCommand(command, currentState);
        } catch(err) {
          // Something went wrong handling the command, probably invalid args
          // so skip it.
          console.error("Error executing command " + i + ': '+ err.message);
          return currentState;
        }
      }, null);
    }
  });
} else {
  console.log("Please specify a path to the file containing the list of commands");
  process.exit(1);
}
