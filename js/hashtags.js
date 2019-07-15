'use strict';

(function () {
  var hashTagsArray = [];
  var validHashTagsArray = [];
  var hashTagsString;

  window.hashTagsInit = function () {
    hashTagsString = document.querySelector('.text__hashtags');
    hashTagsString.addEventListener('change', function () {
      hashTagsCheck();
    });
  };

  function hashTagsCheck() {
    validHashTagsArray = [];
    hashTagsArray = hashTagsString.value.toLowerCase().split(' ');
    for (var i = 0; i < hashTagsArray.length; i++) {
      if (!hashTagItemCheck(hashTagsArray[i])) {
        break;
      } else {
        validHashTagsArray.push(hashTagsArray[i]);
      }
    }
  }

  function hashTagItemCheck(tag) {
    var validity = false;
    hashTagsString.classList.remove('field-error');
    hashTagsString.setCustomValidity('');

    if (tag.length < 1 && validity) {
      hashTagsString.classList.add('field-error');
      return !validity;
    }

    if (tag[0] !== '#') {
      hashTagsString.setCustomValidity('хештег должен начинаться с символа #');
    } else if (tag.length === 1 && tag[0] === '#') {
      hashTagsString.setCustomValidity('хештег не должен состоять только из символа #');
    } else if (hashTagsArray.length > 5) {
      hashTagsString.setCustomValidity('не должно быть более 5 хэштегов');
    } else if (tag.length > 20) {
      hashTagsString.setCustomValidity('длина хештега не должна быть более 20 символов');
    } else if (validHashTagsArray.includes(tag)) {
      hashTagsString.setCustomValidity('хештеги не должны повторяться');
    }

    return !validity;
  }
})();
