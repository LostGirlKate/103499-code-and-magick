'use strict';

(function() {
  var filterElement = document.querySelector('.reviews-filter');

  filterElement.classList.add('invisible');

  var container = document.querySelector('.reviews-list');

  reviews.forEach( function(review) {
    var element = getElementFromTemplate(review);
    container.appendChild(element);
  });

  function setRating(element, rating) {
    switch (rating) {
      case 2 :
        element.querySelector('.review-rating').classList.add('review-rating-two');
        break;
      case 3 :
        element.querySelector('.review-rating').classList.add('review-rating-three');
        break;
      case 4 :
        element.querySelector('.review-rating').classList.add('review-rating-four');
        break;
      case 5 :
        element.querySelector('.review-rating').classList.add('review-rating-five');
        break;
    }
  }

  function getElementFromTemplate(data) {
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
    userImage.width = 124;
    userImage.height = 124;
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
