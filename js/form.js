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
var nameLabel = formElement.querySelector('.review-fields-name');
var commentInput = formElement['review-text'];
var commentLabel = formElement.querySelector('.review-fields-text');
var reviewFields = formElement.querySelector('.review-fields');
var reviewGroup = document.getElementsByName('review-mark');

// получение значений из cookie и установка значений полей
nameInput.value = docCookies.getItem('name');
var checkValueCookie = docCookies.getItem('checkValue');
if (checkValueCookie !== '') {
  for (var i = 0; i < reviewGroup.length; i++) {
    if (reviewGroup[i].type === 'radio' && reviewGroup[i].value === checkValueCookie) {
      reviewGroup[i].checked = true;
    }
  }
}

//проверка валидации при загрузке
reviewSubmit.disabled = !formValidate();
//переопределение событий onchange/oninput
for (var n = 0; n < reviewGroup.length; n++) {
  if (reviewGroup[n].type === 'radio') {
    reviewGroup[n].onchange = function() {
      reviewSubmit.disabled = !formValidate();
    };
  }
}
nameInput.oninput = function() {
  reviewSubmit.disabled = !formValidate();
};
commentInput.oninput = function() {
  reviewSubmit.disabled = !formValidate();
};

//функция получения значения оценки
function getCheckValue() {
  var checkValue = 0;
  for (i = 0; i < reviewGroup.length; i++) {
    if (reviewGroup[i].type === 'radio' && reviewGroup[i].checked) {
      checkValue = parseInt(reviewGroup[i].value, 10);
    }
  }
  return checkValue;
}

function nameValidate() {
  if (nameInput.value !== '') {
    nameLabel.classList.add('invisible');
  } else {
    nameLabel.classList.remove('invisible');
  }
}

function commentValidate() {
  var checkValue = getCheckValue();
  if (commentInput.value !== '' || checkValue >= 3) {
    commentLabel.classList.add('invisible');
  } else {
    commentLabel.classList.remove('invisible');
  }
}

//функция проверки валидации формы
function formValidate() {
  nameValidate();
  commentValidate();
  if (nameLabel.classList.contains('invisible') && commentLabel.classList.contains('invisible')) {
    reviewFields.classList.add('invisible');
    return true;
  } else {
    reviewFields.classList.remove('invisible');
    return false;
  }
}

//переопределение события onsubmit для записи значений в cookie
formElement.onsubmit = function(evt) {
  evt.preventDefault();
  var curDate = new Date();
  var birthDate = new Date(curDate.getFullYear(), 2, 23);
  if ((curDate - birthDate) < 0) {
    birthDate.setFullYear(curDate.getFullYear() - 1);
  }
  var dateToExpire = new Date(curDate.valueOf() + (curDate - birthDate));
  var formattedDateToExpire = dateToExpire.toUTCString();
  docCookies.setItem('name', nameInput.value, formattedDateToExpire);
  docCookies.setItem('checkValue', getCheckValue(), formattedDateToExpire);
  formElement.submit();
};

