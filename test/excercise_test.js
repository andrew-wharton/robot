/**
 * Created by andrew on 23/4/18.
 */
var assert = require('assert');
var handleCommand = require('../src/handleCommand');

describe('Constraints', function() {
  describe('must be on table', function() {
    it("should not be able to be placed off the table", function() {
      var state = handleCommand("PLACE -1,0,NORTH", null);
      assert(state === null);
      state = handleCommand("PLACE 5,0,NORTH", null);
      assert(state === null);
      state = handleCommand("PLACE 0,-1,NORTH", null);
      assert(state === null);
      state = handleCommand("PLACE 0,5,NORTH", null);
      assert(state === null);
    });
    it("should not be able to be moved off the table", function() {
      // try to move west from the left edge
      var state = handleCommand("MOVE", {x: 0, y: 0, f: "WEST"});
      assert(state.x === 0);
      // try to move east from the right edge
      state = handleCommand("MOVE", {x: 4, y: 0, f: "EAST"});
      assert(state.x === 4);
      // try to move south from the bottom edge
      state = handleCommand("MOVE", {x: 0, y: 0, f: "SOUTH"});
      assert(state.y === 0);
      // try to move north from the top edge
      state = handleCommand("MOVE", {x: 0, y: 4, f: "NORTH"});
      assert(state.y === 4);
    });
  })
});