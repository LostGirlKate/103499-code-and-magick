'use strict';

define(function() {

  function inherit(child, parent) {
    var EmptyCtor = function() { };
    EmptyCtor.prototype = parent.prototype;
    child.prototype = new EmptyCtor();
  }

  return inherit;

});
