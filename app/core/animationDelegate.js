angular.module('materialApp.services')
  .service('animationDelegate', [
    '$location',
    '$rootScope',
  function($location, $rootScope) {

    var service = {};

    $rootScope.$on('$locationChangeStart', function(event, nextLocation, currentLocation) {
      console.log(event, nextLocation, currentLocation);
    });

    return service;
  }]);