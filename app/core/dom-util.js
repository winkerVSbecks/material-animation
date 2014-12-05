angular.module('materialApp.services')
  .service('domUtil', [
    '$document',
  function($document) {

    var service = {};
    var body, isDomReady;

    $document.ready(function() {
      body = $document[0].body;
      isDomReady = true;
    });

    // Get the body element
    service.getBodyElement = function() {
      return body;
    };

    // Append an element to the body
    service.appendToBody = function(el) {
      body.appendChild(el);
    };

    // Get the body size and
    // other misc info
    service.body = function() {
      // Get size of the body
      return {
        w: body.clientWidth,
        h: body.clientHeight,
        t: body.scrollTop
      };
    };

    // Get the position of an
    // element within it's parent
    // from the top left corner of the el
    service.getPos = function(el) {
      var off = el.getBoundingClientRect();

      return {
        left: off.left,
        top: off.top
      };
    };

    // Get the position of an
    // element within it's parent
    // from the el's center
    service.getPosCenter = function(el) {
      var off = el.getBoundingClientRect();

      return {
        left: off.left + off.width/2,
        top: off.top + off.height/2
      };
    };

    // Get the position of an
    // element within the body
    service.getAbsPos = R.compose(function(pos) {
        // pos.top -= body.scrollTop;
        return pos;
      },
      service.getPos);

    // Adds px suffix to a value
    var toPixels = function(v) {
      return v + 'px';
    };

    // Get absolute position with px units
    service.getAbsPosInPx = R.compose(
      R.mapObj(toPixels),
      service.getAbsPos);

    // Move element from it's abs position
    // using translate3d
    service.transform = function(el, newPos) {
      var pos = service.getAbsPos(el);

      var x = -pos.left + newPos.left;
      var y = -pos.top + newPos.top;

      return 'translate3d(' + x + 'px, ' + y + 'px, 0)';
    };

    // Conver to snake-case
    var toSnakeCase = function(str) {
      return str.replace(/([A-Z])/g, function(s) {
        return '-' + s.toLowerCase();
      });
    };

    // Apply styles to an element
    service.style = function(el, style) {
      var styleStr = '';

      angular.forEach(style, function(_val, _prop) {
        styleStr += toSnakeCase(_prop) + ': ' +
                    String(_val) + '; ';
      });

      el.setAttribute('style', styleStr);
    };

    return service;
  }]);