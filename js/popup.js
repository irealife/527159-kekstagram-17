'use strict';

(function () {
  var elementMain = document.querySelector('main');
  var objectShown = 'none';

  function onKeyUp(evt) {
    evt.stopPropagation();
    if (evt.keyCode === 27 && !objectShown.classList.contains('img-upload__message')) {
      hide();
    }
  }

  function show(object) {
    document.addEventListener('keyup', onKeyUp);
    objectShown = object;
    elementMain.appendChild(object);
  }

  function hide() {
    if (!objectShown.classList.contains('img-upload__message')) {
      document.removeEventListener('keyup', onKeyUp);
    }
    if (objectShown !== 'none') {
      elementMain.removeChild(objectShown);
    }
    objectShown = 'none';
  }

  window.popup = {
    show: show,
    hide: hide
  };

})();
