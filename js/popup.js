'use strict';

(function () {
  var elementMain = document.querySelector('main');
  var downloadErrorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  var downloadErrorButtons = downloadErrorMessage.querySelectorAll('.error__button');
  var uploadErrorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  var uploadErrorButtons = uploadErrorMessage.querySelectorAll('.error__button');
  var uploadSuccessMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  var uploadSuccessButton = uploadSuccessMessage.querySelector('.success__button');
  var uploadMessage = document.querySelector('#messages').content.querySelector('.img-upload__message').cloneNode(true);
  var messageTypeShown = '';

  function onKeyUp(evt) {
    evt.stopPropagation();
    if (evt.keyCode === 27 && messageTypeShown !== 'uploadMessage') {
      hide();
    }
  }

  function show(type) {
    switch (type) {
      case 'downloadError':
        elementMain.appendChild(downloadErrorMessage);
        break;
      case 'uploadError':
        elementMain.appendChild(uploadErrorMessage);
        break;
      case 'uploadSuccess':
        elementMain.appendChild(uploadSuccessMessage);
        break;
      case 'uploadMessage':
        elementMain.appendChild(uploadMessage);
        break;
    }
    document.addEventListener('keyup', onKeyUp);
    messageTypeShown = type;
  }

  function hide() {
    switch (messageTypeShown) {
      case 'downloadError':
        elementMain.removeChild(downloadErrorMessage);
        break;
      case 'uploadError':
        elementMain.removeChild(uploadErrorMessage);
        break;
      case 'uploadSuccess':
        elementMain.removeChild(uploadSuccessMessage);
        break;
      case 'uploadMessage':
        elementMain.removeChild(uploadMessage);
        break;
    }
    document.removeEventListener('keyup', onKeyUp);
    messageTypeShown = '';
  }

  downloadErrorButtons[1].textContent = 'Ну и ладно!';
  downloadErrorButtons[0].addEventListener('click', function () {
    hide();
    window.gallery.getData();
  });
  downloadErrorButtons[1].addEventListener('click', hide);
  downloadErrorMessage.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('error')) {
      hide();
    }
  });

  uploadErrorButtons[0].addEventListener('click', function () {
    hide();
    window.form.send();
  });
  uploadErrorButtons[1].addEventListener('click', function () {
    hide();
    window.form.close();
  });
  uploadErrorMessage.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('error')) {
      hide();
      window.form.close();
    }
  });

  uploadSuccessButton.addEventListener('click', function () {
    hide();
    window.form.close();
  });
  uploadSuccessMessage.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('success')) {
      hide();
      window.form.close();
    }
  });

  window.popup = {
    show: show,
    hide: hide
  };

})();
