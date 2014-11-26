angular.module('materialApp.directives')
  .controller('PersistCtrl', [
    '$scope',
    '$element',
    '$attrs',
    '$document',
    '$timeout',
    'animationDelegate',
  function($scope, $element, $attrs, $document, $timeout, animationDelegate) {

    // The elements involved
    var body = $document[0].body;
    var element = $element[0];
    var elementClone = null;

    // Get position of this element
    var offsets = element.getBoundingClientRect();
    var x = offsets.left + offsets.width/2;
    var y = offsets.top + offsets.height/2;
    // Get size of the body
    var h = body.clientHeight;
    var w = body.clientWidth;

    var start = {};

    $scope.$on('$destroy', function() {
      console.log('DESTROYED');
    });

    var expand = function() {
      elementClone = element.cloneNode(true);
      body.appendChild(elementClone);
      elementClone.onclick = collapse;

      start = {
        top: (element.offsetTop - body.scrollTop) + 'px;',
        left: element.offsetLeft + 'px;'
      };

      elementClone.setAttribute('style',
        'position: fixed;' +
        'top:' +  start.top +
        'left:' +  start.left +
        'padding: 0;' +
        'transform: translate3d(' +
          (-element.offsetLeft + 0.125*w) + 'px,' +
          (h - element.offsetTop - offsets.height - 64 + body.scrollTop) + 'px,0); ' +
        'z-index: 1000; '
      );
      // element.style.visibility = 'hidden';
    };

    // Collapse
    var collapse = function() {
      elementClone.setAttribute('style',
        'position: fixed;' +
        'top:' +  start.top +
        'left:' +  start.left +
        'z-index: 1000; '
      );
      // Reset the color block
      $timeout(function() {
        elementClone.setAttribute('style', '');
        element.style.visibility = 'visible';
        // body.removeChild(elementClone);
        elementClone.remove();
      }, 1200);
    };


    element.onclick = expand;

    // $element.bind('click', function(e) {
    //   expand();

    //   if (!didAttachListener) {
    //     e.currentTarget.addEventListener('transitionend', function() {
    //       didAttachListener = true;
    //     }, true);
    //   }
    // });

  }]);