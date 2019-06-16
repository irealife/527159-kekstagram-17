'use strict';

var OBJECTS = [];
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

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

function getObject() {
  var object = {
    url: 'photos/' + randomInteger(1, 25) + '.jpg',
    likes: randomInteger(15, 200),
    comments: []
  };
  for (var i = 0; i < randomInteger(1, 2); i++) {
    var comment = {
      avatar: 'img/avatar-' + randomInteger(1, 6) + '.svg',
      message: COMMENTS[randomInteger(0, COMMENTS.length - 1)],
      name: NAMES[randomInteger(0, NAMES.length - 1)]
    };
    object.comments.push(comment);
  }
  return object;
}

function generateDOMelement(object) {
  var template = document.querySelector('#picture').cloneNode(true);
  template.content.querySelector('.picture__img').setAttribute('src', object.url);
  template.content.querySelector('.picture__likes').textContent = object.likes.toString();
  template.content.querySelector('.picture__comments').textContent = object.comments.length.toString();
  return template.content;
}

function generateObjectsArray() {
  for (var i = 0; i < 25; i++) {
    OBJECTS.push(getObject());
  }
}

function renderObjects() {
  var fragment = document.createDocumentFragment();
  var pictures = document.querySelector('.pictures');
  OBJECTS.forEach(function (object) {
    fragment.appendChild(generateDOMelement(object));
  });
  pictures.appendChild(fragment);
}

generateObjectsArray();
renderObjects();
