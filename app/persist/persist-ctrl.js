angular.module('materialApp.directives')
  .controller('PersistCtrl', [
    '$scope',
    '$element',
    '$attrs',
    'domUtil',
    '$rootScope',
    'animationDelegate',
  function($scope, $element, $attrs, domUtil, $rootScope, animationDelegate) {

    var vm = this;

    // Get the events which trigger animations
    var id = $scope.$eval($attrs.persist);

    // The elements involved
    var element = $element[0];
    var elementClone = null;
    var transform = {};

    // If there is a clone in transition register as a destination
    var doRegisterAsActive = animationDelegate.registerAsDestination(id, element);

    if (doRegisterAsActive) {

      // Register with the animation service as an active element
      animationDelegate.registerAsActive(id, vm);
      vm.state = 'active';

    } else {
      vm.state = 'destination';
    }

    var buildClone = function() {
      // elementClone = $element.clone(false)[0];
      elementClone = element.cloneNode(true);
      elementClone.className += ' ' + id;
      domUtil.appendToBody(elementClone);
    };

    // Move the album cover from the grid to the player
    vm.transition = function(dest) {

      buildClone();

      var start = domUtil.getAbsPosInPx(element);

      domUtil.style(elementClone, {
        position: 'fixed',
        top: start.top,
        left: start.left,
        transform: domUtil.transform(element, dest),
        zIndex: 1000
      });

      onEnd();
    };

    // Toggle visibility of the equivalent in the new view
    var onEnd = function() {
      elementClone.addEventListener('transitionend', function() {
        // Tell the equivalent in the
        // new view to become visible
        $rootScope.$broadcast(id + 'transitionend');

        // Remove this clone and cleanup
        window.requestAnimationFrame(function() {
          elementClone.removeEventListener('transitionend');
          // The new element in the new route becomes visible here
          window.requestAnimationFrame(function() {
            elementClone.remove();
            $element.remove();
          })
        });

      }, false);
    };

    // Add event listeners
    var transitionend = $rootScope.$on(id + 'transitionend', function() {
      // The destination state will now become active,
      // to handle the back button
      if (vm.state === 'destination') {

        element.style.visibility = 'visible';
        animationDelegate.unRegister(id, vm);
        vm.state = 'active';
      }
    });

    // Cleanup on destroy
    $scope.$on('$destroy', function () {
      transitionend();
    });
  }]);