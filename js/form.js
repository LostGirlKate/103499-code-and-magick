'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };
})();

var formElement = document.querySelector('.review-form');
var reviewSubmit = formElement.querySelector('.review-submit');
var nameInput = formElement['review-name'];
var commentInput = formElement['review-text'];
var reviewGroup = document.getElementsByName('review-mark');

reviewSubmit.setAttribute('disabled', true);


function formValidate() {
  var nameLabel = formElement.querySelector('.review-fields-name');
  var commentLabel = formElement.querySelector('.review-fields-text');
  var reviewFields = formElement.querySelector('.review-fields');
  var checkValue = 0;
  for (var i = 0; i < reviewGroup.length; i++) {
    if (reviewGroup[i].type === 'radio' && reviewGroup[i].checked) {
      checkValue = parseInt(reviewGroup[i].value, 10);
    }
  }
  if ((nameInput.value !== '') && ((checkValue >= 3) || ((checkValue < 3) && (commentInput.value !== '')))) {
    reviewFields.setAttribute('class', 'review-form-control review-fields invisible');
    reviewSubmit.removeAttribute('disabled');
  } else {
    reviewFields.setAttribute('class', 'review-form-control review-fields');
    reviewSubmit.setAttribute('disabled', true);
  }
  if (nameInput.value !== '') {
    nameLabel.setAttribute('class', 'review-fields-label review-fields-name invisible');
  } else {
    nameLabel.setAttribute('class', 'review-fields-label review-fields-name');
  }
  if (commentInput.value !== '' || checkValue >= 3) {
    commentLabel.setAttribute('class', 'review-fields-label review-fields-text invisible');
  } else {
    commentLabel.setAttribute('class', 'review-fields-label review-fields-text');
  }
}

for (var n = 0; n < reviewGroup.length; n++) {
  if (reviewGroup[n].type === 'radio') {
    reviewGroup[n].onchange = function() {
      formValidate();
    };
  }
}
nameInput.oninput = function() {
  formValidate();
};
commentInput.oninput = function() {
  formValidate();
};
