'use strict';

// Масштабирование фотографий

(function () {
  var MIN_SIZE = 25;
  var MAX_SIZE = window.form.MAX_SIZE;
  var STEP = 25;
  var uploadPreviewPhoto = document.querySelector('.img-upload__preview');
  var controlSmall = document.querySelector('.scale__control--smaller');
  var controlBig = document.querySelector('.scale__control--bigger');
  var currentSize = window.form.currentSize;
  var resizeValue = window.form.resizeValue;

  function changeScale() {
    uploadPreviewPhoto.style.transform = 'scale(' + currentSize / 100 + ')';
  }

  controlSmall.addEventListener('click', function () {
    controlScale(-1);
  });

  controlBig.addEventListener('click', function () {
    controlScale(1);
  });

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
})();

