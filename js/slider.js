'use strict';

// Слайдер

(function () {
  var INDENT_LEFT = 68;
  var effectPinElement = document.querySelector('.effect-level__pin');
  var effectDepthElement = document.querySelector('.effect-level__depth');
  var effectValueElement = document.querySelector('.effect-level__value');
  var maxRightPx;
  var minLeftPx;
  var dragging = false;

  function fillValues() {
    minLeftPx = parseInt(document.querySelector('.img-upload__wrapper').offsetLeft + INDENT_LEFT, 10);
    maxRightPx = parseInt(minLeftPx + document.querySelector('.effect-level__line').offsetWidth, 10);
  }

  function setEffectValue(value) {
    effectPinElement.style.left = '' + value + '%';
    effectDepthElement.style.width = '' + value + '%';
    effectValueElement.value = value;
  }

  function handleSlider(mouseX) {
    if (dragging && mouseX >= minLeftPx && mouseX <= maxRightPx) {
      var offset = Math.floor(mouseX - minLeftPx);
      var width = maxRightPx - minLeftPx;
      var effectValue = Math.floor((offset * 100) / width);
      setEffectValue(effectValue);
      window.form.applyEffectDepth(effectValue);
    }
  }

  window.addEventListener('mouseup', function () {
    dragging = false;
  });

  window.addEventListener('mousemove', function (evt) {
    handleSlider(evt.clientX);
  });

  effectPinElement.addEventListener('mousedown', function () {
    dragging = true;
  });

  window.slider = {
    fillValues: fillValues,
    setEffectValue: setEffectValue
  };
})();
