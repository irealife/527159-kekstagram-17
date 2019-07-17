'use strict';

(function () {
  var timeout = 10000;
  var elementMain = document.querySelector('main');

  function removeMessage(parent, element, callback) {
    parent.removeChild(element);
    if (callback !== null && callback !== undefined) {
      callback();
    }
  }

  window.showMessage = function (type, message, callbacks, buttonsTexts) {
    var element = document.querySelector('#' + type).content.querySelector('.' + type).cloneNode(true);
    var fragment = document.createDocumentFragment();
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        removeMessage(elementMain, element, callbacks[0].name);
      }
    });
    window.addEventListener('click', function (evt) {
      if (element === evt.target) {
        removeMessage(elementMain, element, callbacks[0].name);
      }
    });

    var buttons = element.querySelectorAll('.' + type + '__button');
    buttons.forEach(function (buttonItem, index) {
      if (buttonsTexts !== null && buttonsTexts !== undefined) {
        if (buttonsTexts[index] !== null && buttonsTexts[index] !== undefined) {
          buttonItem.innerHTML = buttonsTexts[index];
        }
      }
      buttonItem.addEventListener('click', function () {
        removeMessage(elementMain, element, callbacks[index]);
      });
    });

    if (message.length > 0) {
      element.querySelector('.' + type + '__inner').querySelector('.' + type + '__title').innerHTML = message;
    }

    fragment.appendChild(element);
    elementMain.appendChild(fragment);
  };

  function setXHRMethods(object, onSuccess, onError) {
    object.addEventListener('load', function () {
      if (object.status === 200) {
        onSuccess(object.response);
      } else {
        onError('Cтатус ответа: ' + object.status + ' ' + object.statusText);
      }
    });

    object.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    object.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + object.timeout + 'мс');
    });

    object.timeout = timeout;
  }

  window.getDataFromServer = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    setXHRMethods(xhr, onSuccess, onError);

    xhr.open('GET', url);
    xhr.send();
  };

  window.sendDataToServer = function (url, data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    setXHRMethods(xhr, onSuccess, onError);

    xhr.open('POST', url);
    xhr.send(data);
  };
})();
