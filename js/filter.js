'use strict';

(function () {
  var loadPicture = document.querySelector('.img-upload__preview img');
  var effectLevel = document.querySelector('.effect-level');
  var effectType = 'none';
  var effectValue;

  window.filter = {
    effectType: effectType
  };

  function effectsWorker(radioButton) {
    if (radioButton.checked) {
      window.filter.effectType = radioButton.value;
      effectValue = 100;
      window.resetSlider(effectValue);
      loadPicture.className = '';
      loadPicture.style.filter = '';
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

