'use strict';

// Наложение эффекта

(function () {
  var loadPicture = document.querySelector('.img-upload__preview img');

  window.applyEffectDepth = function (value) {
    var effectTypeValue;
    switch (window.filter.effectType) {
      case 'chrome':
        effectTypeValue = 'grayscale(' + (value / 100) + ')';
        break;
      case 'sepia':
        effectTypeValue = 'sepia(' + (value / 100) + ')';
        break;
      case 'marvin':
        effectTypeValue = 'invert(' + value + '%)';
        break;
      case 'phobos':
        effectTypeValue = 'blur(' + (value * 3) / 100 + 'px)';
        break;
      case 'heat':
        effectTypeValue = 'brightness(' + (((value * 2) / 100) + 1) + ')';
        break;
    }
    loadPicture.style.filter = effectTypeValue;
  };
})();

