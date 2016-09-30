/**
 * File: build/js/buttonplate.js
 * Type: Javascript component file
 * Author: Chris Humboldt
**/

// Component
var buttonplate = function () {
	// Variables
	var defaults = {
		selector: '.button'
	};
	// Webplate tools (partial)
	var web = {
		element: {
			body: document.getElementsByTagName('body')[0],
			html: document.getElementsByTagName('html')[0]
		},
		classAdd: function (element, classValue) {
			var self = this;
			if (self.exists(element)) {
				if (typeof classValue === 'object') {
					for (var i = 0, len = classValue.length; i < len; i++) {
						self.classAddExecute(element, classValue[i]);
					}
				} else if (self.hasWhiteSpace(classValue)) {
					var classes = classValue.split(' ');
					for (var i = 0, len = classes.length; i < len; i++) {
						self.classAddExecute(element, classes[i]);
					}
				} else {
					self.classAddExecute(element, classValue);
				}
			}
		},
		classAddExecute: function (element, classValue) {
			var crtClass = element.className;
			if (crtClass.match(new RegExp('\\b' + classValue + '\\b', 'g')) === null) {
				element.className = crtClass === '' ? classValue : crtClass + ' ' + classValue;
			}
		},
		exists: function (check) {
			return (check === null || check === false || typeof (check) == 'undefined') ? false : true;
		},
		hasClass: function (element, classValue) {
			return (' ' + element.className + ' ').indexOf(' ' + classValue + ' ') > -1;
		},
		hasWhiteSpace: function (check) {
			return /\s/.test(check);
		},
		isTouch: function () {
			return 'ontouchstart' in window || 'onmsgesturechange' in window;
		},
		log: function (text) {
			if (window && window.console) {
				console.log(text);
			}
		}
	}
	// Functions
	var applyButtonDrop = function (options) {
		getButtonDrops(options, function (buttonDrops) {
			for (var i = 0, len = buttonDrops.length; i < len; i++) {
				web.classAdd(buttonDrops[i].parentNode, 'buttonplate-drop-down');
				applyButtonDropEvent(buttonDrops[i].parentNode, buttonDrops[i]);
			}
		});
	};
	var applyButtonDropEvent = function (button, dropDown) {
		button.onclick = function () {
			closeAllOpenButtonDrops();
			dropDown.style.width = button.clientWidth + 'px';
			web.classAdd(dropDown, '_open');
		};
	};
	var closeAllOpenButtonDrops = function () {
		// var buttonDrops = document.querySelectorAll(options.selector + ' ul');
		// if (buttonDrops.length > 0) {
		//
		// }
	};
	var getButtonDrops = function (options, callBack) {
		var buttonDrops = document.querySelectorAll(options.selector + ' ul');
		if (buttonDrops.length > 0 && typeof callBack === 'function') {
			return callBack(buttonDrops);
		}
		return false;
	};
	var touchCheck = function () {
		if (!web.isTouch()) {
			web.classAdd(web.element.html, 'buttonplate-no-touch');
		}
	};
	// Initialiser
	var init = function (userOptions) {
		var userOptions = userOptions || false;
		var options = {
			selector: userOptions.selector || defaults.selector
		}

		// Execute
		applyButtonDrop(options);
	};
	// Return
	return {
		defaults: defaults,
		init: init,
		touchCheck: touchCheck
	};
}();

// Execute
buttonplate.touchCheck();

/*
var $buttonplateDefault = {
	selector: '.button'
};

var buttonplate = function($userOptions) {
	// Tools
	var tool = function(document) {
		// Variables
		var $toolEl = {
			body: document.getElementsByTagName('body')[0],
			html: document.getElementsByTagName('html')[0]
		};

		// Functions
		var classAdd = function($element, $class) {
			var $crtClass = $element.className;
			if ($crtClass.match(new RegExp('\\b' + $class + '\\b', 'g')) === null) {
				$element.className = $crtClass === '' ? $class : $crtClass + ' ' + $class;
			}
		};
		var classClear = function($element) {
			$element.removeAttribute('class');
		};
		var classRemove = function($element, $class) {
			if ($element.className.indexOf($class) > -1) {
				$element.className = $element.className.split(' ').filter(function($val) {
					return $val != $class;
				}).toString().replace(/,/g, ' ');
				if ($element.className === '') {
					classClear($element);
				}
			}
		};
		var isTouch = function() {
			return 'ontouchstart' in window || 'onmsgesturechange' in window;
		};

		return {
			classAdd: classAdd,
			classClear: classClear,
			classRemove: classRemove,
			element: $toolEl,
			isTouch: isTouch
		}
	}(document);

	// Select elements
	var $selector = ($userOptions && $userOptions.selector) ? $userOptions.selector : $buttonplateDefault.selector;
	var $selectorType = $selector.charAt(0).toString();
	if ($selectorType === '#' && $selector.indexOf('.') < 0) {
		new buttonplateComponent(document.getElementById($selector.substring(1)), tool);
	} else {
		var $elements = document.querySelectorAll($selector);
		for (var $i = 0; $i < $elements.length; $i++) {
			new buttonplateComponent($elements[$i], tool);
		}
	}
};

var buttonplateComponent = function($this, tool) {
	// Variables
	var $self = $this;
	var $buttonDropDown = $self.getElementsByTagName('ul')[0];

	// Internal functions
	function basicSetup() {
		if (!tool.isTouch()) {
			tool.classAdd(tool.element.html, 'buttonplate-no-touch');
		}
	};

	function buttonDropDownSetup() {
		if ($buttonDropDown !== undefined) {
			tool.classAdd($self, 'buttonplate-drop-down');
			buttonDropDownTrigger();
		}
	};

	function buttonDropDownTrigger() {
		// Hide existing
		document.onclick = function() {
			var $openDropDowns = document.querySelectorAll('.buttonplate-drop-down .open');
			for (var $i = $openDropDowns.length - 1; $i >= 0; $i--) {
				tool.classRemove($openDropDowns[$i], 'open');
			};
		};
		$buttonDropDown.onclick = function() {
			setTimeout(function() {
				tool.classRemove($buttonDropDown, 'open');
			}, 15);
		};

		// Show
		$self.onclick = function() {
			setTimeout(function() {
				var $buttonW = $self.clientWidth;
				$buttonDropDown.style.width = $buttonW + 'px';
				tool.classAdd($buttonDropDown, 'open');
			});
		};
	}

	// Calls
	basicSetup();
	buttonDropDownSetup();
};
*/
