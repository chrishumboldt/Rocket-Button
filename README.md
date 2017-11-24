# Rocket Button
A lightweight, universal button module.

* [Getting Started](#getting-started)
* [CSS Implementation](#css-implementation)
* [SASS Implementation](#sass-implementation)
* [Javascript Initialization](#javascript-initialization)
* [Loader Options](#loader-options)
* [Defaults](#defaults)
* [Buttonplate Deprecated](#buttonplate-deprecated)

## Getting Started
Install via NPM.

```
npm install rocket-button
```

**NOTE** that this module has a dependency [Rocket Tools (28kb)](https://github.com/chrishumboldt/Rocket-Tools) which will automatically be installed as well.

## CSS Implementation
Start by including the necessary files.

```html
<head>
   <link href="node_modules/rocket-button/css/button.min.css" rel="stylesheet" type="text/css">
</head>
```

Now class your button and add a modifier to gain the desired effect. For example:

```html
<button class="mod-button _style-line-red _size-large">Example Button</button>
```

There are a variety of options for the CSS modifiers.

Class | Options | Description
---- | ---- | ----
`_style-flat-(x)` | `white` `grey` `black` `aqua` `blue` `green`<br>`orange` `pink` `purple` `red` `yellow` | Set the colour and style to flat.
`_style-gradient-(x)` | `white` `grey` `black` `aqua` `blue` `green`<br>`orange` `pink` `purple` `red` `yellow` | Set the colour and style to gradient.
`_style-line-(x)` | `white` `grey` `black` `aqua` `blue` `green`<br>`orange` `pink` `purple` `red` `yellow` | Set the colour and style to line.
`_size-(x)` | `small` `normal` `large` `x-large` | Set the size of the the button.
`_shape-(x)` | `rounded` `pill` `square` | Set the shape of the the button.

If no modifiers are provided then the colour will default to grey, the style to flat, the size to normal and the shape to rounded.

## SASS Implementation
Instead of including the CSS file above, you can import the SASS file and create your own button styles. See an example below:

```scss
@import "node_modules/rocket-button/build/sass/import";

.btn-primary,
.btn-secondary {
   @include mod-button-setup;
   @include mod-button-shape(rounded);
   @include mod-button-size(normal);
}
.btn-primary {
   @include mod-button-style(line, black);
   @include mod-button-size(large);
}
.btn-secondary {
   @include mod-button-style(flat, white);
}
```

There are a variety of options for the SASS builds.

SASS | Default | Options | Description
---- | ---- | ---- | ----
`mod-button-setup` | | | Apply to all buttons.
`mod-button-shape(x)` | `rounded` | `pill` `rounded` `square` | Set the shape of the button.
`mod-button-size(x)` | `normal` | `small` `normal` `large` `x-large` | Set the size of the button.
`mod-button-style(x, y)` | `flat`, `white` | `flat` `gradient` `line` | Set `x` to the style of button.<br>Set `y` to the colour.
`rocket-button-css(x)` | `.mod-button` | | Create styles for selector `x`.

## Javascript Initialisation
If you want to enable button loaders or drop downs then you will need to execute the following Javascript. Start by including the necessary files. By default the drop down target option is set to **.mod-button**.

```html
<body>
   <button id="button-loader" class="mod-button _style-flat-blue">Button Loader</button>

   <div id="btn-primary" class="mod-button _style-flat-blue">
      Drop Down Default<div class="mod-button-arrow"></div>
      <ul>
         <li><a href>Link 1</a></li>
         <li><a href>Link 2</a></li>
         <li class="mod-button-line-top"><a href>Link 3</a></li>
      </ul>
   </div>

   <!-- Include the scripts -->
   <script src="node_modules/rocket-tools/js/tools.min.js"></script>
   <script src="node_modules/rocket-button/js/button.min.js"></script>
   <script>
   // Loader
   Rocket.event.add('#button-loader', 'click', (event) => {
      Rocket.button.loader({
         element: event.currentTarget,
         parseEvent: event
      });
   });

   // Drop down
   Rocket.button.dropdown({
      targets: '#btn-primary'
   });
</script>
</body>
```

The button loader returns the element instance. You can modify the loader after that.

```javascript
// Start the button loader
const btnLoader = Rocket.button.loader({
   element: Rocket.dom.element('#button-loader')
});

// The button element
Rocket.log(btnLoader.button);

// Remove the loader
setTimeout(function () {
   btnLoader.remove();
}, 4000);
```

Each drop down initialisation will return an array of module objects (An array will always be returned even if the target is an id). This includes the button element itself as well as relevant methods. For example:

```javascript
// By default the targets option is set to '.mod-button'
const buttons = Rocket.button.dropdown();

// The buttons and all methods
for (let i = 0, len = buttons.length; i < len; i++) {
   console.log(buttons[i].button);
   buttons[i].open(); // Open the button drop down
   buttons[i].close(); // Close the button drop down
}
```

Alternatively if you know the button target is unique you can reference the button right away with the 0 index. For example:

```javascript
const myButton = Rocket.button.dropdown({
   target: '#my-button'
})[0]; // Reference the first item in the array right away.
```

#### Loader Options
Name | Default | Options | Description
---- | ---- | ---- | ----
`element` | | | Provide the button element to attach the loader to.
`parseEvent` | | | Parse a click event to prevent the default action.
`reveal` | `appear` | `appear` `slide-down` `slide-up` | Set the loader reveal.
`timeout` | `0` | | Set the timeout of the loader (in seconds).<br>`0` is infinite.

#### Defaults
You can also overwrite the module target option globally by altering the Rocket defaults. To do so reference the defaults object property, for example:

```javascript
Rocket.defaults.button.loader.reveal = 'slide-up';
Rocket.defaults.button.dropdown.target = '.new-button-class';
```

## Buttonplate Deprecated
The original library, Buttonplate, has been deprecated. The entire Webplate project is being refactored and rebranded with a new development philosophy. Buttonplate will be maintained only with bug fixes under the **buttonplate** branch.

## Author
Created and maintained by Chris Humboldt<br>
Website: <a href="http://chrishumboldt.com/">chrishumboldt.com</a><br>
Twitter: <a href="https://twitter.com/chrishumboldt">twitter.com/chrishumboldt</a><br>
GitHub <a href="https://github.com/chrishumboldt">github.com/chrishumboldt</a><br>

## Copyright and License
Copyright 2017 Rocket Project

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
