'use strict';

(function () {
  // var effectValue;
  var loadPicture = document.querySelector('.img-upload__preview img');
  // var effectPin = document.querySelector('.effect-level__pin');
  // var effectDepth = document.querySelector('.effect-level__depth');
  var effectLevel = document.querySelector('.effect-level');
  var effectType = 'none';

  window.filter = {
    effectType: effectType
  };

  function effectsWorker(radioButton) {
    if (radioButton.checked) {
      window.filter.effectType = radioButton.value;
      window.resetSlider();
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

