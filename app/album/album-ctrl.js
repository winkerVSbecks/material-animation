angular.module('materialApp.controllers')
  .controller('AlbumCtrl', [
    'albums',
    'animationDelegate',
    '$routeParams',
  function(albums, animationDelegate, $routeParams) {
    var vm = this;

    vm.album = R.find(R.propEq('id', $routeParams.name))(albums);

  }]);
