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
  /* элементы для сообщения "Загружаем" */
  var uploadMessage = document.querySelector('#messages').content.querySelector('.img-upload__message').cloneNode(true);
  var fragment = document.createDocumentFragment();
  var elementMain = document.querySelector('main');
  var errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  var errorButtons = errorMessage.querySelectorAll('.error__button');
  var successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  var successButton = successMessage.querySelector('.success__button');

  function onKeyUp(evt) {
    if (evt.keyCode === 27 && document.activeElement !== inputComments) {
      closeEditPhoto();
    }
  }

  function sendFormData() {
    var formData = new FormData(form);
    /* вывод сообщения "Загружаем" */
    fragment.appendChild(uploadMessage);
    elementMain.appendChild(fragment);

    window.backend.sendDataToServer(uploadURL, formData, onUploadSuccess, onUploadError);
  }

  function openEditPhoto() {
    overlayPhoto.classList.remove('hidden');
    document.addEventListener('keyup', onKeyUp);
    window.slider.fillValues();
    applyEffectDepth(100);
    effectLevel.classList.add('hidden');
    window.filter.resetLoadPicture();
  }

  function onUploadError(message) {
    window.console.error(message);
    /* скрытие сообщения "Загружаем" */
    elementMain.removeChild(uploadMessage);

    document.addEventListener('keyup', hideErrorMessage);
    elementMain.appendChild(errorMessage);
  }

  function onUploadSuccess(data) {
    if (!data || !data.length) {
      onUploadError('Сервер прислал пустые данные');
    }
    /* скрытие сообщения "Загружаем" */
    elementMain.removeChild(uploadMessage);

    document.addEventListener('keyup', onKeyUp);
    elementMain.appendChild(successMessage);
  }

  function hideErrorMessage(evt) {
    evt.stopPropagation();
    document.removeEventListener('keyup', hideErrorMessage);
    elementMain.removeChild(errorMessage);
  }

  function hideSuccessMessage() {
    elementMain.removeChild(successMessage);
    closeEditPhoto();
  }

  function closeEditPhoto() {
    form.reset();
    overlayPhoto.classList.add('hidden');
    document.removeEventListener('keyup', onKeyUp);
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

  errorButtons[0].addEventListener('click', function (evt) {
    hideErrorMessage(evt);
    sendFormData();
  });
  errorButtons[1].addEventListener('click', function (evt) {
    hideErrorMessage(evt);
    closeEditPhoto();
  });

  successButton.addEventListener('click', function (evt) {
    hideSuccessMessage(evt);
    closeEditPhoto();
  });
  successMessage.addEventListener('click', hideSuccessMessage);

  document.querySelectorAll('.effects__radio').forEach(function (radioButton) {
    radioButton.addEventListener('change', function () {
      effectType = radioButton.value;
      window.filter.effectsWorker(radioButton);
    });
  });

  window.hashtags.hashTagsInit();

  window.form = {
    applyEffectDepth: applyEffectDepth
  };
})();
