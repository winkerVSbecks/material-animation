
angular.module('materialApp', [
  'ngAnimate'
])
.controller('AnimationController', [
  '$scope',
  '$sniffer',
  '$document',
function($scope, $sniffer, $document, $window) {

  $scope.state = 'collapsed';

  $scope.toggleCover = function(e) {
    if ($scope.state === 'collapsed') {
      $scope.state = 'full';
      $scope.animating = true;
      createRipple(e.currentTarget);
    } else {
      $scope.state = 'collapsed';
      $scope.animating = true;
      undoRipple(e.currentTarget);
    }

    e.currentTarget.addEventListener('transitionend', function() {
      $scope.animating = false;
    }, true);
  };

}]);

var createRipple = function(target) {
  var parentDiv = target.parentNode;
  angular.element(parentDiv).find('svg').remove();

  var offsets = target.getBoundingClientRect();
  var x = offsets.left + offsets.width/2;
  var y = offsets.top + offsets.height/2;

  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', x);
      circle.setAttribute('cy', y);
      circle.setAttribute('r', 0);

  var animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      animate.setAttribute('attributeType', 'XML');
      animate.setAttribute('begin', '0s');
      animate.setAttribute('attributeName', 'r');
      animate.setAttribute('from', '0');
      animate.setAttribute('to', '200%');
      animate.setAttribute('dur', '600ms');
      animate.setAttribute('fill', 'freeze');

  circle.appendChild(animate);
  svg.appendChild(circle);

  parentDiv.insertBefore(svg, target);
};


var undoRipple = function(target) {
  var parentDiv = target.parentNode;
  var svg = parentDiv.getElementsByTagName('svg')[0];

  if (!svg) return;

  var circle = svg.getElementsByTagName('circle')[0];

  var animate = circle.getElementsByTagName('animate')[0];
  circle.removeChild(animate);

  animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
  animate.setAttribute('attributeType', 'XML');
  animate.setAttribute('begin', 'indefinite');
  animate.setAttribute('attributeName', 'r');
  animate.setAttribute('from', '200%');
  animate.setAttribute('to', '0');
  animate.setAttribute('dur', '900ms');
  animate.setAttribute('fill', 'freeze');

  circle.appendChild(animate);

  animate.beginElement();
};