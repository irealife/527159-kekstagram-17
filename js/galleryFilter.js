'use strict';

(function () {
  var FPOP = 'filter-popular';
  var FNEW = 'filter-new';
  var FDIS = 'filter-discussed';
  var RANDOM_MIDDLE_RATE = 0.5;
  var NEW_PHOTOS_START = 0;
  var NEW_PHOTOS_MAX = 10;
  var imgFilters = document.querySelector('.img-filters');
  var imgFiltersForm = document.querySelector('.img-filters__form');
  var filterButtons = document.querySelectorAll('.img-filters__button');
  var activeButton = imgFiltersForm.querySelector('.img-filters__button--active');

  function onFilterButtonClick(evt) {
    var button = evt.target;
    window.utils.debounce(function () {
      if (activeButton === button) {
        return;
      }
      activeButton.classList.remove('img-filters__button--active');
      activeButton = button;
      activeButton.classList.add('img-filters__button--active');
      filterPictures(button.id);
    }).call();
  }

  function initPicturesFilter() {
    imgFilters.classList.remove('img-filters--inactive');

    filterButtons.forEach(function (button) {
      button.addEventListener('click', onFilterButtonClick);
    });
  }

  function compareComments(photo1, photo2) {
    return photo2.comments.length - photo1.comments.length;
  }

  function compareRandom() {
    return Math.random() - RANDOM_MIDDLE_RATE;
  }

  function filterPictures(method) {
    var photos = [];
    var tmpPhotos = window.gallery.picturesData.slice();
    switch (method) {
      case FPOP:
        photos = window.gallery.picturesData;
        break;
      case FNEW:
        photos = tmpPhotos.sort(compareRandom).slice(NEW_PHOTOS_START, NEW_PHOTOS_MAX);
        break;
      case FDIS:
        photos = tmpPhotos.sort(compareComments);
        break;
      default:
        filterPictures(FPOP);
        break;
    }
    window.gallery.render(photos);
  }

  window.galleryFilter = {
    init: initPicturesFilter
  };
})();
