/* global Review: true */

'use strict';

(function() {
  var filterElement = document.querySelector('.reviews-filter');

  filterElement.classList.add('invisible');

  var container = document.querySelector('.reviews-list');
  var sectionReviews = document.querySelector('.main-section.reviews');

  var filters = document.querySelector('.reviews-filter');
  var reviews = [];
  var filteredReviews = [];
  var currentPage = 0;
  var PAGE_SIZE = 3;
  var moreRendersButton = document.querySelector('.reviews-controls-more');

  filters.addEventListener('click', function(evt) {
    var clickedElement = evt.target;
    if (clickedElement.classList.contains('reviews-filter-item')) {
      setActiveFilter(clickedElement.htmlFor);
    }
  });

  moreRendersButton.addEventListener('click', function() {
    renderReviews(filteredReviews, ++currentPage);
  });

  getReviews();

  function renderReviews(reviewsArray, pageNumber, replace) {
    if (replace) {
      var renderedElements = container.querySelectorAll('.review');
      [].forEach.call(renderedElements, function(el) {
        container.removeChild(el);
      })
      container.innerHTML = '';
      currentPage = 0;
    }
    var fragment = document.createDocumentFragment();

    var from = pageNumber * PAGE_SIZE;
    var to = from + PAGE_SIZE;
    var pageRenders = reviewsArray.slice(from, to);

    pageRenders.forEach( function(review) {
      var reviewElement = new Review(review);
      reviewElement.render();
      fragment.appendChild(reviewElement.element);
    });
    container.appendChild(fragment);
    sectionReviews.classList.remove('reviews-list-loading');
    if (currentPage >= Math.ceil(reviewsArray.length / PAGE_SIZE) - 1) {
      moreRendersButton.classList.add('invisible');
    } else {
      moreRendersButton.classList.remove('invisible');
    }
  }

  function setActiveFilter(id) {
    filteredReviews = reviews.slice(0);
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
    renderReviews(filteredReviews, 0, true);
  }

  function filterRecent(filteredReviewsP) {
    filteredReviewsP = filteredReviewsP.filter(
      function(el) {
        var date1 = new Date(el.date);
        var curdate = new Date();
        return (date1 >= curdate - 14 * 24 * 60 * 60 * 1000);
      }
    );
    filteredReviewsP = filteredReviewsP.sort(
      function(a, b) {
        var date1 = new Date(a.date);
        var date2 = new Date(b.date);
        return date2 - date1;
      }
    );
    return filteredReviewsP;
  }

  function filterGoods(filteredReviewsP) {
    filteredReviewsP = filteredReviewsP.filter(
      function(el) {
        return (el.rating >= 3);
      }
    );
    filteredReviewsP = filteredReviewsP.sort(
      function(a, b) {
        return b.rating - a.rating;
      }
    );
    return filteredReviewsP;
  }

  function filterBads(filteredReviewsP) {
    filteredReviewsP = filteredReviewsP.filter(
      function(el) {
        return (el.rating <= 2);
      }
    );
    filteredReviewsP = filteredReviewsP.sort(
      function(a, b) {
        return a.rating - b.rating;
      }
    );
    return filteredReviewsP;
  }

  function filterPopular(filteredReviewsP) {
    filteredReviewsP = filteredReviewsP.sort(
      function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      }
    );
    return filteredReviewsP;
  }

  function getReviews() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '//o0.github.io/assets/json/reviews.json');
    xhr.onload = function(evt) {
      sectionReviews.classList.add('reviews-list-loading');
      var rawData = evt.target.response;
      var loadedReviews = JSON.parse(rawData);
      reviews = loadedReviews;
      filteredReviews = reviews.slice(0);
      renderReviews(loadedReviews, 0, true);
    };
    xhr.send();
  }


  filterElement.classList.remove('invisible');
})();
