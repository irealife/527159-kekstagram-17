'use strict';

// Слайдер

(function () {
  var INDENT_LEFT = 68;
  var maxRightPx = parseInt(document.querySelector('.img-upload__wrapper').offsetLeft + INDENT_LEFT, 10);
  var minLeftPx = parseInt(minLeftPx + document.querySelector('.effect-level__line').offsetWidth, 10);
  var dragging = false;
  var effectPin = window.form.effectPin;
  var effectDepth = window.form.effectDepth;
  var effectVal = document.querySelector('.effect-level__value');
  var effectValue = window.form.effectValue;

  window.fillValues = function () {
    window.addEventListener('mouseup', function () {
      dragging = false;
    });

    effectPin.addEventListener('mousedown', function () {
      dragging = true;
    });

    window.addEffectsActions();
  };
  function handleSlider(mouseX) {
    if (dragging && mouseX >= minLeftPx && mouseX <= maxRightPx) {
      var offset = Math.floor(mouseX - minLeftPx);
      var width = maxRightPx - minLeftPx;
      effectValue = Math.floor((offset * 100) / width);
      effectPin.style.left = effectValue + '%';
      effectDepth.style.width = effectValue + '%';
      effectVal.value = effectValue;
      window.applyEffectDepth();
    }
  }
  window.addEventListener('mousemove', function (evt) {
    handleSlider(evt.clientX);
  });
})();

