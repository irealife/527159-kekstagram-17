'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var timeout = 10000;

  window.backend = {
    picturesData: []
  };

  window.getDataFromServer = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = timeout;

    xhr.open('GET', url);
    xhr.send();
  };

  var onError = function (message) {
    window.console.error(message);
  };

  var onSuccess = function (data) {
    if (data.length <= 0) {
      onError('Сервер прислал пустые данные');
    }
    window.backend.picturesData = data;
    window.renderPictures(data);
  };

  window.getDataFromServer(URL, onSuccess, onError);
})();
