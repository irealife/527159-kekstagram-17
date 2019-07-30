'use strict';

(function () {
  var TIMEOUT = 10000;
  var RESPONSE_OK = 200;

  function setXHRMethods(object, onSuccess, onError) {
    object.timeout = TIMEOUT;

    object.addEventListener('load', function () {
      if (object.status === RESPONSE_OK) {
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
  }

  function getDataFromServer(url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    setXHRMethods(xhr, onSuccess, onError);

    xhr.open('GET', url);
    xhr.send();
  }

  function sendDataToServer(url, data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    setXHRMethods(xhr, onSuccess, onError);

    xhr.open('POST', url);
    xhr.send(data);
  }

  window.backend = {
    getData: getDataFromServer,
    sendData: sendDataToServer
  };
})();
