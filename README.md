
## Angular Animations

[Animation Guide](https://docs.angularjs.org/guide/animations)
[$animate](https://docs.angularjs.org/api/ngAnimate/service/$animate)
[Animations Tutorial](https://docs.angularjs.org/tutorial/step_12)


## $animate

### Methods

`animate(element, from, to, [className], [options]);`

Performs an inline animation on the element which applies the provided to and from CSS styles to the element. If any detected CSS transition, keyframe or JavaScript matches the provided className value then the animation will take on the provided styles. For example, if a transition animation is set for the given className then the provided from and to styles will be applied alongside the given transition. If a JavaScript animation is detected then the provided styles will be given in as function paramters.

```js
ngModule.animation('.my-inline-animation', function() {
  return {
    animate : function(element, className, from, to, done) {
      //styles
    }
  }
});
```



## Directives That Support Animations

- `ngRepeat`:    enter, leave, and move
- `ngView`:  enter and leave
- `ngInclude`:   enter and leave
- `ngSwitch`:    enter and leave
- `ngIf`:    enter and leave
- `ngClass`: or  add and remove
- `ngShow` & `ngHide`: add and remove (the ng-hide class value- )



## How do I use animations in my own directives?

Animations within custom directives can also be established by injecting $animate directly into your directive and making calls to it when needed.

```js
myModule.directive('my-directive', ['$animate', function($animate) {
  return function(scope, element, attrs) {
    element.on('click', function() {
      if(element.hasClass('clicked')) {
        $animate.removeClass(element, 'clicked');
      } else {
        $animate.addClass(element, 'clicked');
      }
    });
  };
}]);
```



## View Transition

http://tgeorgiev.blogspot.ca/2013/11/animate-ngview-transitions-in-angularjs.html

Custom directive that tracks direction

```js
.directive('view', function() {

if ($location.path == locations[locations.length-1]) isBack = true;
..doTransition();
locations.push($location.path())
```


[ng-repeat example](http://angular.github.io/angular-phonecat/step-12/app/#/phones)

CSS Classes

```css
.view-animate-container {
  position:relative;
  height:100px!important;
  position:relative;
  background:white;
  border:1px solid black;
  height:40px;
  overflow:hidden;
}

.view-animate {
  padding:10px;
}

.view-animate.ng-enter, .view-animate.ng-leave {
  -webkit-transition:all cubic-bezier(0.250, 0.460, 0.450, 0.940) 1.5s;
  transition:all cubic-bezier(0.250, 0.460, 0.450, 0.940) 1.5s;

  display:block;
  width:100%;
  border-left:1px solid black;

  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  padding:10px;
}

.view-animate.ng-enter {
  left:100%;
}
.view-animate.ng-enter.ng-enter-active {
  left:0;
}
.view-animate.ng-leave.ng-leave-active {
  left:-100%;
}
```