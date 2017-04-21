/**
@author Chris Humboldt
**/
// Rocket module extension
Rocket.defaults.button = {
    dropdown: {
        target: '.button'
    },
    loader: {
        reveal: 'appear',
        timeout: 0
    }
};
// Module container
var RockMod_Button;
(function (RockMod_Button) {
    // Variables
    var buttonDropClassName = 'rb-drop-down';
    var documentOnClick = false;
    // Functions
    function buttonDropApply(button) {
        // Variables
        var buttonUL = button.querySelector('ul');
        // Check
        if (!buttonUL) {
            return false;
        }
        // Functions
        function applyDrop() {
            Rocket.classes.add(button, buttonDropClassName);
            button.onclick = function () {
                buttonOpen();
            };
        }
        ;
        function buttonClose() {
            Rocket.classes.remove(buttonUL, '_open');
        }
        ;
        function buttonOpen() {
            closeAll();
            buttonUL.style.width = button.clientWidth + 'px';
            setTimeout(function () {
                Rocket.classes.add(buttonUL, '_open');
            });
        }
        ;
        // Execute and return
        applyDrop();
        return {
            button: button,
            close: buttonClose,
            open: buttonOpen
        };
    }
    ;
    function buttonLoaderApply(button, options) {
        // Functions
        function add() {
            setTimeout(function () {
                Rocket.classes.add(button, '_active');
                button.setAttribute('disabled', '');
            }, 10);
        }
        ;
        function remove() {
            setTimeout(function () {
                Rocket.classes.remove(button, '_active');
                button.removeAttribute('disabled');
            }, 20);
        }
        ;
        // Execute
        add();
        if (options.timeout > 0) {
            setTimeout(function () {
                remove();
            }, (options.timeout * 1000) + 50);
        }
        return {
            add: add,
            button: button,
            remove: remove
        };
    }
    ;
    function closeAll() {
        var openDropDowns = Rocket.dom.select('.' + buttonDropClassName + ' ul._open');
        for (var _i = 0, openDropDowns_1 = openDropDowns; _i < openDropDowns_1.length; _i++) {
            var dropDown = openDropDowns_1[_i];
            Rocket.classes.remove(dropDown, '_open');
        }
    }
    ;
    // Initialiser
    var init = {
        buttonDropDown: function (userOptions) {
            // Options
            if (!Rocket.is.object(userOptions)) {
                userOptions = false;
            }
            var options = {
                target: (Rocket.is.string(userOptions.target)) ? userOptions.target : Rocket.defaults.button.target
            };
            // Initialise drop down
            var buttons = Rocket.dom.select(options.target);
            var objReturn = [];
            // Catch
            if (buttons.length < 1) {
                return false;
            }
            // Continue
            for (var _i = 0, buttons_1 = buttons; _i < buttons_1.length; _i++) {
                var button = buttons_1[_i];
                objReturn.push(buttonDropApply(button));
            }
            return objReturn;
        },
        buttonLoader: function (uOptions) {
            // Options
            if (!Rocket.is.object(uOptions)) {
                return false;
            }
            var options = {
                element: (Rocket.is.element(uOptions.element)) ? uOptions.element : false,
                parseEvent: (typeof uOptions.parseEvent !== 'undefined') ? uOptions.parseEvent : false,
                reveal: (Rocket.is.string(uOptions.reveal)) ? uOptions.reveal : Rocket.defaults.button.loader.reveal,
                target: (Rocket.is.string(uOptions.target)) ? uOptions.target : '',
                timeout: (Rocket.is.number(uOptions.timeout)) ? uOptions.timeout : Rocket.defaults.button.loader.timeout
            };
            // Catch
            if (!options.element && !options.target) {
                return false;
            }
            // Continue
            if (options.parseEvent !== false) {
                options.parseEvent.preventDefault();
            }
            var elm = (options.element) ? options.element : Rocket.dom.select(options.target)[0];
            // Check
            setup.buttonLoader(elm, options);
            if (!Rocket.has.class(elm, '_active')) {
                return buttonLoaderApply(elm, options);
            }
        }
    };
    var setup = {
        buttonLoader: function (elm, options) {
            // Catch
            if (!Rocket.has.class(elm, 'rb-loader') && !Rocket.has.class(elm, 'rb-drop-down')) {
                var newInnerHTML = '';
                newInnerHTML += '<div class="rb-loader-elm"><div class="circle-one"></div><div class="circle-two"></div></div>';
                newInnerHTML += '<span>' + elm.innerHTML + '</span>';
                Rocket.classes.add(elm, 'rb-loader _reveal-' + options.reveal);
                elm.innerHTML = newInnerHTML;
            }
        },
        global: function () {
            if (!documentOnClick) {
                Rocket.event.add(document, 'click', function () {
                    closeAll();
                });
                documentOnClick = true;
            }
        }
    };
    // Execute
    setup.global();
    // Exports
    RockMod_Button.dropdown = init.buttonDropDown;
    RockMod_Button.loader = init.buttonLoader;
})(RockMod_Button || (RockMod_Button = {}));
// Bind to Rocket
Rocket.button = RockMod_Button;
