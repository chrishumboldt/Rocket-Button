/**
* File: build/ts/button.ts
* Type: Typescript file
* Author: Chris Humboldt
**/

// Rocket module extension
// NOTE: You do not need Rocket for this module to be used.
// This allows you to extend Rocket or use independently. Both will work.
var Rocket = (typeof Rocket === 'object') ? Rocket : {};
if (!Rocket.defaults) {
	Rocket.defaults = {};
}
Rocket.defaults.button = {
	selector: '.button'
};

// Module container
module RockMod_Button {
	// Functions
	function setup () {};
	function buttonDropDown (userOptions) {
		// Options
		if (typeof userOptions !== 'object') {
			userOptions = false;
		}
		const options = {
			selector: (typeof userOptions.selector === 'string') ? userOptions.selector : Rocket.defaults.button.selector
		};
	}
	// Execute
	setup();
	// Exports
	export let dropdown = buttonDropDown;
}

// Bind to Rocket
Rocket.button = RockMod_Button;
