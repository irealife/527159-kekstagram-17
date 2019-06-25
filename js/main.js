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

var INDENT_LEFT = 68;
var effectType = 'none';
var effectValue;
var dragging = false;
var loadPicture;
var effectVal;
var effectPin;
var effectDepth;
var maxRightPx;
var minLeftPx;

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
  loadPicture = document.querySelector('.img-upload__preview img');
  effectVal = document.querySelector('.effect-level__value');
  effectPin = document.querySelector('.effect-level__pin');
  effectDepth = document.querySelector('.effect-level__depth');

  minLeftPx = parseInt(document.querySelector('.img-upload__wrapper').offsetLeft + INDENT_LEFT, 10);
  maxRightPx = parseInt(minLeftPx + document.querySelector('.effect-level__line').offsetWidth, 10);

  window.addEventListener('mouseup', function () {
    dragging = false;
  });

  effectPin.addEventListener('mousedown', function () {
    dragging = true;
  });

  addEffectsActions();
}

function onEditPhotoEscPress(evt) {
  if (evt.keyCode === 27) {
    closeEditPhoto();
  }
}

function openEditPhoto() {
  overlayPhoto.classList.toggle('hidden', false);
  document.addEventListener('keydown', onEditPhotoEscPress);
  fillValues();
  effectValue = 100;
  effectPin.style.left = '' + effectValue + '%';
  effectDepth.style.width = '' + effectValue + '%';
  loadPicture.className = '';
  loadPicture.style.filter = '';
  effectType = 'none';
  applyEffectDepth();
  var effectLevel = document.querySelector('.effect-level');
  effectLevel.style.display = 'none';
}

function closeEditPhoto() {
  overlayPhoto.classList.toggle('hidden', true);
  document.removeEventListener('keydown', onEditPhotoEscPress);
  uploadPhoto.value = '';
}

uploadPhoto.addEventListener('change', function () {
  openEditPhoto();
  currentSize = MAX_SIZE;
  resizeValue.value = currentSize + '%';
});

onCloseClick.addEventListener('click', function () {
  closeEditPhoto();
});

// МАСШТАБ ФОТОГРАФИИ

var controlSmall = scalePhoto.querySelector('.scale__control--smaller');
var controlBig = scalePhoto.querySelector('.scale__control--bigger');
var uploadPreviewPhoto = document.querySelector('.img-upload__preview');

var MIN_SIZE = 25;
var MAX_SIZE = 100;
var STEP = 25;
var currentSize = 100;

function changeScale() {
  uploadPreviewPhoto.style.transform = 'scale(' + currentSize / 100 + ')';
}

controlSmall.addEventListener('click', function () {
  controlScale(-1);
});

controlBig.addEventListener('click', function () {
  controlScale(1);
});


function controlScale(line) {
  currentSize = currentSize + STEP * line;
  if (currentSize < MIN_SIZE) {
    currentSize = MIN_SIZE;
  }
  if (currentSize > MAX_SIZE) {
    currentSize = MAX_SIZE;
  }
  resizeValue.value = currentSize + '%';
  changeScale(currentSize);
}


// НАЛОЖЕНИЕ ЭФФЕКТА

window.addEventListener('mousemove', function (evt) {
  if (dragging && evt.clientX >= minLeftPx && evt.clientX <= maxRightPx) {
    var offset = Math.floor(evt.clientX - minLeftPx);
    effectValue = Math.floor((offset * 100) / (maxRightPx - minLeftPx));

    if (effectValue < 0) {
      effectValue = 0;
    }
    if (effectValue > 100) {
      effectValue = 100;
    }
    effectPin.style.left = '' + effectValue + '%';
    effectDepth.style.width = '' + effectValue + '%';
    effectVal.value = effectValue;
    applyEffectDepth();
  }
});

function applyEffectDepth() {
  switch (effectType) {
    case 'chrome':
      loadPicture.style.filter = 'grayscale(' + (effectValue / 100) + ')';
      break;
    case 'sepia':
      loadPicture.style.filter = 'sepia(' + (effectValue / 100) + ')';
      break;
    case 'marvin':
      loadPicture.style.filter = 'invert(' + effectValue + '%)';
      break;
    case 'phobos':
      loadPicture.style.filter = 'blur(' + Math.round((effectValue * 3) / 100) + 'px)';
      break;
    case 'heat':
      var value = Math.round((effectValue * 3) / 100);
      if (value < 1) {
        value = 1;
      }
      loadPicture.style.filter = 'brightness(' + value + ')';
      break;
  }
}

function effectsWorker(node) {
  if (node.target.checked) {
    effectType = node.target.value;
    effectValue = 100;
    effectPin.style.left = '' + effectValue + '%';
    effectDepth.style.width = '' + effectValue + '%';
    loadPicture.className = '';
    loadPicture.style.filter = '';
    loadPicture.classList.add('effects__preview--' + node.target.value);
    if (node.target.value === 'none') {
      document.querySelector('.effect-level').style.display = 'none';
    } else {
      document.querySelector('.effect-level').style.display = 'block';
    }
  }
}

function addEffectsActions() {
  document.querySelectorAll('.effects__radio').forEach(function (parent) {
    parent.addEventListener('change', function (child) {
      effectsWorker(child);
    });
  });
}
