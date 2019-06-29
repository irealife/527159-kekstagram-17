'use strict';

(function () {
  var effectType = window.form.effectType;
  var effectValue = window.form.effectValue;
  var effectPin = window.form.effectPin;
  var effectDepth = window.form.effectDepth;
  var loadPicture = window.form.loadPicture;
  var effectLevel = window.form.effectLevel;

  function effectsWorker(radioButton) {
    if (radioButton.checked) {
      effectType = radioButton.value;
      effectValue = 100;
      effectPin.style.left = '' + effectValue + '%';
      effectDepth.style.width = '' + effectValue + '%';
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

