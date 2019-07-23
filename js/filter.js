'use strict';

(function () {
  var loadPicture = document.querySelector('.img-upload__preview img');
  var effectLevel = document.querySelector('.effect-level');
  var effectValue;

  function resetLoadPicture() {
    loadPicture.className = '';
    loadPicture.style.filter = '';
  }

  function effectsWorker(radioButton) {
    if (radioButton.checked) {
      effectValue = 100;
      window.slider.setEffectValue(effectValue);
      resetLoadPicture();
      loadPicture.classList.add('effects__preview--' + radioButton.value);
      effectLevel.classList.toggle('hidden', radioButton.value === 'none');
    }
  }

  window.filter = {
    resetLoadPicture: resetLoadPicture,
    effectsWorker: effectsWorker
  };
})();

