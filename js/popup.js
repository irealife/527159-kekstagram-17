'use strict';

(function () {
  var ESCAPE_KEY_CODE = 27;
  var elementMain = document.querySelector('main');
  var objectShown = null;

  function onDocumentKeyUp(evt) {
    evt.stopPropagation();
    if (evt.keyCode === ESCAPE_KEY_CODE && !objectShown.classList.contains('img-upload__message')) {
      hide();
    }
  }

  function show(messageElement) {
    document.addEventListener('keyup', onDocumentKeyUp);
    objectShown = messageElement;
    elementMain.appendChild(messageElement);
  }

  function hide() {
    if (!objectShown.classList.contains('img-upload__message')) {
      document.removeEventListener('keyup', onDocumentKeyUp);
    }
    if (objectShown !== null) {
      elementMain.removeChild(objectShown);
    }
    objectShown = null;
  }

  window.popup = {
    show: show,
    hide: hide
  };

})();
