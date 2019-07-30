'use strict';

// добавление фото для редактирования и закрытие формы редактирования

(function () {
  var ESCAPE_KEY_CODE = 27;
  var MAX_EFFECT_DEPTH = 100;
  var BLUR_MULTIPLIER = 3;
  var BRIGHTNESS_MULTIPLIER = 2;
  var BRIGHTNESS_ADDENDUM = 1;
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

  function onWindowKeyUp(evt) {
    if (evt.keyCode === ESCAPE_KEY_CODE && document.activeElement !== inputComments) {
      closeEditPhoto();
    }
  }

  function onReaderLoad(evt) {
    loadPicture.src = evt.target.result;
  }

  function readFile(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.addEventListener('load', onReaderLoad);
      reader.readAsDataURL(input.files[0]);
    }
  }

  function sendFormData() {
    var formData = new FormData(form);
    window.popup.show(uploadMessage);
    window.backend.sendData(uploadURL, formData, onUploadSuccess, onUploadError);
  }

  function openEditPhoto() {
    overlayPhoto.classList.remove('hidden');
    window.addEventListener('keyup', onWindowKeyUp);
    window.slider.fillValues();
    applyEffectDepth(MAX_EFFECT_DEPTH);
    effectLevel.classList.add('hidden');
    window.filter.resetPicture();
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
    window.removeEventListener('keyup', onWindowKeyUp);
  }

  function applyEffectDepth(value) {
    var effectTypeValue;
    switch (effectType) {
      case 'chrome':
        effectTypeValue = 'grayscale(' + (value / MAX_EFFECT_DEPTH) + ')';
        break;
      case 'sepia':
        effectTypeValue = 'sepia(' + (value / MAX_EFFECT_DEPTH) + ')';
        break;
      case 'marvin':
        effectTypeValue = 'invert(' + value + '%)';
        break;
      case 'phobos':
        effectTypeValue = 'blur(' + (value * BLUR_MULTIPLIER) / MAX_EFFECT_DEPTH + 'px)';
        break;
      case 'heat':
        effectTypeValue = 'brightness(' + (((value * BRIGHTNESS_MULTIPLIER) / MAX_EFFECT_DEPTH) + BRIGHTNESS_ADDENDUM) + ')';
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
      window.filter.applyEffect(radioButton);
    });
  });

  loadPicture.src = '';

  window.form = {
    readFile: readFile,
    applyEffectDepth: applyEffectDepth,
    send: sendFormData,
    close: closeEditPhoto,
    pictureElement: loadPicture,
    pictureEffectLevelElement: effectLevel
  };
})();
