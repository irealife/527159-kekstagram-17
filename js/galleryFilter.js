'use strict';

(function () {
  var imgFilters = document.querySelector('.img-filters');
  var imgFiltersForm = document.querySelector('.img-filters__form');
  var filterButtons = document.querySelectorAll('.img-filters__button');
  var activeButton = imgFiltersForm.querySelector('.img-filters__button--active');

  var FPOP = 'filter-popular';
  var FNEW = 'filter-new';
  var FDIS = 'filter-discussed';

  window.initPicturesFilter = function () {
    imgFilters.classList.remove('img-filters--inactive');

    filterButtons.forEach(function (button) {
      button.addEventListener('click', window.debounce(function () {
        activeButton.classList.remove('img-filters__button--active');
        activeButton = button;
        activeButton.classList.add('img-filters__button--active');
        filterPictures(button.id);
      }));
    });
  };

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

  function compareRandom() {
    return Math.random() - 0.5;
  }

  function filterPictures(method) {
    var photos = [];
    var tmpPhotos = window.gallery.picturesData.slice();
    switch (method) {
      case FPOP:
        photos = window.gallery.picturesData;
        break;
      case FNEW:
        photos = tmpPhotos.sort(compareRandom).slice(0, 10);
        break;
      case FDIS:
        photos = tmpPhotos.sort(compareComments);
        break;
      default:
        filterPictures(FPOP);
        break;
    }
    window.renderPictures(photos);
  }
})();
