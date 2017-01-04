/**
 * Author: Chris Humboldt
**/

import { optionsLoader } from './interfaces';

// Rocket module extension
// NOTE: You do not need Rocket for this module to be used.
// This allows you to extend Rocket or use independently. Both will work.
var Rocket = (typeof Rocket === 'object') ? Rocket : {};
if (!Rocket.defaults) {
	Rocket.defaults = {};
}
Rocket.defaults.button = {
	dropdown: {
		selector: '.button'
	},
   loader: {
      reveal: 'appear',
      timeout: 0
   }
};
if (!Rocket.event) {
	var eventMethods = {
		add: function (elem, type, eventHandle) {
			if (elem == null || typeof (elem) == 'undefined') return;
			if (elem.addEventListener) {
				elem.addEventListener(type, eventHandle, false);
			} else if (elem.attachEvent) {
				elem.attachEvent('on' + type, eventHandle);
			} else {
				elem['on' + type] = eventHandle;
			}
		},
		remove: function (elem, type, eventHandle) {
			if (elem == null || typeof (elem) == 'undefined') return;
			if (elem.removeEventListener) {
				elem.removeEventListener(type, eventHandle, false);
			} else if (elem.detachEvent) {
				elem.detachEvent('on' + type, eventHandle);
			} else {
				elem['on' + type] = eventHandle;
			}
		}
	};
	Rocket.event = eventMethods;
}

// Module container
module RockMod_Button {
	// Variables
	const buttonDropClassName = 'rb-drop-down';
	let documentOnClick = false;

	// Functions
   function buttonDropApply(button: any) {
		// Variables
		const buttonUL = button.querySelector('ul');
		// Check
		if (!buttonUL) {
			return false;
		}
		// Functions
		function applyDrop() {
			classAdd(button, buttonDropClassName);
			button.onclick = function () {
				buttonOpen();
			};
		};
		function buttonClose() {
			classRemove(buttonUL, '_open');
		};
		function buttonOpen() {
			closeAll();
			buttonUL.style.width = button.clientWidth + 'px';
			setTimeout(function () {
				classAdd(buttonUL, '_open');
			});
		};
		// Execute and return
		applyDrop();
		return {
			button: button,
			close: buttonClose,
			open: buttonOpen
		};
	};

   function buttonLoaderApply(button: any, options: any) {
      function add() {
         setTimeout(function () {
            classAdd(button, '_active');
            button.setAttribute('disabled', '');
         }, 50);
      };
      function remove() {
         classRemove(button, '_active');
         button.removeAttribute('disabled');
      };

      add();
      if (options.timeout > 0) {
         setTimeout(function () {
            remove();
         }, options.timeout + 50);
      }
      return {
         add: add,
         button: button,
         remove: remove
      };
   };

   function classAdd(element: any, className: string) {
		let listClassNames = element.className.split(' ');
		listClassNames.push(className);
		listClassNames = listClassNames.filter(function (value, index, self) {
			return self.indexOf(value) === index && value !== '';
		});
		// Apply the class again
		classApply(element, listClassNames);
	};

	function classApply(element: any, listClassNames: string[]) {
		if (listClassNames.length === 0) {
			element.removeAttribute('class');
		}
		else if (listClassNames.length === 1) {
			element.className = listClassNames[0];
		}
		else {
			element.className = listClassNames.join(' ');
		}
	};

	function classRemove(element: any, className :any) {
		let listClassNames = element.className.split(' ');
		listClassNames = listClassNames.filter(function (value, index, self) {
			return value !== className;
		});
		// Apply the class again
		classApply(element, listClassNames);
	};

	function closeAll() {
		let openDropDowns: any = document.querySelectorAll('.' + buttonDropClassName + ' ul._open');
		for (let dropDown of openDropDowns) {
			classRemove(dropDown, '_open');
		}
	};

   function hasClass(element, thisClass) {
      return (' ' + element.className + ' ').indexOf(' ' + thisClass + ' ') > -1;
   }

   function isElement(element: any) {
      return (element.nodeType && element.nodeType === 1) ? true : false;
   };

   // Initialiser
   const init = {
      buttonDropDown: function(userOptions) {
   		// Options
   		if (typeof userOptions !== 'object') {
   			userOptions = false;
   		}
   		const options = {
   			selector: (typeof userOptions.selector === 'string') ? userOptions.selector : Rocket.defaults.button.selector
   		};
   		// Initialise drop down
   		let buttons:any = document.querySelectorAll(options.selector);
   		let objReturn = [];
   		// Catch
   		if (buttons.length < 1) {
   			return false;
   		}
   		// Continue
   		for (let button of buttons) {
   			objReturn.push(buttonDropApply(button));
   		}
   		return objReturn;
   	},
      buttonLoader: function(uOptions: optionsLoader) {
         // Options
         if (typeof uOptions !== 'object') {
            return false;
         }
         const options = {
            element: (isElement(uOptions.element)) ? uOptions.element : false,
            parseEvent: (typeof uOptions.parseEvent !== 'undefined') ? uOptions.parseEvent : false,
            reveal: (typeof uOptions.reveal === 'string') ? uOptions.reveal : Rocket.defaults.button.loader.reveal,
            selector: (typeof uOptions.selector === 'string') ? uOptions.selector : '',
            timeout: (typeof uOptions.timeout === 'number') ? uOptions.timeout: Rocket.defaults.button.loader.timeout
         };

         // Catch
         if (!options.element && !options.selector) {
            return false;
         }
         // Continue
         if (options.parseEvent !== false) {
            options.parseEvent.preventDefault();
         }
         const elm = (options.element) ? options.element : document.querySelector(options.selector);

         // Check
         setup.buttonLoader(elm, options);
         if (!hasClass(elm, '_active')) {
            return buttonLoaderApply(elm, options);
         }
      }
   };
   const setup = {
      buttonLoader: function (elm: any, options: optionsLoader) {
         // Catch
         if (!hasClass(elm, 'rb-loader') && !hasClass(elm, 'rb-drop-down')) {
            var newInnerHTML = '';
            newInnerHTML += '<div class="loader"><div class="circle-one"></div><div class="circle-two"></div></div>';
            newInnerHTML += '<span>' + elm.innerHTML + '</span>';

            classAdd(elm, 'rb-loader _reveal-' + options.reveal);
            elm.innerHTML = newInnerHTML;
         }
      },
      global: function () {
         if (('ontouchstart' in window || 'onmsgesturechange' in window) === false) {
   			classAdd(document.getElementsByTagName('html')[0], 'rocket-no-touch');
   		}
   		if (!documentOnClick) {
   			documentOnClick = true;
   			Rocket.event.add(document, 'click', function () {
   				closeAll();
   			});
   		}
      }
   };

	// Execute
	setup.global();

	// Exports
	export let dropdown = init.buttonDropDown;
   export let loader = init.buttonLoader;
}

// Bind to Rocket
Rocket.button = RockMod_Button;
