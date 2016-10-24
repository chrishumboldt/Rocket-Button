# Buttonplate
A universal button library.

## Getting Started
You can either download a copy of the source files or install Buttonplate via Bower.

```
bower install buttonplate
```

## CSS Implementation
Start by including the necessary files.

```html
<head>
	<link href="css/buttonplate.min.css" rel="stylesheet" type="text/css">
</head>
```

Now class your button to gain the desired effect. For example:

```html
<button class="button line-red large">Example Button</button>
```

## SASS Implementation
Instead of including the CSS file above, you can import the SASS file and create your own button styles. See an example below:

```scss
@import "buttonplate/build/sass/import";

.btn-primary,
.btn-secondary {
   @include button-setup();
   @include button-shape(rounded);
}
.btn-primary {
   @include button-style(line, black);
   @include button-size(large);
}
.btn-secondary {
   @include button-style(flat, white);
   @include button-size(normal);
}
```

There are a variety of options for the SASS builds.

| SASS | Default | Options | Description |
| ---- | ---- | ---- | ---- |
| button-setup() | | | This is a required function that needs to be made on all buttons. |
| button-shape(x) | rounded | pill, rounded, square | Set the shape of the button. |
| button-size(x) | normal | small, normal, large, x-large | Set the size of the button. |
| button-style(x, y) | flat, white | flat, gradient, line | Set x to the style of button you want and y to the colour. |

## Javascript call
If you want to enable button drop downs then you will need to execute the following Javascript.

```html
<script src="js/buttonplate.min.js"></script>
<script>
Buttonplate.init({
   selector: '.btn-primary'
});
Buttonplate.init({
   selector: '.btn-secondary'
});
</script>
```

Each initialisation will return an array of component objects (An array will always be returned even if the selector is an id). This includes the button element itself as well as relevant methods. For example:

```javascript
var myButton = Buttonplate.init({
	selector: '#my-button'
});
// The button and all methods
console.log(myButton[0].button);
myButton[0].open();
setTimeout(function () {
	myButton[0].close();
}, 4000);
```

Alternatively if you know the button selector is unique you can reference the button right away by including the 0 index. For example:

```javascript
var myButton = Buttonplate.init({
	selector: '#my-button'
})[0]; // Reference the first item in the array right away.
```

## Close All Drop Downs
If you wish to close all open drop downs globally, for whatever reason, call the following Javascript method:

```javascript
Buttonplate.closeAll();
```

## Author
Created and maintained by Chris Humboldt<br>
Website: <a href="http://chrishumboldt.com/">chrishumboldt.com</a><br>
Twitter: <a href="https://twitter.com/chrishumboldt">twitter.com/chrishumboldt</a><br>
GitHub <a href="https://github.com/chrishumboldt">github.com/chrishumboldt</a><br>

## Copyright and License
Copyright 2016 Webplate Project

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
