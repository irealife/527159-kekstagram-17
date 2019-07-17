'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictures = document.querySelector('.pictures');
  var body = document.querySelector('body');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  var bigPictureAuthorAvatar = bigPicture.querySelector('.big-picture__social div img');
  var bigPictureAuthorCaption = bigPicture.querySelector('.big-picture__social div .social__caption');
  var bigPictureAuthorLikes = bigPicture.querySelector('.big-picture__social div .social__likes .likes-count');
  var bigPictureCommentsStart = 0;
  var bigPictureCommentsPortion = 5;
  var bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count');
  var bigPictureCommentsCountPortion = bigPicture.querySelector('.social__comment-count .comments-portion');
  var bigPictureCommentsCountTotal = bigPicture.querySelector('.social__comment-count .comments-count');
  var bigPictureCommentsList = bigPicture.querySelector('.social__comments');
  var bigPictureCommentsLoader = bigPicture.querySelector('.social__comments-loader');
  var bigPictureCancelButton = bigPicture.querySelector('.big-picture__cancel');

  window.gallery = {
    picturesData: []
  };

  function generatePicture(imageData) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = imageData.url;
    pictureElement.querySelector('.picture__likes').textContent = imageData.likes.toString();
    pictureElement.querySelector('.picture__comments').textContent = imageData.comments.length.toString();
    pictureElement.addEventListener('click', function () {
      showBigPicture(imageData);
    });
    return pictureElement;
  }

  window.renderPictures = function (picturesData) {
    var allPictures = pictures.querySelectorAll('.picture');
    allPictures.forEach(function (picture) {
      pictures.removeChild(picture);
    });

    var fragment = document.createDocumentFragment();
    picturesData.forEach(function (image) {
      fragment.appendChild(generatePicture(image));
    });
    pictures.appendChild(fragment);
  };

  var onError = function (message) {
    window.console.error(message);
    window.showMessage('error', 'Не удалось загрузить изображения', [function () {
      window.getDataFromServer(URL, onSuccess, onError);
    }], ['Попробовать снова', 'Ну и ладно!']);
  };

  var onSuccess = function (data) {
    if (!data || !data.length) {
      onError('Сервер прислал пустые данные');
    } else {
      window.gallery.picturesData = data;
      window.renderPictures(data);
      window.initPicturesFilter();
    }
  };

  function showBigPicture(imageData) {
    document.addEventListener('keydown', onBigPictureEscPress);
    bigPictureImg.src = imageData.url;
    bigPictureAuthorAvatar.src = 'img/avatar-' + Math.round(0.5 + Math.random() * 6) + '.svg';
    bigPictureAuthorCaption.innerHTML = imageData.description;
    bigPictureAuthorLikes.innerHTML = imageData.likes;
    bigPictureCommentsCountPortion.innerHTML = bigPictureCommentsPortion.toString();
    bigPictureCommentsCountTotal.innerHTML = imageData.comments.length.toString();
    bigPictureCommentsList.innerHTML = '';
    bigPictureCommentsStart = 0;
    fillComments(bigPictureCommentsStart, bigPictureCommentsPortion, imageData.comments);
    bigPictureCommentsCount.classList.add('visually-hidden');
    bigPictureCommentsLoader.classList.add('visually-hidden');
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
  }

  function fillComments(start, count, comments) {
    for (var i = start; i < (start + count); i++) {
      if (!comments[i]) {
        break;
      }
      var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment').cloneNode(true);
      commentTemplate.querySelector('.social__picture').src = comments[i].avatar;
      commentTemplate.querySelector('.social__text').innerHTML = comments[i].message;
      bigPictureCommentsList.appendChild(commentTemplate);
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

  window.getDataFromServer(URL, onSuccess, onError);
  bigPictureCancelButton.addEventListener('click', closeBigPicture);

})();
