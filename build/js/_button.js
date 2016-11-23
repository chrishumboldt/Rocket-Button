/**
* File: build/js/button.js
* Type: Javascript file
* Author: --Your Name Here--
**/

// Rocket module extension
// NOTE: You do not need Rocket for this module to be used.
// This allows you to extend Rocket or use independently. Both will work.
var Rocket = (typeof Rocket === 'object') ? Rocket : {};
if (!Rocket.defaults) {
	Rocket.defaults = {};
}
Rocket.defaults.button = {
	key: 'value'
};

// Module container
var RockMod_Button;
(function (RockMod_Button) {
	// Initialiser
	function init (uOptions) {
		/*
		Write your code here.
		*/
	};
	// Exports
	RockMod_Button.init = init;
})(RockMod_Button || (RockMod_Button = {}));

// Bind to Rocket object
Rocket.button = RockMod_Button.init;
