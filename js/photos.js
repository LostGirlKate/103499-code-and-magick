'use strict';

define([
  'photo',
  'gallery',
  'video'],
  function(Photo, Gallery, Video) {
    var documentImages = document.querySelectorAll('.photogallery-image');
    /** @type {Array.<Object>} */
    var imagesArray = Array.prototype.map.call(documentImages, function(img) {
      if (img.hasAttribute('data-replacement-video')) {
        return new Video(img.getAttribute('data-replacement-video'));
      } else {
        return new Photo(img.firstChild.getAttribute('src'));
      }
    });
    /** @type {Gallery} */
    var gallery = new Gallery();
    gallery.setPictures(imagesArray);

    var photogalleryImages = document.querySelector('.photogallery');

    photogalleryImages.addEventListener('click', _onClick);

    /**
    * @param {Event} evt
    */
    function _onClick(evt) {
      evt.preventDefault();
      var clickedElementImage = evt.target.parentElement;
      if (clickedElementImage.classList.contains('photogallery-image')) {
        for (var i = 0; i < documentImages.length; i++) {
          if (documentImages[i].firstChild.src === evt.target.src) {
            location.hash = '#photo/' + imagesArray[i]._src;
          }
        }
        gallery.show();
      }
    }

    window.addEventListener('hashchange', function() {
      if (location.hash.match(/#photo\/(\S+)/)) {
        gallery.setCurrentPicture(location.hash.match(/#photo\/(\S+)/)[1]);
      } else {
        gallery.hide();
      }
    });

    document.addEventListener('DOMContentLoaded', function() {
      if (location.hash.match(/#photo\/(\S+)/)) {
        gallery.setCurrentPicture(location.hash.match(/#photo\/(\S+)/)[1]);
        gallery.show();
      }
    });
  });
