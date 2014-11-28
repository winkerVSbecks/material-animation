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

    // Get the id and destination style
    var id = $scope.$eval($attrs.persist);
    var destStyle = $scope.$eval($attrs.destStyle) || {};

    // The elements involved
    var element = $element[0];
    var elementClone = null;
    var transform = {};

    // Register with the animation service as an movable element
    var registerAsMovable = function() {
      animationDelegate.registerAsMovable(id, vm);
      vm.state = 'movable';
    };

    // If there is a clone in transition register as a destination
    var doRegisterAsMovable = animationDelegate.registerAsDestination(id, element);

    if (doRegisterAsMovable) {
      registerAsMovable();
    } else {
      vm.state = 'destination';
    }

    // Clone the element
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

      angular.extend(destStyle, {
        position: 'fixed',
        top: start.top,
        left: start.left,
        transform: domUtil.transform(element, dest),
        zIndex: 1000
      });

      domUtil.style(elementClone, destStyle);

      onTransitionStart();
    };

    // Toggle visibility of the equivalent in the new view
    var onTransitionStart = function() {
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


    // Transiton End Event
    var transitionEndListener = $rootScope.$on(id + 'transitionend', function() {
      // The destination state will now become movable,
      // to handle the back button
      if (vm.state === 'destination') {
        // Make the destination element visible
        element.style.visibility = 'visible';
        // Unregister this clone
        animationDelegate.unRegister(id, vm);
        // Set state to movable
        vm.state = 'movable';
      }
    });

    // Register after a transition is complete
    var registerAsMovableListener = $rootScope.$on('PersistElementsRegister', registerAsMovable);

    // Cleanup on destroy
    $scope.$on('$destroy', function () {
      transitionEndListener();
      registerAsMovableListener();
    });
  }]);