'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictures = document.querySelector('.pictures');

  function generatePicture(imageData) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = imageData.url;
    pictureElement.querySelector('.picture__likes').textContent = imageData.likes.toString();
    pictureElement.querySelector('.picture__comments').textContent = imageData.comments.length.toString();
    pictureElement.addEventListener('click', function () {
      window.pictureView.showBigPicture(imageData);
    });
    return pictureElement;
  }

  function renderPictures(picturesData) {
    var allPictures = pictures.querySelectorAll('.picture');
    allPictures.forEach(function (picture) {
      pictures.removeChild(picture);
    });

    var fragment = document.createDocumentFragment();
    picturesData.forEach(function (image) {
      fragment.appendChild(generatePicture(image));
    });
    pictures.appendChild(fragment);
  }

  function onError(message) {
    window.console.error(message);
    window.popup.show('downloadError');
  }

  function onSuccess(data) {
    if (!data || !data.length) {
      onError('Сервер прислал пустые данные');
    } else {
      window.gallery.picturesData = data;
      renderPictures(data);
      window.galleryFilter.initPicturesFilter();
    }
  }

  function getData() {
    window.backend.getDataFromServer(URL, onSuccess, onError);
  }

  getData();

  window.gallery = {
    picturesData: [],
    getData: getData,
    renderPictures: renderPictures
  };
})();
