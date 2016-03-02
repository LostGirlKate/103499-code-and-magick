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
      location.hash = '';
    };

    Gallery.prototype._onDocumentKeyDown = function(e) {
      /**
      * @const {number}
      */
      var BTN_ESC = 27;
       /**
      * @const {number}
      */
      var BTN_LEFT = 37;
       /**
      * @const {number}
      */
      var BTN_RIGHT = 39;
      switch (e.which) {
        case BTN_ESC:
          this._onCloseClick();
          break;
        case BTN_LEFT:
          this._onControlLeftClick();
          break;
        case BTN_RIGHT:
          this._onControlRightClick();
          break;
      }
    };

    Gallery.prototype._onControlLeftClick = function() {
      if (this._currentPicture > 0) {
        location.hash = '#photo/' + this._Photos[this._currentPicture - 1]._src;
      }
    };

    Gallery.prototype._onControlRightClick = function() {
      if (this._currentPicture < this._Photos.length - 1) {
        location.hash = '#photo/' + this._Photos[this._currentPicture + 1]._src;
      }
    };

    /**
     * @param {Array.<Object>} Photo
     */
    Gallery.prototype.setPictures = function(Photo) {
      this._Photos = Photo.slice(0);
    };

     /**
     * @param {?number} param
     */
    Gallery.prototype.setCurrentPicture = function(param) {
      /**
      * @const {number}
      */
      var IMAGE_HEIGHT = 450;
      var imageContainer = this.element.querySelector('.overlay-gallery-preview');
      if (typeof (param) === 'number') {
        var index = param;
      } else if (typeof (param) === 'string') {
        for (var i = 0; i < this._Photos.length; i++) {
          if (this._Photos[i]._src === param) {
            index = i;
          }
        }
      }
      this._currentPicture = index;
      /** type {Object}  */
      var media;
      if (this._Photos[index] instanceof Video) {
        media = document.createElement('VIDEO');
        media.src = this._Photos[index]._src;
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
        media.src = this._Photos[index]._src;
        media.height = IMAGE_HEIGHT;
      }
      while (imageContainer.lastChild.nodeType === 3 || imageContainer.lastChild.tagName === 'IMG' || imageContainer.lastChild.tagName === 'VIDEO') {
        imageContainer.removeChild(imageContainer.lastChild);
      }
      imageContainer.appendChild(media);
      this.element.querySelector('.preview-number-current').textContent = index + 1;
      this.element.querySelector('.preview-number-total').textContent = this._Photos.length;
    };

    return Gallery;

  });
