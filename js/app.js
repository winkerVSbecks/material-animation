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
    cover: '/img/caribou.jpg',
    color: '#8DC384'
  }, {
    cover: '/img/dive.jpg',
    color: '#758978'
  }, {
    cover: '/img/fmbelfast.jpg',
    color: '#DD5C56'
  }, {
    cover: '/img/jamiexx.jpg',
    color: '#FE8F00'
  }, {
    cover: '/img/goldpanda.jpg',
    color: '#009AC6'
  }, {
    cover: '/img/wildbeasts.jpg',
    color: '#F7201D'
  }, {
    cover: '/img/laroux.jpg',
    color: '#CBA135'
  }, {
    cover: '/img/girl.jpg',
    color: '#F0B80F'
  }, {
    cover: 'img/fourtet.jpg',
    color: '#991D4F'
  }, {
    cover: '/img/tycho1.jpg',
    color: '#303C52'
  }, {
    cover: '/img/holyfuck.jpg',
    color: '#323945'
  },{
    cover: '/img/xx.jpg',
    color: '#FFFFFF'
  }];

}]);
