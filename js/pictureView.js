'use strict';

(function () {
  var BIGPICTURECOMMENTSPORTION = 5;
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
  var isShowPopup;

  window.showBigPicture = function (imageData) {
    document.addEventListener('keydown', onBigPictureEscPress);
    bigPictureImg.src = imageData.url;
    bigPictureAuthorAvatar.src = 'img/avatar-' + Math.round(0.5 + Math.random() * 6) + '.svg';
    bigPictureAuthorCaption.textContent = imageData.description;
    bigPictureAuthorLikes.textContent = imageData.likes;
    bigPictureCommentsCountPortion.textContent = BIGPICTURECOMMENTSPORTION.toString();
    bigPictureCommentsCountTotal.textContent = imageData.comments.length.toString();
    bigPictureCommentsList.textContent = '';
    bigPictureCommentsStart = 0;
    renderComments(bigPictureCommentsStart, BIGPICTURECOMMENTSPORTION, imageData.comments);
    bigPictureCommentsCount.classList.add('visually-hidden');
    bigPictureCommentsLoader.classList.add('visually-hidden');
    togglePicturePopup(isShowPopup);
  };

  function togglePicturePopup(popup) {
    body.classList.toggle('modal-open', popup);
    bigPicture.classList.toggle('hidden', popup);
  }

  function renderComments(start, count, comments) {
    var tmpComments = comments.slice(start, (start + count));
    var end = start + tmpComments.length;
    for (var i = start; i < end; i++) {
      var commentTemplateClone = commentTemplate.cloneNode(true);
      var commentAvatar = commentTemplateClone.querySelector('.social__picture');
      commentAvatar.src = comments[i].avatar;
      commentAvatar.alt = comments[i].name;
      commentTemplateClone.querySelector('.social__text').innerHTML = comments[i].message;
      bigPictureCommentsList.appendChild(commentTemplateClone);
    }
  }

  function closeBigPicture() {
    document.removeEventListener('keydown', onBigPictureEscPress);
    togglePicturePopup(isShowPopup);
  }

  function onBigPictureEscPress(evt) {
    if (evt.keyCode === 27 && document.activeElement !== bigPicture) {
      closeBigPicture();
    }
  }

  bigPictureCancelButton.addEventListener('click', closeBigPicture);
})();
