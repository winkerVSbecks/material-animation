angular.module('materialApp.services')
  .service('animationDelegate', [
    '$location',
    '$rootScope',
    'domUtil',
    '$q',
    '$timeout',
  function($location, $rootScope, domUtil, $q, $timeout) {

    var service = {
      transition: ''
    };

    var elsInTransition = [];
    var ctrls = {};

    service.registerAsMovable = function(id, ctrl) {

      if (!R.contains(id)(elsInTransition)) {
        elsInTransition.push(id);
      }

      ctrls[id] = ctrl;
    };

    service.registerAsDestination = function(id, el) {
      if (R.contains(id)(elsInTransition)) {
        el.style.visibility = 'hidden';
        ctrls[id].transition( domUtil.getAbsPos(el) );

        return false;

      } else {

        return true;
      }
    };

    service.unRegister = function(id, ctrl) {
      elsInTransition = [];
      ctrls = {};
      $rootScope.$broadcast('PersistElementsRegister');
    };

    // $rootScope.$on('$routeChangeStart', function(angularEvent, next) {
    //   if (next && next.$$route && next.$$route.originalPath === '/albums/:name') {
    //     $rootScope.transition = 'expand-view';
    //   } else {
    //     $rootScope.transition = 'contract-view';
    //   }
    // });

    return service;
  }]);