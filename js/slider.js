'use strict';

// Слайдер

(function () {
  var INDENT_LEFT = 68;
  var effectVal;
  var effectPin = document.querySelector('.effect-level__pin');
  var effectDepth = document.querySelector('.effect-level__depth');
  var maxRightPx;
  var minLeftPx;
  var dragging = false;
  var effectValue;

  window.fillValues = function () {
    effectVal = document.querySelector('.effect-level__value');

    minLeftPx = parseInt(document.querySelector('.img-upload__wrapper').offsetLeft + INDENT_LEFT, 10);
    maxRightPx = parseInt(minLeftPx + document.querySelector('.effect-level__line').offsetWidth, 10);

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
      window.applyEffectDepth(effectValue);
    }
  }

  window.addEventListener('mousemove', function (evt) {
    handleSlider(evt.clientX);
  });
})();

