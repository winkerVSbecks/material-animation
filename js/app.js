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
    artist: '/img/artists/caribou.jpg',
    cover: '/img/albums/caribou.jpg',
    color: '#F0EC9D'
  }, {
    artist: '/img/artists/tycho.jpg',
    cover: '/img/albums/dive.jpg',
    color: '#758978'
  }, {
    artist: '/img/artists/fmbelfast.jpg',
    cover: '/img/albums/fmbelfast.jpg',
    color: '#DD5C56'
  }, {
    artist: '/img/artists/jamiexx.jpg',
    cover: '/img/albums/jamiexx.jpg',
    color: '#FE8F00'
  }, {
    artist: '/img/artists/goldpanda.jpg',
    cover: '/img/albums/goldpanda.jpg',
    color: '#009AC6'
  }, {
    artist: '/img/artists/wildbeasts.jpg',
    cover: '/img/albums/wildbeasts.jpg',
    color: '#F7201D'
  }, {
    artist: '/img/artists/laroux.jpg',
    cover: '/img/albums/laroux.jpg',
    color: '#CBA135'
  }, {
    artist: '/img/artists/pharrellwilliams.jpg',
    cover: '/img/albums/girl.jpg',
    color: '#F0B80F'
  }, {
    artist: 'img/artists/fourtet.jpg',
    cover: 'img/albums/fourtet.jpg',
    color: '#DFE4E2'
  }, {
    artist: '/img/artists/tycho.jpg',
    cover: '/img/albums/tycho.jpg',
    color: '#D47765'
  }, {
    artist: '/img/artists/holyfuck.jpg',
    cover: '/img/albums/holyfuck.jpg',
    color: '#C1CFE0'
  },{
    artist: '/img/artists/thexx.jpg',
    cover: '/img/albums/thexx.jpg',
    color: '#FFFFFF'
  }];

}]);
