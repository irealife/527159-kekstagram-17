'use strict';

// Наложение эффекта

(function () {
  var loadPicture = window.form.loadPicture;
  // var effectType;
  // var effectValue;

  window.applyEffectDepth = function (value) {
    var effectTypeValue;
    switch (window.form.effectType) {
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
    // console.log(effectValue);
    loadPicture.style.filter = effectTypeValue;
  };
})();

