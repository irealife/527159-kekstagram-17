'use strict';

// добавление фото для редактирования и закрытие формы редактирования

(function () {
  var MAX_SIZE = 100;
  var overlayPhoto = document.querySelector('.img-upload__overlay');
  var effectValue;
  var effectPin = document.querySelector('.effect-level__pin');
  var effectDepth = document.querySelector('.effect-level__depth');
  var loadPicture = document.querySelector('.img-upload__preview img');
  var effectType = 'none';
  var effectLevel = document.querySelector('.effect-level');
  var uploadPhoto = document.querySelector('#upload-file');
  var inputComments = document.querySelector('.text__description');
  var resizeValue = document.querySelector('.scale__control--value');
  var onCloseClick = document.querySelector('#upload-cancel');
  var currentSize = 100;

  window.form = {
    effectPin: effectPin,
    effectDepth: effectDepth,
    loadPicture: loadPicture,
    currentSize: currentSize,
    resizeValue: resizeValue,
    effectType: effectType
  };

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
    window.applyEffectDepth(100);
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
})();
