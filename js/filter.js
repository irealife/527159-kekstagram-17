'use strict';

(function () {
  var EFFECT_MAX_VALUE = 100;

  function resetLoadPicture() {
    window.form.pictureElement.className = '';
    window.form.pictureElement.style.filter = '';
  }

  function applyEffect(radioButton) {
    if (radioButton.checked) {
      window.slider.setEffectValue(EFFECT_MAX_VALUE);
      resetLoadPicture();
      window.form.pictureElement.classList.add('effects__preview--' + radioButton.value);
      window.form.pictureEffectLevelElement.classList.toggle('hidden', radioButton.value === 'none');
    }
  }

  window.filter = {
    resetPicture: resetLoadPicture,
    applyEffect: applyEffect
  };
})();

