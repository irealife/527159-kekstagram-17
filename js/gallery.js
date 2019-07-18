'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictures = document.querySelector('.pictures');

  window.gallery = {
    picturesData: []
  };

  function generatePicture(imageData) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = imageData.url;
    pictureElement.querySelector('.picture__likes').textContent = imageData.likes.toString();
    pictureElement.querySelector('.picture__comments').textContent = imageData.comments.length.toString();
    pictureElement.addEventListener('click', function () {
      window.showBigPicture(imageData);
    });
    return pictureElement;
  }

  window.renderPictures = function (picturesData) {
    var allPictures = pictures.querySelectorAll('.picture');
    allPictures.forEach(function (picture) {
      pictures.removeChild(picture);
    });

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
    if (!data || !data.length) {
      onError('Сервер прислал пустые данные');
    } else {
      window.gallery.picturesData = data;
      window.renderPictures(data);
      window.initPicturesFilter();
    }
  };

  window.getDataFromServer(URL, onSuccess, onError);

})();
