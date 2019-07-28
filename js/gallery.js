'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictures = document.querySelector('.pictures');
  var downloadErrorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  var downloadErrorButtons = downloadErrorMessage.querySelectorAll('.error__button');

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
    window.popup.show(downloadErrorMessage);
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

  downloadErrorButtons[1].textContent = 'Ну и ладно!';
  downloadErrorButtons[0].addEventListener('click', function () {
    window.popup.hide();
    window.gallery.getData();
  });
  downloadErrorButtons[1].addEventListener('click', window.popup.hide);
  downloadErrorMessage.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('error')) {
      window.popup.hide();
    }
  });

  getData();

  window.gallery = {
    picturesData: [],
    getData: getData,
    renderPictures: renderPictures
  };
})();
