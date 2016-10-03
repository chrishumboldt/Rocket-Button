/**
 * File: build/js/buttonplate.js
 * Type: Javascript component file
 * Author: Chris Humboldt
**/

// Component
var buttonplate = function () {
	// Variables
	var buttonDropClassName = 'buttonplate-drop-down';
	var defaults = {
		selector: '.button'
	};
	var documentOnClick = false;
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
		classClear: function (element) {
			if (this.exists(element)) {
				element.removeAttribute('class');
			}
		},
		classRemove: function (element, classValue) {
			var self = this;
			if (self.exists(element)) {
				if (typeof classValue === 'object') {
					for (var i = classValue.length - 1; i >= 0; i--) {
						self.classRemoveExecute(element, classValue[i]);
					}
				} else if (self.hasWhiteSpace(classValue)) {
					var classes = classValue.split(' ');
					for (var i = 0, len = classes.length; i < len; i++) {
						self.classRemoveExecute(element, classes[i]);
					}
				} else {
					self.classRemoveExecute(element, classValue);
				}
			}
		},
		classRemoveExecute: function (element, classValue) {
			if (element.className.indexOf(classValue) > -1) {
				element.className = element.className.split(' ').filter(function (val) {
					return val != classValue;
				}).toString().replace(/,/g, ' ');
				if (element.className === '') {
					this.classClear(element);
				}
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
	};
	// Functions
	var applyButtonDrop = function (options) {
		var buttonDrops = document.querySelectorAll(options.selector + ' ul');
		if (buttonDrops.length > 0) {
			for (var i = 0, len = buttonDrops.length; i < len; i++) {
				web.classAdd(buttonDrops[i].parentNode, buttonDropClassName);
				applyButtonDropEvent(buttonDrops[i].parentNode, buttonDrops[i]);
			}
		}
	};
	var applyButtonDropEvent = function (button, dropDown) {
		button.onclick = function () {
			closeAllOpenButtonDrops();
			dropDown.style.width = button.clientWidth + 'px';
			setTimeout(function () {
				web.classAdd(dropDown, '_open');
			}, 50);
		};
	};
	var applyDocumentOnClick = function () {
		documentOnClick = true;
		document.onclick = function() {
			closeAllOpenButtonDrops();
		};
	};
	var closeAllOpenButtonDrops = function () {
		var openDropDowns = document.querySelectorAll('.' + buttonDropClassName + ' ul._open');
		for (var i = 0, len = openDropDowns.length; i < len; i++) {
			web.classRemove(openDropDowns[i], '_open');
		}
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
		};

		// Execute
		applyButtonDrop(options);
		if (!documentOnClick) {
			applyDocumentOnClick();
		}
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
