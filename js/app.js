angular.module('materialApp.directives', ['ngAnimate']);

angular.module('materialApp', [
  'materialApp.directives'
])
.controller('AnimationController', [
function($scope, $sniffer, $document, $window) {
  var vm = this;

  vm.isEnd = function(index) {
    return index % 3 === 0 && index !== 0;
  };

  vm.albums = [{
    cover: '/img/caribou.jpg'
  }, {
    cover: '/img/dive.jpg'
  }, {
    cover: '/img/fmbelfast.jpg'
  }, {
    cover: '/img/jamiexx.jpg'
  }, {
    cover: '/img/goldpanda.jpg'
  }, {
    cover: '/img/wildbeasts.jpg'
  }, {
    cover: '/img/laroux.jpg'
  }];

  vm.moreAlbums = [{
    cover: '/img/fourtet.jpg'
  }, {
    cover: '/img/tycho1.jpg'
  }, {
    cover: '/img/holyfuck.jpg'
  },{
    cover: '/img/xx.jpg'
  }];

}]);
