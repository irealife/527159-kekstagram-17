'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var picturesData;

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var onError = function (message) {
    window.console.error(message);
  };

  var onSuccess = function (data) {
    picturesData = data;
    renderPictures();
  };

  function generatePicture(imageData) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = imageData.url;
    pictureElement.querySelector('.picture__likes').textContent = imageData.likes.toString();
    pictureElement.querySelector('.picture__comments').textContent = imageData.comments.length.toString();
    return pictureElement;
  }

  function renderPictures() {

    var fragment = document.createDocumentFragment();
    var pictures = document.querySelector('.pictures');
    picturesData.forEach(function (image) {
      fragment.appendChild(generatePicture(image));
    });
    pictures.appendChild(fragment);
  }

  window.getDataFromServer(URL, onSuccess, onError);
})();
