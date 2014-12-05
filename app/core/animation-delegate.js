angular.module('materialApp.services')
  .service('animationDelegate', [
    '$location',
    '$rootScope',
    'domUtil',
    '$q',
    '$timeout',
  function($location, $rootScope, domUtil, $q, $timeout) {

    var service = {
      transition: '',
      ripplePos: {
        left: '100%',
        top: '100%'
      }
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

        // Track the elements position to allow
        // the animated page to start from that location
        service.ripplePos = domUtil.getPosCenter(ctrls[id].element);
        ctrls[id].transition(domUtil.getAbsPos(el));

        return false;

      } else {

        return true;
      }
    };

    service.unRegister = function(id, ctrl) {
      elsInTransition = [];
      ctrls = {};
      service.elPos = null;
      $rootScope.$broadcast('PersistElementsRegister');
    };

    $rootScope.$on('$routeChangeStart', function(angularEvent, next, prev) {
      if (next && next.$$route && next.$$route.originalPath === '/albums/:name') {
        // $timeout(function() {
        //   $rootScope.transition = 'reverse';
        // }, 300);
      } else {
        $timeout(function() {
          $rootScope.transition = '';
        }, 300);
      }
    });

    return service;
  }]);