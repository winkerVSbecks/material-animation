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
    vm.cover = $scope.$eval($attrs.cover);
    vm.artist = $scope.$eval($attrs.artist);

    // Start state
    vm.state = 'collapsed';
    vm.sticky = false;
    vm.animating = false;
    var doRipple = true;

    var cover = $element.find('div')[0];
    var svg = $element.find('svg')[0];

    var offsets = cover.getBoundingClientRect();
    var x = offsets.left + offsets.width/2;
    var y = offsets.top + offsets.height/2;

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

    var coverClone = null;

    var expand = function() {
      coverClone = cover.cloneNode(true);
      $element[0].appendChild(coverClone);
      coverClone.onclick = collapse;

      coverClone.setAttribute('style',
        'position: fixed; top:' + (cover.offsetTop - document.body.scrollTop) + 'px; ' +
        'left:' + cover.offsetLeft + 'px; ' +
        'transform: translate3d(' +
          (-cover.offsetLeft - 0.0025*w + 0.125*w) + 'px,' +
          (h - cover.offsetTop - offsets.height - 64 + document.body.scrollTop) + 'px,0); ' +
        'z-index: 1000; '
      );
      cover.style.visibility = 'hidden';
      svg.setAttribute('style', 'z-index: 999;');

      vm.state = 'full';
      vm.sticky = true;
      vm.animating = true;

      if (doRipple) {
        rippleOpen.beginElement();
      }

      // Fade in the artist photo
      $timeout(function() {
        if (doRipple) {
          rippleBg.beginElement();
        }
      }, 500);
    };

    var collapse = function() {
      // Collapse
      vm.state = 'collapsed';
      vm.animating = true;
      if (doRipple) {
        rippleClose.beginElement();
      }

      coverClone.setAttribute('style',
        'position: absolute; top:' + cover.offsetTop + 'px; ' +
        'left:' + cover.offsetLeft + 'px; ' +
        'z-index: 1000; '
      );
      // Reset the color block
      $timeout(function() {
        if (doRipple) {
          rippleBgUndo.beginElement();
          coverClone.setAttribute('style', '');
          cover.style.visibility = 'visible';
          svg.setAttribute('style', '');
          $element[0].removeChild(coverClone);
        }
      }, 1200);
    };

    vm.toggleCover = function(e) {
      // Expand
      if (vm.state === 'collapsed') {
        expand();
      } else {
        collapse();
      }

      if (!vm.didAttachListener) {
        e.currentTarget.addEventListener('transitionend', function() {
          vm.animating = false;
          vm.didAttachListener = true;
        }, true);
      }
    };
  }]);