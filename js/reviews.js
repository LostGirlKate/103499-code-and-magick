'use strict';

(function() {
  var filterElement = document.querySelector('.reviews-filter');

  filterElement.classList.add('invisible');

  var container = document.querySelector('.reviews-list');

  var ratingArray = {
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five'
  };

  reviews.forEach( function(review) {
    var element = getElementFromTemplate(review);
    container.appendChild(element);
  });

  function setRating(element, rating) {
    element.querySelector('.review-rating').classList.add('review-rating-' + ratingArray[rating]);
  }

  function getElementFromTemplate(data) {
    var IMAGE_SIZE = 124;
    var template = document.querySelector('#review-template');
    if ('content' in template) {
      var element = template.content.children[0].cloneNode(true);
    } else {
      element = template.children[0].cloneNode(true);
    }
    setRating(element, data.rating);
    element.querySelector('.review-text').textContent = data.description;
    var userImage = new Image();
    userImage.src = data.author.picture;
    userImage.width = IMAGE_SIZE;
    userImage.height = IMAGE_SIZE;
    userImage.title = data.author.name;
    userImage.classList.add('review-author');
    userImage.onload = function() {
      element.replaceChild(userImage, element.querySelector('.review-author'));
    };
    userImage.onerror = function() {
      element.classList.add('review-load-failure');
    };
    return element;
  }

  filterElement.classList.remove('invisible');
})();
