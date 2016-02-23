'use strict';
(function() {
  function Review(data) {
    this._data = data;
  }

  Review.prototype.render = function() {
    var IMAGE_SIZE = 124;
    var template = document.querySelector('#review-template');
    if ('content' in template) {
      this.element = template.content.children[0].cloneNode(true);
    } else {
      this.element = template.children[0].cloneNode(true);
    }
    setRating(this.element, this._data.rating);
    this.element.querySelector('.review-text').textContent = this._data.description;
    var userImage = new Image();
    userImage.src = this._data.author.picture;
    userImage.width = IMAGE_SIZE;
    userImage.height = IMAGE_SIZE;
    userImage.title = this._data.author.name;
    userImage.classList.add('review-author');
    userImage.onload = function() {
      this.element.replaceChild(userImage, this.element.querySelector('.review-author'));
    }.bind(this);
    userImage.onerror = function() {
      this.element.classList.add('review-load-failure');
    }.bind(this);
  };
  var ratingArray = {
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five'
  };

  function setRating(element, rating) {
    if (rating > 1 && rating < 6) {
      element.querySelector('.review-rating').classList.add('review-rating-' + ratingArray[rating]);
    }
  }

  window.Review = Review;
})();
