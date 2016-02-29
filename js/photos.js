'use strict';

define([
  'photo',
  'gallery',
  'video'],
  function(Photo, Gallery, Video) {
    var documentImages = document.querySelectorAll('.photogallery-image');
    var imagesArray = Array.prototype.map.call(documentImages, function(img) {
      if (img.hasAttribute('data-replacement-video')) {
        return new Video(img.getAttribute('data-replacement-video'));
      } else {
        return new Photo(img.firstChild.src);
      }
    });
    var gallery = new Gallery();
    gallery.setPictures(imagesArray);
    var photogalleryImages = document.querySelector('.photogallery');

    photogalleryImages.addEventListener('click', _onClick);

    function _onClick(evt) {
      evt.preventDefault();
      var clickedElementImage = evt.target.parentElement;
      if (clickedElementImage.classList.contains('photogallery-image')) {
        for (var i = 0; i < documentImages.length; i++) {
          if (documentImages[i].firstChild.src === evt.target.src) {
            gallery.setCurrentPicture(i);
          }
        }
        gallery.show();
      }
    }

  });
