angular.module('materialApp.directives')
  .controller('AlbumCtrl', [
    '$scope',
    '$element',
    '$attrs',
    '$sniffer',
    '$document',
    '$timeout',
  function ($scope, $element, $attrs, $sniffer, $document, $timeout) {

    $scope.state = 'collapsed';
    $scope.sticky = false;

    var cover = $element.find('div')[0];

    var offsets = cover.getBoundingClientRect();
    var x = offsets.left + offsets.width/2;
    var y = offsets.top + offsets.height/2;

    var ripple = $element.find('circle')[0];
        ripple.setAttribute('cx', x);
        ripple.setAttribute('cy', y);
        ripple.setAttribute('r', 0);

    // SVG Animations
    var rippleOpen = document.getElementById('ripple-open');
    var rippleClose = document.getElementById('ripple-close');
    var rippleBg = document.getElementById('ripple-bg');
    var rippleBgUndo = document.getElementById('ripple-bg-undo');

    $scope.toggleCover = function(e) {
      // Expand
      if ($scope.state === 'collapsed') {

        $scope.state = 'full';
        $scope.sticky = true;
        $scope.animating = true;
        rippleOpen.beginElement();

        // Fade in the artist photo
        $timeout(function() {
          rippleBg.beginElement();
        }, 500);

      } else {
        // Collapse
        $scope.state = 'collapsed';
        $scope.animating = true;
        rippleClose.beginElement();

        // Reset the color block
        $timeout(function() {
          rippleBgUndo.beginElement();
        }, 800);
      }

      e.currentTarget.addEventListener('transitionend', function() {
        $scope.animating = false;
      }, true);
    };
  }])
  .directive('album', [function () {
    return {
      restrict: 'E',
      templateUrl: 'partials/album.html',
      controller: 'AlbumCtrl',
      link: function (scope, iElement, iAttrs) {
      }
    };
  }]);