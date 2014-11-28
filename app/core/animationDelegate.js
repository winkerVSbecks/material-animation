angular.module('materialApp.services')
  .service('animationDelegate', [
    '$location',
    '$rootScope',
    'domUtil',
    '$q',
  function($location, $rootScope, domUtil, $q) {

    var service = {};

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

    return service;
  }]);