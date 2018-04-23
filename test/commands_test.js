/**
 * Created by andrew on 20/4/18.
 */
var assert = require('assert');
var place = require('../src/place');
var move = require('../src/move');
var left = require('../src/left');
var right = require('../src/right');

describe('Commands', function() {

  describe('place command', function() {
    it('should return a new state given a valid command and args', function() {
      var newState = place("PLACE 1,1,NORTH");
      assert.deepEqual(newState, {x: 1, y: 1, f: 'NORTH'});
    });
    it('should throw an exception when there are an incorrect number of args', function() {
      assert.throws(function() {
        place("PLACE 1,3,NORTH TOO_MANY")
      }, Error);
    });
    it('should thrown an exception when the args are in the wrong format', function() {
      assert.throws(function() {
        place("PLACE 1,3_NORTH")
      }, Error);
    });
    it('should thrown an exception when there are an incorrect number of args', function() {
      assert.throws(function() {
        place('PLACE 1,3')
      }, Error)
    });
    it('should throw when non-number args', function() {
      assert.throws(function() {
        place('PLACE 1,a,NORTH')
      }, Error)
    });
    it('should throw when non-integer args', function() {
      assert.throws(function() {
        place('PLACE 1,2.3,NORTH')
      }, Error)
    });
    it('should throw when unrecognised orientation', function() {
      assert.throws(function() {
        place('PLACE 1,3,UP')
      }, Error)
    })
  });

  describe('move command', function() {
    it('should move one unit up along the y axis when facing north', function() {
      var newState = move('MOVE', {x: 0, y: 0, f: 'NORTH'});
      assert.deepEqual(newState, {x: 0, y: 1, f: 'NORTH'});
    });
    it('should move one unit down along the y axis when facing south', function() {
      var newState = move('MOVE', {x: 0, y: 0, f: 'SOUTH'});
      assert.deepEqual(newState, {x: 0, y: -1, f: 'SOUTH'});
    });
    it('should move one unit up along the x axis when facing east', function() {
      var newState = move('MOVE', {x: 0, y: 0, f: 'EAST'});
      assert.deepEqual(newState, {x: 1, y: 0, f: 'EAST'});
    });
    it('should move one unit down along the y axis when facing west', function() {
      var newState = move('MOVE', {x: 0, y: 0, f: 'WEST'});
      assert.deepEqual(newState, {x: -1, y: 0, f: 'WEST'});
    });
    it('should throw an exception if there is no initial state', function() {
      assert.throws(function() {
        move('MOVE', null);
      })
    })
  });

  describe('left command', function() {
    it('should be facing west after turning left from north', function() {
      var newState = left('LEFT', {x: 1, y: 1, f: 'NORTH'});
      assert.deepEqual(newState, {x: 1, y: 1, f: 'WEST'});
    });
    it('should be facing south after turning left from west', function() {
      var newState = left('LEFT', {x: 1, y: 1, f: 'WEST'});
      assert.deepEqual(newState, {x: 1, y: 1, f: 'SOUTH'});
    });
    it('should be facing east after turning left from south', function() {
      var newState = left('LEFT', {x: 1, y: 1, f: 'SOUTH'});
      assert.deepEqual(newState, {x: 1, y: 1, f: 'EAST'});
    });
    it('should be facing north after turning left from east', function() {
      var newState = left('LEFT', {x: 1, y: 1, f: 'EAST'});
      assert.deepEqual(newState, {x: 1, y: 1, f: 'NORTH'});
    });
    it('should throw an exception if there is no inital state', function() {
      assert.throws(function() {
        left('LEFT', null)
      }, Error)
    })
  });

  describe('right command', function() {
    it('should be facing east after turning right from north', function() {
      var newState = right('RIGHT', {x: 1, y: 1, f: 'NORTH'});
      assert.deepEqual(newState, {x: 1, y: 1, f: 'EAST'});
    });
    it('should be facing south after turning right from east', function() {
      var newState = right('RIGHT', {x: 1, y: 1, f: 'EAST'});
      assert.deepEqual(newState, {x: 1, y: 1, f: 'SOUTH'});
    });
    it('should be facing west after turning right from south', function() {
      var newState = right('RIGHT', {x: 1, y: 1, f: 'SOUTH'});
      assert.deepEqual(newState, {x: 1, y: 1, f: 'WEST'});
    });
    it('should be facing north after turning right from west', function() {
      var newState = right('RIGHT', {x: 1, y: 1, f: 'WEST'});
      assert.deepEqual(newState, {x: 1, y: 1, f: 'NORTH'});
    });
    it('should throw an exception if there is no inital state', function() {
      assert.throws(function() {
        right('RIGHT', null)
      }, Error)
    })
  });

});
