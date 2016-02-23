'use strict';
(function() {
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
    if (e.which === 27) {
      this.hide();
    }
  };

  Gallery.prototype._onControlLeftClick = function() {
    console.log('_onControlLeftClick');
  };

  Gallery.prototype._onControlRightClick = function() {
    console.log('_onControlRightClick');
  };

  window.Gallery = Gallery;
})();
