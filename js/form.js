'use strict';

// добавление фото для редактирования и закрытие формы редактирования

(function () {
  var MAX_SIZE = 100;

  var effectPin = document.querySelector('.effect-level__pin');
  var effectDepth = document.querySelector('.effect-level__depth');
  var effectValue;
  var currentSize = 100;
  var effectType = 'none';

  var uploadPhoto = document.querySelector('#upload-file');
  var overlayPhoto = document.querySelector('.img-upload__overlay');
  var onCloseClick = document.querySelector('#upload-cancel');
  var effectLevel = document.querySelector('.effect-level');

  var inputComments = document.querySelector('.text__description');
  var loadPicture = document.querySelector('.img-upload__preview img');
  var resizeValue = document.querySelector('.scale__control--value');

  function onEditPhotoEscPress(evt) {
    if (evt.keyCode === 27 && document.activeElement !== inputComments) {
      closeEditPhoto();
    }
  }

  function openEditPhoto() {
    overlayPhoto.classList.remove('hidden');
    document.addEventListener('keydown', onEditPhotoEscPress);
    window.fillValues();
    effectValue = 100;
    effectPin.style.left = '' + effectValue + '%';
    effectDepth.style.width = '' + effectValue + '%';
    loadPicture.className = '';
    loadPicture.style.filter = '';
    effectType = 'none';
    window.applyEffectDepth();
    effectLevel.classList.add('hidden');
  }

  function closeEditPhoto() {
    overlayPhoto.classList.add('hidden');
    document.removeEventListener('keydown', onEditPhotoEscPress);
    uploadPhoto.value = '';
    inputComments.value = '';
  }

  uploadPhoto.addEventListener('change', function () {
    openEditPhoto();
    currentSize = MAX_SIZE;
    resizeValue.value = currentSize + '%';
  });

  onCloseClick.addEventListener('click', function () {
    closeEditPhoto();
  });

  window.form = {
    MAX_SIZE: MAX_SIZE,
    effectPin: effectPin,
    effectDepth: effectDepth,
    currentSize: currentSize,
    effectLevel: effectLevel,
    effectValue: effectValue,
    effectType: effectType,
    loadPicture: loadPicture,
    resizeValue: resizeValue
  };
})();
