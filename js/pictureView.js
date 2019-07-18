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

  window.showBigPicture = function (imageData) {
    document.addEventListener('keydown', onBigPictureEscPress);
    bigPictureImg.src = imageData.url;
    bigPictureAuthorAvatar.src = 'img/avatar-' + Math.round(0.5 + Math.random() * 6) + '.svg';
    bigPictureAuthorCaption.innerHTML = imageData.description;
    bigPictureAuthorLikes.innerHTML = imageData.likes;
    bigPictureCommentsCountPortion.innerHTML = BIGPICTURECOMMENTSPORTION.toString();
    bigPictureCommentsCountTotal.innerHTML = imageData.comments.length.toString();
    bigPictureCommentsList.innerHTML = '';
    bigPictureCommentsStart = 0;
    renderComments(bigPictureCommentsStart, BIGPICTURECOMMENTSPORTION, imageData.comments);
    bigPictureCommentsCount.classList.add('visually-hidden');
    bigPictureCommentsLoader.classList.add('visually-hidden');
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
  };

  function renderComments(start, count, comments) {
    var tmpComments = comments.slice(start, (start + count));
    var end = start + tmpComments.length;
    for (var i = start; i < end; i++) {
      var commentTemplateClone = commentTemplate.cloneNode(true);
      commentTemplateClone.querySelector('.social__picture').src = comments[i].avatar;
      commentTemplateClone.querySelector('.social__text').innerHTML = comments[i].message;
      bigPictureCommentsList.appendChild(commentTemplateClone);
    }
  }

  function closeBigPicture() {
    document.removeEventListener('keydown', onBigPictureEscPress);
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }

  function onBigPictureEscPress(evt) {
    if (evt.keyCode === 27 && document.activeElement !== bigPicture) {
      closeBigPicture();
    }
  }

  bigPictureCancelButton.addEventListener('click', closeBigPicture);
})();
