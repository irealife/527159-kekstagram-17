'use strict';

// Масштабирование фотографий

(function () {
  var STEP = 25;
  var MIN_SIZE = 25;
  var MAX_SIZE = 100;
  var SIZE_UP_MULTIPLIER = 1;
  var SIZE_DOWN_MULTIPLIER = -1;
  var currentSize = MAX_SIZE;
  var uploadPreviewPhoto = document.querySelector('.img-upload__preview');
  var controlSmall = document.querySelector('.scale__control--smaller');
  var controlBig = document.querySelector('.scale__control--bigger');
  var resizeValue = document.querySelector('.scale__control--value');

  function changeScale(size) {
    uploadPreviewPhoto.style.transform = 'scale(' + size / MAX_SIZE + ')';
  }

  function controlScale(direction) {
    currentSize = currentSize + STEP * direction;
    if (currentSize < MIN_SIZE) {
      currentSize = MIN_SIZE;
    } else if (currentSize > MAX_SIZE) {
      currentSize = MAX_SIZE;
    }
    resizeValue.value = currentSize + '%';
    changeScale(currentSize);
  }

  controlSmall.addEventListener('click', function () {
    controlScale(SIZE_DOWN_MULTIPLIER);
  });

  controlBig.addEventListener('click', function () {
    controlScale(SIZE_UP_MULTIPLIER);
  });
})();
