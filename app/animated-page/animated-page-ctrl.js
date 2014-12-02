angular.module('materialApp.directives')
  .controller('AnimatedPageCtrl', [
    '$scope',
    '$element',
    '$attrs',
    '$sniffer',
    '$document',
    '$timeout',
  function($scope, $element, $attrs, $sniffer, $document, $timeout) {

    var vm = this;

    // data passed in
    vm.blockColor = $scope.$eval($attrs.color);
    vm.end = $scope.$eval($attrs.end);
    vm.artist = $scope.$eval($attrs.artist);

    // Start state
    vm.state = 'collapsed';

    var cover = $element.find('div')[0];
    var svg = $element.find('svg')[0];

    // var offsets = cover.getBoundingClientRect();
    // var x = offsets.left + offsets.width/2;
    // var y = offsets.top + offsets.height/2;

    var x = 0;
    var y = 0;

    var ripple = $element.find('circle')[0];
        ripple.setAttribute('cx', x);
        ripple.setAttribute('cy', y);
        ripple.setAttribute('r', 0);

    // SVG Animations
    var rippleOpen = $element.find('animate')[2];
    var rippleClose = $element.find('animate')[3];
    var rippleBg = $element.find('animate')[0];
    var rippleBgUndo = $element.find('animate')[1];

    var h = document.body.clientHeight;
    var w = document.body.clientWidth;

    var expand = function() {
      // svg.setAttribute('style', 'z-index: 999;');

      vm.state = 'full';

      rippleOpen.beginElement();

      // Fade in the artist photo
      $timeout(function() {
        rippleBg.beginElement();
      }, 500);
    };

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

    expand();
  }]);