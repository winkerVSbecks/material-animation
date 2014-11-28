angular.module('materialApp.directives')
  .directive('animatedPage', [function () {
    return {
      restrict: 'E',
      templateUrl: 'app/animated-page/animated-page.html',
      controller: 'AnimatedPageCtrl',
      controllerAs: 'animatedPage',
      scope: true,
      link: function(scope, iElement, iAttrs) {
      }
    };
  }]);