'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  window.gallery = {
    picturesData: []
  };

  function generatePicture(imageData) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = imageData.url;
    pictureElement.querySelector('.picture__likes').textContent = imageData.likes.toString();
    pictureElement.querySelector('.picture__comments').textContent = imageData.comments.length.toString();
    return pictureElement;
  }

  window.renderPictures = function (picturesData) {
    if (picturesData === null || picturesData === undefined) {
      return;
    }
    if (picturesData.length <= 0) {
      return;
    }
    var pictures = document.querySelector('.pictures');
    var imgUpload = document.querySelector('.img-upload');
    var picturesTitle = document.querySelector('.pictures__title');

    while (pictures.firstChild) {
      pictures.removeChild(pictures.firstChild);
    }
    pictures.append(picturesTitle);
    pictures.append(imgUpload);

    var fragment = document.createDocumentFragment();
    picturesData.forEach(function (image) {
      fragment.appendChild(generatePicture(image));
    });
    pictures.appendChild(fragment);
  };

  var onError = function (message) {
    window.console.error(message);
    window.showMessage('error', 'Не удалось загрузить изображения', [function () {
      window.getDataFromServer(URL, onSuccess, onError);
    }], ['Попробовать снова', 'Ну и ладно!']);
  };

  var onSuccess = function (data) {
    if (data.length <= 0) {
      onError('Сервер прислал пустые данные');
    }
    window.gallery.picturesData = data;
    window.renderPictures(data);
    window.initPicturesFilter();
  };

  window.getDataFromServer(URL, onSuccess, onError);
})();
