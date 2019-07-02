'use strict';

// добавляет случайные изображения пользователей

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesData;

  function getDataFromServer() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', URL, true);
    xhr.onload = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          picturesData = JSON.parse(xhr.responseText);
          renderPictures();
        } else {
          console.error(xhr.statusText);
        }
      }
    };
    xhr.onerror = function () {
      console.error(xhr.statusText);
    };
    xhr.send();
  }

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

  getDataFromServer();
})();
