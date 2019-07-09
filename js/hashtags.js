'use strict';

(function () {
  var hastagsArray = [];
  var hastagsString;

  window.hashTagsInit = function () {
    hastagsString = document.querySelector('.text__hashtags');
    hastagsString.addEventListener('change', function () {
      hashTagsCheck();
    });
  };

  function hashTagsCheck() {
    hastagsArray = hastagsString.value.toLowerCase().split(' ');
    hastagsArray.forEach(function (hashTag) {
      hashTagItemCheck(hashTag);
    });
  }

  function hashTagItemCheck(tag) {
    hastagsString.classList.toggle('field-error', false);
    hastagsString.setCustomValidity('');
    if (tag[0] !== '#') {
      hastagsString.setCustomValidity('хештег должен начинаться с символа #');
      hastagsString.classList.toggle('field-error', true);
    }

    if (tag.length < 1) {
      return;
    }

    if (tag.length === 1 && tag[0] === '#') {
      hastagsString.setCustomValidity('хештег не должен состоять только из символа #');
      hastagsString.classList.toggle('field-error', true);
    }

    var tmpTag = tag + ' ';
    if (hastagsString.value !== tmpTag && hastagsString.value.search(tmpTag) !== -1) {
      hastagsArray = makeUniqueTagsArray(hastagsArray);
      hastagsString.value = hastagsArray.join(' ');
    }

    if (hastagsArray.length > 5) {
      hastagsString.setCustomValidity('не должно быть более 5 хэштегов');
      hastagsString.classList.toggle('field-error', true);
    }

    if (tag.length > 20) {
      hastagsString.setCustomValidity('длина хештега не должна быть более 20 символов');
      hastagsString.classList.toggle('field-error', true);
    }
  }

  function makeUniqueTagsArray(array) {
    var obj = {};

    for (var i = 0; i < array.length; i++) {
      var str = array[i];
      obj[str] = true;
    }

    return Object.keys(obj);
  }
})();
