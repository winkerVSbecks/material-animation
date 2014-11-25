angular.module('materialApp.directives', ['ngAnimate']);
angular.module('materialApp.controllers', []);

angular.module('materialApp', [
  'ngRoute',
  'materialApp.directives',
  'materialApp.controllers'
])
.config([
    '$routeProvider',
  function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      // .when('/albums/:name', {
      //   templateUrl: 'app/album/album.html',
      //   controller: 'HomeCtrl',
      //   controllerAs: ''
      // })
      .otherwise({
        redirectTo: '/'
      });
}])