'use strict';

define(function() {
  /**
  * @param {Constructor} child
  * @param {Constructor} parent
  */
  function inherit(child, parent) {
    var EmptyCtor = function() { };
    EmptyCtor.prototype = parent.prototype;
    child.prototype = new EmptyCtor();
  }

  return inherit;

});
