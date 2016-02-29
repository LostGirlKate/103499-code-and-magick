'use strict';

define([
  'inherit',
  'photo'], function(inherit, Photo) {
  var Video = function(src) {
    Photo.call(this, src);
  };
  inherit(Video, Photo);
  return Video;
});

