angular.module('materialApp.directives')
  .directive('persist', [function () {
    return {
      restrict: 'A',
      controller: 'PersistCtrl',
      controllerAs: 'persist',
      scope: true,
      link: function(scope, iElement, iAttrs) {
      }
    };
  }]);