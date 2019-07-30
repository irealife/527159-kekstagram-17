'use strict';

(function () {
  var BIG_PICTURE_COMMENTS_PORTION = 5;
  var RANDOM_ADDEND = 0.5;
  var RANDOM_MULTIPLIER = 6;
  var ESCAPE_KEY_CODE = 27;
  var body = document.querySelector('body');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  var bigPictureAuthorAvatar = bigPicture.querySelector('.social__picture');
  var bigPictureAuthorCaption = bigPicture.querySelector('.social__caption');
  var bigPictureAuthorLikes = bigPicture.querySelector('.likes-count');
  var bigPictureCommentsStart = 0;
  var bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count');
  var bigPictureCommentsCountPortion = bigPictureCommentsCount.querySelector('.comments-portion');
  var bigPictureCommentsCountTotal = bigPictureCommentsCount.querySelector('.comments-count');
  var bigPictureCommentsList = bigPicture.querySelector('.social__comments');
  var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  var bigPictureCommentsLoader = bigPicture.querySelector('.social__comments-loader');
  var bigPictureCancelButton = bigPicture.querySelector('.big-picture__cancel');
  var pictureData;

  function showBigPicture(imageData) {
    pictureData = imageData;
    document.addEventListener('keydown', onDocumentKeyDown);
    bigPictureImg.src = imageData.url;
    bigPictureAuthorAvatar.src = 'img/avatar-' + Math.round(RANDOM_ADDEND + Math.random() * RANDOM_MULTIPLIER) + '.svg';
    bigPictureAuthorCaption.textContent = imageData.description;
    bigPictureAuthorLikes.textContent = imageData.likes;
    bigPictureCommentsCountPortion.textContent = BIG_PICTURE_COMMENTS_PORTION.toString();
    bigPictureCommentsCountTotal.textContent = imageData.comments.length.toString();
    bigPictureCommentsList.textContent = '';
    bigPictureCommentsStart = 0;
    bigPictureCommentsLoader.classList.remove('hidden');
    renderComments();
    togglePicturePopup(true);
  }

  function togglePicturePopup(isShow) {
    body.classList.toggle('modal-open', isShow);
    bigPicture.classList.toggle('hidden', !isShow);
  }

  function renderComments() {
    var fragment = document.createDocumentFragment();
    var tmpComments = pictureData.comments.slice(bigPictureCommentsStart, (bigPictureCommentsStart + BIG_PICTURE_COMMENTS_PORTION));
    var lastCommentNumber = bigPictureCommentsStart + tmpComments.length;
    for (var i = bigPictureCommentsStart; i < lastCommentNumber; i++) {
      var commentTemplateClone = commentTemplate.cloneNode(true);
      var commentAvatar = commentTemplateClone.querySelector('.social__picture');
      commentAvatar.src = pictureData.comments[i].avatar;
      commentAvatar.alt = pictureData.comments[i].name;
      commentTemplateClone.querySelector('.social__text').textContent = pictureData.comments[i].message;
      fragment.appendChild(commentTemplateClone);
    }
    bigPictureCommentsCountPortion.textContent = lastCommentNumber.toString();
    bigPictureCommentsStart = lastCommentNumber;
    if (bigPictureCommentsStart >= pictureData.comments.length) {
      bigPictureCommentsLoader.classList.add('hidden');
    }
    bigPictureCommentsList.appendChild(fragment);
  }

  function onDocumentKeyDown(evt) {
    if (evt.keyCode === ESCAPE_KEY_CODE && document.activeElement !== bigPicture) {
      closeBigPicture();
    }
  }

  function closeBigPicture() {
    document.removeEventListener('keydown', onDocumentKeyDown);
    togglePicturePopup(false);
  }

  bigPictureCommentsLoader.addEventListener('click', function () {
    renderComments();
  });

  bigPictureCancelButton.addEventListener('click', function () {
    closeBigPicture();
  });

  window.pictureView = {
    show: showBigPicture
  };
})();
