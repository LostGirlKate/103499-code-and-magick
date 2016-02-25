/* global inherit: true, Photo: true */
'use strict';

(function() {
  var Video = function(src) {
    Photo.call(this, src);
  };
  inherit(Video, Photo);
  window.Video = Video;
})();

