'use strict';

// добавление фото для редактирования и закрытие формы редактирования

(function () {
  var overlayPhoto = document.querySelector('.img-upload__overlay');
  var loadPicture = document.querySelector('.img-upload__preview img');

  var effectLevel = document.querySelector('.effect-level');
  var uploadPhoto = document.querySelector('#upload-file');
  var inputComments = document.querySelector('.text__description');
  var onCloseClick = document.querySelector('#upload-cancel');

  function onEditPhotoEscPress(evt) {
    if (evt.keyCode === 27 && document.activeElement !== inputComments) {
      closeEditPhoto();
    }
  }

  function openEditPhoto() {
    overlayPhoto.classList.remove('hidden');
    document.addEventListener('keydown', onEditPhotoEscPress);
    window.fillValues();
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
  });

  onCloseClick.addEventListener('click', function () {
    closeEditPhoto();
  });
})();
