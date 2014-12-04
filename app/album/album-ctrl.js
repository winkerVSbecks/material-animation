angular.module('materialApp.controllers')
  .controller('AlbumCtrl', [
    'albums',
    'animationDelegate',
    '$routeParams',
    '$timeout',
  function(albums, animationDelegate, $routeParams, $timeout) {

    var vm = this;

    vm.album = R.find(R.propEq('id', $routeParams.name))(albums);

     vm.artist = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundImage: 'url(' + vm.album.artistImg + ')',
      backgroundSize: 'cover'
    };

    $timeout(function() {
      vm.uiStyle = {
        transform: 'scale3d(1, 1, 1)',
        backgroundColor: vm.album.color,
        opacity: 1
      };
    }, 300)

    // vm.artist = {
    //   position: 'relative',
    //   width: '100%',
    //   height: '100%',
    //   top: 0,
    //   left: 0,
    //   backgroundImage: 'url(' + vm.album.artistImg + ')',
    //   backgroundSize: 'cover',
    //   backgroundPosition: 'center center'
    // };

    // vm.colorBlock = {
    //   position: 'relative',
    //   width: '100%',
    //   height: '100%',
    //   top: '-100%',
    //   left: 0,
    //   backgroundColor: vm.album.color,
    //   opacity: 0.5
    // };

  }]);