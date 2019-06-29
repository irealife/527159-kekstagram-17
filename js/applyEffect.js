'use strict';

// Наложение эффекта

(function () {

  var effectType = window.form.effectType;
  var effectValue = window.form.effectValue;
  var loadPicture = window.form.loadPicture;

  window.applyEffectDepth = function () {
    var effectTypeValue;
    switch (effectType) {
      case 'chrome':
        effectTypeValue = 'grayscale(' + (effectValue / 100) + ')';
        break;
      case 'sepia':
        effectTypeValue = 'sepia(' + (effectValue / 100) + ')';
        break;
      case 'marvin':
        effectTypeValue = 'invert(' + effectValue + '%)';
        break;
      case 'phobos':
        effectTypeValue = 'blur(' + (effectValue * 3) / 100 + 'px)';
        break;
      case 'heat':
        var value = ((effectValue * 2) / 100) + 1;
        effectTypeValue = 'brightness(' + value + ')';
        break;
    }
    loadPicture.style.filter = effectTypeValue;
  };
})();

