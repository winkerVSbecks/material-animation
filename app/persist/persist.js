angular.module('materialApp.directives')
  .directive('persist', [
      'domUtil',
      '$rootScope',
      '$timeout',
    function (domUtil, $rootScope, $timeout) {
    return {
      restrict: 'A',
      controller: 'PersistCtrl',
      controllerAs: 'persist',
      scope: true,
      link: function($scope, $element, $attrs) {}
    };
  }]);