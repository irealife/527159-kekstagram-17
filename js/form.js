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

  function onEditPhotoEscPress(evt) {
    if (evt.keyCode === 27 && document.activeElement !== inputComments) {
      closeEditPhoto();
    }
  }

  function sendFormData() {
    var formData = new FormData(form);
    /* вывод сообщения "Загружаем" */
    fragment.appendChild(uploadMessage);
    elementMain.appendChild(fragment);

    window.sendDataToServer(uploadURL, formData, uploadSuccess, uploadError);
  }

  function openEditPhoto() {
    overlayPhoto.classList.remove('hidden');
    document.addEventListener('keydown', onEditPhotoEscPress);
    window.fillValues();
    window.applyEffectDepth(100);
    effectLevel.classList.add('hidden');
    window.resetLoadPicture();
    submitButton.addEventListener('click', function () {
      if (form.checkValidity()) {
        sendFormData();
      }
    });
  }

  var uploadError = function (message) {
    window.console.error(message);
    /* скрытие сообщения "Загружаем" */
    elementMain.removeChild(uploadMessage);

    window.showMessage('error', message, [sendFormData, closeEditPhoto]);
  };

  var uploadSuccess = function (data) {
    if (!data || !data.length) {
      uploadError('Сервер прислал пустые данные');
    }
    /* скрытие сообщения "Загружаем" */
    elementMain.removeChild(uploadMessage);

    window.showMessage('success', 'Данные отправлены', [closeEditPhoto]);
  };

  function closeEditPhoto() {
    form.reset();
    overlayPhoto.classList.add('hidden');
    document.removeEventListener('keydown', onEditPhotoEscPress);
    submitButton.removeEventListener('click', sendFormData);
  }

  uploadPhoto.addEventListener('change', function () {
    openEditPhoto();
  });

  onCloseClick.addEventListener('click', function () {
    closeEditPhoto();
  });

  window.applyEffectDepth = function (value) {
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
  };

  document.querySelectorAll('.effects__radio').forEach(function (radioButton) {
    radioButton.addEventListener('change', function () {
      effectType = radioButton.value;
      window.effectsWorker(radioButton);
    });
  });

  window.hashTagsInit();
})();
