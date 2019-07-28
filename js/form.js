'use strict';

// добавление фото для редактирования и закрытие формы редактирования

(function () {
  var uploadURL = 'https://js.dump.academy/kekstagram';
  var overlayPhoto = document.querySelector('.img-upload__overlay');
  var effectLevel = document.querySelector('.effect-level');
  var uploadPhoto = document.querySelector('#upload-file');
  var inputComments = document.querySelector('.text__description');
  var onCloseClick = document.querySelector('#upload-cancel');
  var submitButton = document.querySelector('#upload-submit');
  var loadPicture = document.querySelector('.img-upload__preview img');
  var effectType = 'none';
  var form = document.querySelector('#upload-select-image');
  var uploadErrorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  var uploadErrorButtons = uploadErrorMessage.querySelectorAll('.error__button');
  var uploadSuccessMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  var uploadSuccessButton = uploadSuccessMessage.querySelector('.success__button');
  var uploadMessage = document.querySelector('#messages').content.querySelector('.img-upload__message').cloneNode(true);

  function onKeyUp(evt) {
    if (evt.keyCode === 27 && document.activeElement !== inputComments) {
      closeEditPhoto();
    }
  }

  function readFile(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (evt) {
        loadPicture.src = evt.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  function sendFormData() {
    var formData = new FormData(form);
    window.popup.show(uploadMessage);
    window.backend.sendDataToServer(uploadURL, formData, onUploadSuccess, onUploadError);
  }

  function openEditPhoto() {
    overlayPhoto.classList.remove('hidden');
    window.addEventListener('keyup', onKeyUp);
    window.slider.fillValues();
    applyEffectDepth(100);
    effectLevel.classList.add('hidden');
    window.filter.resetLoadPicture();
  }

  function onUploadError(message) {
    window.console.error(message);
    window.popup.hide();
    window.popup.show(uploadErrorMessage);
  }

  function onUploadSuccess(data) {
    if (!data || !data.length) {
      onUploadError('Сервер прислал пустые данные');
    }
    window.popup.hide();
    window.popup.show(uploadSuccessMessage);
  }

  function closeEditPhoto() {
    form.reset();
    overlayPhoto.classList.add('hidden');
    loadPicture.src = '';
    window.removeEventListener('keyup', onKeyUp);
  }

  function applyEffectDepth(value) {
    var effectTypeValue;
    switch (effectType) {
      case 'chrome':
        effectTypeValue = 'grayscale(' + (value / 100) + ')';
        break;
      case 'sepia':
        effectTypeValue = 'sepia(' + (value / 100) + ')';
        break;
      case 'marvin':
        effectTypeValue = 'invert(' + value + '%)';
        break;
      case 'phobos':
        effectTypeValue = 'blur(' + (value * 3) / 100 + 'px)';
        break;
      case 'heat':
        effectTypeValue = 'brightness(' + (((value * 2) / 100) + 1) + ')';
        break;
    }
    loadPicture.style.filter = effectTypeValue;
  }

  uploadPhoto.addEventListener('change', function () {
    openEditPhoto();
  });

  onCloseClick.addEventListener('click', function () {
    closeEditPhoto();
  });

  submitButton.addEventListener('click', function (evt) {
    if (form.checkValidity()) {
      evt.preventDefault();
      sendFormData();
    }
  });

  uploadSuccessButton.addEventListener('click', function () {
    window.popup.hide();
    window.form.close();
  });
  uploadSuccessMessage.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('success')) {
      window.popup.hide();
      window.form.close();
    }
  });

  uploadErrorButtons[0].addEventListener('click', function () {
    window.popup.hide();
    window.form.send();
  });
  uploadErrorButtons[1].addEventListener('click', function () {
    window.popup.hide();
    window.form.close();
  });
  uploadErrorMessage.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('error')) {
      window.popup.hide();
      window.form.close();
    }
  });

  document.querySelectorAll('.effects__radio').forEach(function (radioButton) {
    radioButton.addEventListener('change', function () {
      effectType = radioButton.value;
      window.filter.effectsWorker(radioButton);
    });
  });

  loadPicture.src = '';

  window.hashtags.hashTagsInit();

  window.form = {
    readFile: readFile,
    applyEffectDepth: applyEffectDepth,
    send: sendFormData,
    close: closeEditPhoto
  };
})();
