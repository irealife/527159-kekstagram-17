'use strict';

// Масштабирование фотографий

(function () {
  var STEP = 25;
  var MIN_SIZE = 25;
  var MAX_SIZE = 100;
  var currentSize = 100;
  var uploadPreviewPhoto = document.querySelector('.img-upload__preview');
  var controlSmall = document.querySelector('.scale__control--smaller');
  var controlBig = document.querySelector('.scale__control--bigger');
  var resizeValue = document.querySelector('.scale__control--value');

  function changeScale(size) {
    uploadPreviewPhoto.style.transform = 'scale(' + size / 100 + ')';
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
    controlScale(-1);
  });

  controlBig.addEventListener('click', function () {
    controlScale(1);
  });
})();

