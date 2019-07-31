'use strict';

// Валидация

(function () {
  var MAX_COMMENT_LENGTH = 20;
  var MAX_COMMENT_COUNT = 5;
  var hashTagsArray = [];
  var validHashTagsArray = [];
  var hashTagsString = document.querySelector('.text__hashtags');

  function hashTagClearError() {
    hashTagsString.classList.remove('field-error');
    hashTagsString.setCustomValidity('');
  }

  function hashTagsCheck() {
    validHashTagsArray = [];
    hashTagsArray = hashTagsString.value.toLowerCase().split(' ');
    hashTagsArray.some(function (tag) {
      if (!hashTagItemCheck(tag)) {
        hashTagsString.classList.add('field-error');
        return true;
      } else {
        validHashTagsArray.push(tag);
        return false;
      }
    });
  }

  function hashTagItemCheck(tag) {
    var validity = false;
    hashTagClearError();

    if (tag.length < 1) {
      return !validity;
    }

    if (tag[0] !== '#') {
      hashTagsString.setCustomValidity('хештег должен начинаться с символа #');
    } else if (tag.length === 1 && tag[0] === '#') {
      hashTagsString.setCustomValidity('хештег не должен состоять только из символа #');
    } else if (hashTagsArray.length > MAX_COMMENT_COUNT) {
      hashTagsString.setCustomValidity('не должно быть более 5 хэштегов');
    } else if (tag.length > MAX_COMMENT_LENGTH) {
      hashTagsString.setCustomValidity('длина хештега не должна быть более 20 символов');
    } else if (validHashTagsArray.includes(tag)) {
      hashTagsString.setCustomValidity('хештеги не должны повторяться');
    } else {
      validity = true;
    }

    return validity;
  }

  hashTagsString.addEventListener('keyup', function () {
    hashTagClearError();
  });

  hashTagsString.addEventListener('change', function () {
    hashTagsCheck();
  });
})();
