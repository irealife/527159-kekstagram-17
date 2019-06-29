'use strict';

// Редактирование фото (перетаскивание ползунка)

(function () {
  var dragging = false;
  var effectPin = window.form.effectPin;

  window.fillValues = function () {
    // minLeftPx = parseInt(document.querySelector('.img-upload__wrapper').offsetLeft + INDENT_LEFT, 10);
    // maxRightPx = parseInt(minLeftPx + document.querySelector('.effect-level__line').offsetWidth, 10);

    window.addEventListener('mouseup', function () {
      dragging = false;
    });

    effectPin.addEventListener('mousedown', function () {
      dragging = true;
    });

    window.addEffectsActions();
  };

  window.editPhoto = {
    dragging: dragging
  };
})();

