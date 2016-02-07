'use strict';

(function() {
  var filterElement = document.querySelector('.reviews-filter');

  filterElement.classList.add('invisible');

  var container = document.querySelector('.reviews-list');
  var sectionReviews = document.querySelector('.main-section.reviews');
  var ratingArray = {
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five'
  };

  var filters = document.querySelectorAll('[name=reviews]');
  var reviews = [];
  for (var i = 0; i < filters.length; i++) {
    filters[i].onclick = function(evt) {
      var clickedElementID = evt.target.id;
      setActiveFilter(clickedElementID);
    };
  }

  getReviews();

  function renderReviews(reviewsArray) {
    container.innerHTML = '';
    var fragment = document.createDocumentFragment();
    reviewsArray.forEach( function(review) {
      var element = getElementFromTemplate(review);
      fragment.appendChild(element);
    });
    container.appendChild(fragment);
    sectionReviews.classList.remove('reviews-list-loading');
  }

  function setActiveFilter(id) {
    var filteredReviews = reviews.slice(0);
    switch (id) {
      case 'reviews-all' :
        break;
      case 'reviews-recent' :
        filteredReviews = filterRecent(filteredReviews);
        break;
      case 'reviews-good' :
        filteredReviews = filterGoods(filteredReviews);
        break;
      case 'reviews-bad' :
        filteredReviews = filterBads(filteredReviews);
        break;
      case 'reviews-popular' :
        filteredReviews = filterPopular(filteredReviews);
        break;
    }
    renderReviews(filteredReviews);
  }

  function filterRecent(filteredReviews) {
    filteredReviews = filteredReviews.filter(
      function(el) {
        var date1 = new Date(el.date);
        var curdate = new Date();
        return (date1 >= curdate - 14 * 24 * 60 * 60 * 1000);
      }
    );
    filteredReviews = filteredReviews.sort(
      function(a, b) {
        var date1 = new Date(a.date);
        var date2 = new Date(b.date);
        return date2 - date1;
      }
    );
    return filteredReviews;
  }

  function filterGoods(filteredReviews) {
    filteredReviews = filteredReviews.filter(
      function(el) {
        return (el.rating >= 3);
      }
    );
    filteredReviews = filteredReviews.sort(
      function(a, b) {
        return b.rating - a.rating;
      }
    );
    return filteredReviews;
  }

  function filterBads(filteredReviews) {
    filteredReviews = filteredReviews.filter(
      function(el) {
        return (el.rating <= 2);
      }
    );
    filteredReviews = filteredReviews.sort(
      function(a, b) {
        return a.rating - b.rating;
      }
    );
    return filteredReviews;
  }

  function filterPopular(filteredReviews) {
    filteredReviews = filteredReviews.sort(
      function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      }
    );
    return filteredReviews;
  }

  function getReviews() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '//o0.github.io/assets/json/reviews.json');
    xhr.onload = function(evt) {
      sectionReviews.classList.add('reviews-list-loading');
      var rawData = evt.target.response;
      var loadedReviews = JSON.parse(rawData);
      reviews = loadedReviews;
      renderReviews(loadedReviews);
    };
    xhr.send();
  }

  function setRating(element, rating) {
    if (rating > 1 && rating < 6) {
      element.querySelector('.review-rating').classList.add('review-rating-' + ratingArray[rating]);
    }
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
