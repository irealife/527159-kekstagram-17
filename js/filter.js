'use strict';

(function () {
  var loadPicture = document.querySelector('.img-upload__preview img');
  var effectLevel = document.querySelector('.effect-level');
  var effectValue;

  window.resetLoadPicture = function () {
    loadPicture.className = '';
    loadPicture.style.filter = '';
  };

  window.effectsWorker = function (radioButton) {
    if (radioButton.checked) {
      effectValue = 100;
      window.setEffectValue(effectValue);
      window.resetLoadPicture();
      loadPicture.classList.add('effects__preview--' + radioButton.value);
      effectLevel.classList.toggle('hidden', radioButton.value === 'none');
    }
  };
})();

