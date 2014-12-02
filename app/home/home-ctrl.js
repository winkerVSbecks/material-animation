angular.module('materialApp.controllers')
  .controller('HomeCtrl', [
    'albums',
    'animationDelegate',
  function(albums, animationDelegate) {

    var vm = this;

    vm.albums = albums;

    vm.isEnd = function(index) {
      return [3, 7, 11].indexOf(index) !== -1;
    };

    vm.getDestination = function(id) {
      return '#/albums/' + id;
    };

  }]);
