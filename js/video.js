'use strict';

define([
  'inherit',
  'photo'], function(inherit, Photo) {
  /**
  * @param {string} src
  * @constructor
  * @extends {Photo}
  */
  var Video = function(src) {
    Photo.call(this, src);
  };
  inherit(Video, Photo);
  return Video;
});

