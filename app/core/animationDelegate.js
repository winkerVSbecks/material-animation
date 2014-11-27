angular.module('materialApp.services')
  .service('animationDelegate', [
    '$location',
    '$rootScope',
    'domUtil',
  function($location, $rootScope, domUtil) {

    var service = {};

    var elsInTransition = [];
    var ctrls = {};

    service.registerAsActive = function(id, ctrl) {
      elsInTransition.push(id);
      ctrls[id] = ctrl;
    };

    service.unRegister = function(id, ctrl) {
      elsInTransition = [];
      ctrls = {};
      service.registerAsActive(id, ctrl);
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

    var getPath = function(string) {
      return '#' + string.match(/\/\#(.+)$/)[1];
    };

    $rootScope.$on('$locationChangeStart', function(event, nextLocation, currentLocation) {
      // Build the event name
      var eventName = getPath(currentLocation) + '->' + getPath(nextLocation);
      // Broadcast even to be captured by animation directives
      $rootScope.$broadcast(eventName);
    });

    return service;
  }]);