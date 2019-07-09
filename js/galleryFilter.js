'use strict';

(function () {
  var imgFilters = document.querySelector('.img-filters');
  var filterButtons = document.querySelectorAll('.img-filters__button');

  var FPOP = 'filter-popular';
  var FNEW = 'filter-new';
  var FDIS = 'filter-discussed';

  function changeFilterButtonStyle(filterName) {
    filterButtons.forEach(function (button) {
      button.classList.toggle('img-filters__button--active', false);
    });
    document.querySelector('#' + filterName).classList.toggle('img-filters__button--active', true);
  }

  window.initPicturesFilter = function () {
    imgFilters.classList.toggle('img-filters--inactive', false);

    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        changeFilterButtonStyle(button.attributes.id.value);
        filterPictures(button.attributes.id.value);
      });
    });
  };

  function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

  function getUniquePicture(arrayPhotos) {
    var index = randomInteger(0, window.gallery.picturesData.length - 1);
    if (arrayPhotos.includes(window.gallery.picturesData[index])) {
      return getUniquePicture(arrayPhotos);
    } else {
      return window.gallery.picturesData[index];
    }
  }

  function compareComments(photo1, photo2) {
    return photo2.comments.length - photo1.comments.length;
    // if (photo1.comments.length < photo2.comments.length) {
    //   return 1;
    // }
    // if (photo1.comments.length > photo2.comments.length) {
    //   return -1;
    // }
    // return 0;
  }

  function filterPictures(method) {
    var photos = [];
    switch (method) {
      case FPOP:
        photos = window.gallery.picturesData;
        break;
      case FNEW:
        for (var i = 0; i < 10; i++) {
          photos[i] = getUniquePicture(photos);
        }
        break;
      case FDIS:
        var tmpPhotos = window.gallery.picturesData.slice();
        photos = tmpPhotos.sort(compareComments);
        break;
      default:
        filterPictures(FPOP);
        break;
    }
    window.renderPictures(photos);
  }
})();
