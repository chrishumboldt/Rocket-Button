var Rocket = (typeof Rocket === 'object') ? Rocket : {};
if (!Rocket.defaults) {
    Rocket.defaults = {};
}
Rocket.defaults.button = {
    selector: '.button'
};
var RockMod_Button;
(function (RockMod_Button) {
    function setup() { }
    ;
    function buttonDropDown(userOptions) {
        if (typeof userOptions !== 'object') {
            userOptions = false;
        }
        var options = {
            selector: (typeof userOptions.selector === 'string') ? userOptions.selector : Rocket.defaults.button.selector
        };
    }
    setup();
    RockMod_Button.dropdown = buttonDropDown;
})(RockMod_Button || (RockMod_Button = {}));
Rocket.button = RockMod_Button;
