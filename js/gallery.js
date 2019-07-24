'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictures = document.querySelector('.pictures');
  var elementMain = document.querySelector('main');
  var errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  var buttons = errorMessage.querySelectorAll('.error__button');

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
    document.addEventListener('keyup', onKeyUp);
    elementMain.appendChild(errorMessage);
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

  function hideMessage(evt) {
    evt.stopPropagation();
    document.removeEventListener('keyup', onKeyUp);
    elementMain.removeChild(errorMessage);
  }

  function onKeyUp(evt) {
    if (evt.keyCode === 27) {
      hideMessage(evt);
    }
  }

  buttons[1].textContent = 'Ну и ладно!';
  buttons[0].addEventListener('click', function (evt) {
    hideMessage(evt);
    window.backend.getDataFromServer(URL, onSuccess, onError);
  });
  buttons[1].addEventListener('click', hideMessage);
  errorMessage.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('error')) {
      hideMessage(evt);
    }
  });

  window.backend.getDataFromServer(URL, onSuccess, onError);

  window.gallery = {
    picturesData: [],
    renderPictures: renderPictures
  };

})();
