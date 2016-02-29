'use strict';

define(['video'],
  function(Video) {
    /**
    * @constructor
    */
    var Gallery = function() {
      this.element = document.querySelector('.overlay-gallery');
      this._closeButton = this.element.querySelector('.overlay-gallery-close');
      this._controlLeft = this.element.querySelector('.overlay-gallery-control-left');
      this._controlRight = this.element.querySelector('.overlay-gallery-control-right');
      this._onCloseClick = this._onCloseClick.bind(this);
      this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
      this._onControlLeftClick = this._onControlLeftClick.bind(this);
      this._onControlRightClick = this._onControlRightClick.bind(this);
    };

    Gallery.prototype.show = function() {
      this.element.classList.remove('invisible');
      this._controlLeft.addEventListener('click', this._onControlLeftClick);
      this._controlRight.addEventListener('click', this._onControlRightClick);
      this._closeButton.addEventListener('click', this._onCloseClick);
      document.addEventListener('keydown', this._onDocumentKeyDown);
    };

    Gallery.prototype.hide = function() {
      this.element.classList.add('invisible');
      this._controlLeft.removeEventListener('click', this._onControlLeftClick);
      this._controlRight.removeEventListener('click', this._onControlRightClick);
      this._closeButton.removeEventListener('click', this._onCloseClick);
      document.removeEventListener('keydown', this._onDocumentKeyDown);
    };

    Gallery.prototype._onCloseClick = function() {
      this.hide();
    };

    Gallery.prototype._onDocumentKeyDown = function(e) {
      switch (e.which) {
        case 27:
          this.hide();
          break;
        case 37:
          this._onControlLeftClick();
          break;
        case 39:
          this._onControlRightClick();
          break;
      }
    };

    Gallery.prototype._onControlLeftClick = function() {
      if (this._currentPicture > 0) {
        this.setCurrentPicture(this._currentPicture - 1);
      }
    };

    Gallery.prototype._onControlRightClick = function() {
      if (this._currentPicture < this._Photos.length - 1) {
        this.setCurrentPicture(this._currentPicture + 1);
      }
    };

    /**
     * @param {Array.<Object>} Photo
     */
    Gallery.prototype.setPictures = function(Photo) {
      this._Photos = Photo.slice(0);
    };

     /**
     * @param {number} number
     */
    Gallery.prototype.setCurrentPicture = function(number) {
      /**
      * @const {number}
      */
      var IMAGE_HEIGHT = 450;
      var imageContainer = this.element.querySelector('.overlay-gallery-preview');
      this._currentPicture = number;
      /** type {Object}  */
      var media;
      if (this._Photos[number] instanceof Video) {
        media = document.createElement('VIDEO');
        media.src = this._Photos[number]._src;
        media.height = IMAGE_HEIGHT;
        media.autoplay = true;
        media.loop = true;
        media.addEventListener('click', function(evt) {
          if (evt.target.paused) {
            evt.target.play();
          } else {
            evt.target.pause();
          }
        });
      } else {
        media = new Image();
        media.src = this._Photos[number]._src;
        media.height = IMAGE_HEIGHT;
      }
      while (imageContainer.lastChild.nodeType === 3 || imageContainer.lastChild.tagName === 'IMG' || imageContainer.lastChild.tagName === 'VIDEO') {
        imageContainer.removeChild(imageContainer.lastChild);
      }
      imageContainer.appendChild(media);
      this.element.querySelector('.preview-number-current').textContent = number + 1;
      this.element.querySelector('.preview-number-total').textContent = this._Photos.length;
    };

    return Gallery;

  });
