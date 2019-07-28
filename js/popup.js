'use strict';

(function () {
  var elementMain = document.querySelector('main');
  var objectShown = null;

  function onKeyUp(evt) {
    evt.stopPropagation();
    if (evt.keyCode === 27 && !objectShown.classList.contains('img-upload__message')) {
      hide();
    }
  }

  function show(messageObject) {
    document.addEventListener('keyup', onKeyUp);
    objectShown = messageObject;
    elementMain.appendChild(messageObject);
  }

  function hide() {
    if (!objectShown.classList.contains('img-upload__message')) {
      document.removeEventListener('keyup', onKeyUp);
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
