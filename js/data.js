'use strict';

// добавляет случайные изображения пользователей

(function () {
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var NAMES = [
    'Петя',
    'Леша',
    'Таня',
    'Катя',
    'Ольга',
    'Стас',
    'Миша'
  ];
  var MAX_PHOTO = 25;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var MAX_NUM_AVATAR = 6;
  var MAX_COMMENTS = 10;
  var picturesData = [];

  function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

  function getComments() {
    var comments = [];
    for (var i = 0; i < randomInteger(1, MAX_COMMENTS); i++) {
      var comment = {
        avatar: 'img/avatar-' + randomInteger(1, MAX_NUM_AVATAR) + '.svg',
        message: COMMENTS[randomInteger(0, COMMENTS.length - 1)],
        name: NAMES[randomInteger(0, NAMES.length - 1)]
      };
      comments.push(comment);
    }
    return comments;
  }

  function getPictureData(i) {
    return {
      url: 'photos/' + i + '.jpg',
      likes: randomInteger(MIN_LIKES, MAX_LIKES),
      comments: getComments()
    };
  }

  function generatePicture(imageData) {
    var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = imageData.url;
    pictureElement.querySelector('.picture__likes').textContent = imageData.likes.toString();
    pictureElement.querySelector('.picture__comments').textContent = imageData.comments.length.toString();
    return pictureElement;
  }

  function generatePicturesData() {
    for (var i = 1; i <= MAX_PHOTO; i++) {
      picturesData.push(getPictureData(i));
    }
  }

  function renderPictures() {
    var fragment = document.createDocumentFragment();
    var pictures = document.querySelector('.pictures');
    picturesData.forEach(function (image) {
      fragment.appendChild(generatePicture(image));
    });
    pictures.appendChild(fragment);
  }

  generatePicturesData();
  renderPictures();
})();
