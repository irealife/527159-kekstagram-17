'use strict';

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
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var EFFECT_TYPE = 'none';
var EFFECT_VALUE;
var INDENT_LEFT = 68;
var DRAGGING = false;
var LOAD_PICTURE;
var EFFECT_VAL;
var EFFECT_PIN;
var EFFECT_DEPTH;
var MAX_RIGHTPX;
var MIN_LEFTPX;

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
  var picturePost = {
    url: 'photos/' + i + '.jpg',
    likes: randomInteger(MIN_LIKES, MAX_LIKES),
    comments: getComments()
  };
  return picturePost;
}

function generatePicture(imageData) {
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

// добавление фото для редактирования и закрытие формы редактирования

var uploadPhoto = document.querySelector('#upload-file');
var overlayPhoto = document.querySelector('.img-upload__overlay');
var onCloseClick = document.querySelector('#upload-cancel');

var scalePhoto = document.querySelector('.img-upload__scale');
var resizeValue = scalePhoto.querySelector('.scale__control--value');

function fillValues() {
  LOAD_PICTURE = document.querySelector('.img-upload__preview img');
  EFFECT_VAL = document.querySelector('.effect-level__value');
  EFFECT_PIN = document.querySelector('.effect-level__pin');
  EFFECT_DEPTH = document.querySelector('.effect-level__depth');

  MIN_LEFTPX = parseInt(document.querySelector('.img-upload__wrapper').offsetLeft + INDENT_LEFT, 10);
  MAX_RIGHTPX = parseInt(MIN_LEFTPX + document.querySelector('.effect-level__line').offsetWidth, 10);

  window.addEventListener('mouseup', function () {
    DRAGGING = false;
  });

  EFFECT_PIN.addEventListener('mousedown', function () {
    DRAGGING = true;
  });
}

function onEditPhotoEscPress(evt) {
  if (evt.keyCode === 27) {
    closeEditPhoto();
  }
}

function openEditPhoto() {
  overlayPhoto.classList.remove('hidden');
  document.addEventListener('keydown', onEditPhotoEscPress);
  fillValues();
  EFFECT_VALUE = 100;
  EFFECT_PIN.style.left = '' + EFFECT_VALUE + '%';
  EFFECT_DEPTH.style.width = '' + EFFECT_VALUE + '%';
  var effectLevel = document.querySelector('.effect-level');
  effectLevel.style.display = 'none';
}

function closeEditPhoto() {
  overlayPhoto.classList.add('hidden');
  document.removeEventListener('keydown', onEditPhotoEscPress);
}

uploadPhoto.addEventListener('change', function () {
  openEditPhoto();
  CURRENT_SIZE = MAX_SIZE;
  resizeValue.value = CURRENT_SIZE + '%';
});

onCloseClick.addEventListener('click', function () {
  closeEditPhoto();
});

// МАСШТАБ ФОТОГРАФИИ

// При нажатии на кнопки .scale__control--smaller и .scale__control--bigger должно изменяться
// значение поля .scale__control--value;
// При изменении значения поля .scale__control--value изображению внутри .img-upload__preview должен
// добавляться стиль CSS, который с помощью трансформации scale задаёт масштаб.

var controlSmall = scalePhoto.querySelector('.scale__control--smaller');
var controlBig = scalePhoto.querySelector('.scale__control--bigger');
var uploadPreviewPhoto = document.querySelector('.img-upload__preview');

var MIN_SIZE = 25;
var MAX_SIZE = 100;
var STEP = 25;
var CURRENT_SIZE = 100;

function changeScale() {
  uploadPreviewPhoto.style.transform = 'scale(' + CURRENT_SIZE / 100 + ')';
}

controlSmall.addEventListener('click', function () {
  CURRENT_SIZE = CURRENT_SIZE + (STEP * -1);
  if (CURRENT_SIZE < MIN_SIZE) {
    CURRENT_SIZE = MIN_SIZE;
  }
  resizeValue.value = CURRENT_SIZE + '%';
  changeScale(CURRENT_SIZE);
});

controlBig.addEventListener('click', function () {
  CURRENT_SIZE = CURRENT_SIZE + STEP;
  if (CURRENT_SIZE > MAX_SIZE) {
    CURRENT_SIZE = MAX_SIZE;
  }
  resizeValue.value = CURRENT_SIZE + '%';
  changeScale(CURRENT_SIZE);
});

// НАЛОЖЕНИЕ ЭФФЕКТА

window.addEventListener('mousemove', function (evt) {
  if (DRAGGING && evt.clientX >= MIN_LEFTPX && evt.clientX <= MAX_RIGHTPX) {
    var offset = Math.floor(evt.clientX - MIN_LEFTPX);
    EFFECT_VALUE = Math.floor((offset * 100) / (MAX_RIGHTPX - MIN_LEFTPX));

    if (EFFECT_VALUE < 0) {
      EFFECT_VALUE = 0;
    }
    if (EFFECT_VALUE > 100) {
      EFFECT_VALUE = 100;
    }
    EFFECT_PIN.style.left = '' + EFFECT_VALUE + '%';
    EFFECT_DEPTH.style.width = '' + EFFECT_VALUE + '%';
    EFFECT_VAL.value = EFFECT_VALUE;
    applyEffectDepth();
  }
});

function applyEffectDepth() {
  switch (EFFECT_TYPE) {
    case 'chrome':
      LOAD_PICTURE.style.filter = 'grayscale(' + (EFFECT_VALUE / 100) + ')';
      break;
    case 'sepia':
      LOAD_PICTURE.style.filter = 'sepia(' + (EFFECT_VALUE / 100) + ')';
      break;
    case 'marvin':
      LOAD_PICTURE.style.filter = 'invert(' + EFFECT_VALUE + '%)';
      break;
    case 'phobos':
      LOAD_PICTURE.style.filter = 'blur(' + Math.round((EFFECT_VALUE * 3) / 100) + 'px)';
      break;
    case 'heat':
      var value = Math.round((EFFECT_VALUE * 3) / 100);
      if (value < 1) {
        value = 1;
      }
      LOAD_PICTURE.style.filter = 'brightness(' + value + ')';
      break;
  }
}

document.querySelectorAll('.effects__radio').forEach(function (element) {
  element.addEventListener('change', function () {
    if (element.target.checked) {
      EFFECT_TYPE = element.target.value;
      EFFECT_VALUE = 100;
      EFFECT_PIN.style.left = '' + EFFECT_VALUE + '%';
      EFFECT_DEPTH.style.width = '' + EFFECT_VALUE + '%';
      LOAD_PICTURE.className = '';
      LOAD_PICTURE.style.filter = '';
      LOAD_PICTURE.classList.add('effects__preview--' + element.target.value);
      if (element.target.value === 'none') {
        document.querySelector('.effect-level').style.display = 'none';
      } else {
        document.querySelector('.effect-level').style.display = 'block';
      }
    }
  });
});
