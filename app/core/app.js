angular.module('materialApp.services', []);
angular.module('materialApp.directives', ['ngAnimate']);
angular.module('materialApp.data', []);
angular.module('materialApp.controllers', ['materialApp.data']);

angular.module('materialApp', [
  'ngRoute',
  'materialApp.services',
  'materialApp.directives',
  'materialApp.controllers',
])
.config([
    '$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/albums', {
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .when('/albums/:name', {
        templateUrl: 'app/album/album.html',
        controller: 'AlbumCtrl',
        controllerAs: 'player'
      })
      .otherwise({
        redirectTo: '/albums'
      });
}]);