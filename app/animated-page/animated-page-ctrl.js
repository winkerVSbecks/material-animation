angular.module('materialApp.directives')
  .controller('AnimatedPageCtrl', [
    '$scope',
    '$element',
    '$attrs',
    '$timeout',
    'animationDelegate',
  function($scope, $element, $attrs, $timeout, animationDelegate) {

    var vm = this;

    // data passed in
    vm.blockColor = $scope.$eval($attrs.color);
    vm.end = $scope.$eval($attrs.end);
    vm.artist = $scope.$eval($attrs.artist);

    // Start state
    vm.state = 'collapsed';

    var cover = $element.find('div')[0];
    var svg = $element.find('svg')[0];

    // Position the ripple
    var ripple = $element.find('circle')[0];
        ripple.setAttribute('cx', animationDelegate.elPos.left);
        ripple.setAttribute('cy', animationDelegate.elPos.top);
        ripple.setAttribute('r', 0);

    // SVG Animations
    var rippleOpen = $element.find('animate')[2];
    var rippleClose = $element.find('animate')[3];
    var rippleBg = $element.find('animate')[0];
    var rippleBgUndo = $element.find('animate')[1];

    // Expand out and colour fades to image
    var expand = function() {
      vm.state = 'full';

      rippleOpen.beginElement();

      // Fade in the artist photo
      $timeout(function() {
        rippleBg.beginElement();
      }, 500);
    };

    // Collapse back into a ball, only the image
    var collapse = function() {
      // Collapse
      vm.state = 'collapsed';
      rippleClose.beginElement();

      // Reset the color block
      $timeout(function() {
        rippleBgUndo.beginElement();
        svg.setAttribute('style', '');
      }, 1200);
    };

    // Start expand on load
    expand();
  }]);