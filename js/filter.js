'use strict';

(function () {
  var loadPicture = document.querySelector('.img-upload__preview img');
  var effectLevel = document.querySelector('.effect-level');
  var effectType = 'none';
  var effectValue;

  window.filter = {
    effectType: effectType
  };

  window.resetLoadPicture = function () {
    loadPicture.className = '';
    loadPicture.style.filter = '';
  };

  function effectsWorker(radioButton) {
    if (radioButton.checked) {
      window.filter.effectType = radioButton.value;
      effectValue = 100;
      window.setEffectValue(effectValue);
      window.resetLoadPicture();
      loadPicture.classList.add('effects__preview--' + radioButton.value);
      effectLevel.classList.toggle('hidden', radioButton.value === 'none');
    }
  }

  window.addEffectsActions = function () {
    document.querySelectorAll('.effects__radio').forEach(function (radioButton) {
      radioButton.addEventListener('change', function () {
        effectsWorker(radioButton);
      });
    });
  };
})();

