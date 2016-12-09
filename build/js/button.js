"use strict";
var Rocket = (typeof Rocket === 'object') ? Rocket : {};
if (!Rocket.defaults) {
    Rocket.defaults = {};
}
Rocket.defaults.button = {
    dropdown: {
        selector: '.button'
    }
};
if (!Rocket.event) {
    var eventMethods = {
        add: function (elem, type, eventHandle) {
            if (elem == null || typeof (elem) == 'undefined')
                return;
            if (elem.addEventListener) {
                elem.addEventListener(type, eventHandle, false);
            }
            else if (elem.attachEvent) {
                elem.attachEvent('on' + type, eventHandle);
            }
            else {
                elem['on' + type] = eventHandle;
            }
        },
        remove: function (elem, type, eventHandle) {
            if (elem == null || typeof (elem) == 'undefined')
                return;
            if (elem.removeEventListener) {
                elem.removeEventListener(type, eventHandle, false);
            }
            else if (elem.detachEvent) {
                elem.detachEvent('on' + type, eventHandle);
            }
            else {
                elem['on' + type] = eventHandle;
            }
        }
    };
    Rocket.event = eventMethods;
}
var RockMod_Button;
(function (RockMod_Button) {
    var buttonDropClassName = 'rb-drop-down';
    var documentOnClick = false;
    function buttonDropApply(button) {
        var buttonUL = button.querySelector('ul');
        if (!buttonUL) {
            return false;
        }
        function applyDrop() {
            classAdd(button, buttonDropClassName);
            button.onclick = function () {
                buttonOpen();
            };
        }
        ;
        function buttonClose() {
            classRemove(buttonUL, '_open');
        }
        ;
        function buttonOpen() {
            closeAll();
            buttonUL.style.width = button.clientWidth + 'px';
            setTimeout(function () {
                classAdd(buttonUL, '_open');
            });
        }
        ;
        applyDrop();
        return {
            button: button,
            close: buttonClose,
            open: buttonOpen
        };
    }
    ;
    function classAdd(element, className) {
        var listClassNames = element.className.split(' ');
        listClassNames.push(className);
        listClassNames = listClassNames.filter(function (value, index, self) {
            return self.indexOf(value) === index && value !== '';
        });
        classApply(element, listClassNames);
    }
    ;
    function classApply(element, listClassNames) {
        if (listClassNames.length === 0) {
            element.removeAttribute('class');
        }
        else if (listClassNames.length === 1) {
            element.className = listClassNames[0];
        }
        else {
            element.className = listClassNames.join(' ');
        }
    }
    ;
    function classRemove(element, className) {
        var listClassNames = element.className.split(' ');
        listClassNames = listClassNames.filter(function (value, index, self) {
            return value !== className;
        });
        classApply(element, listClassNames);
    }
    ;
    function closeAll() {
        var openDropDowns = document.querySelectorAll('.' + buttonDropClassName + ' ul._open');
        for (var _i = 0, openDropDowns_1 = openDropDowns; _i < openDropDowns_1.length; _i++) {
            var dropDown = openDropDowns_1[_i];
            classRemove(dropDown, '_open');
        }
    }
    ;
    function hasClass(element, thisClass) {
        return (' ' + element.className + ' ').indexOf(' ' + thisClass + ' ') > -1;
    }
    function isElement(element) {
        return (element.nodeType && element.nodeType === 1) ? true : false;
    }
    ;
    var init = {
        buttonDropDown: function (userOptions) {
            if (typeof userOptions !== 'object') {
                userOptions = false;
            }
            var options = {
                selector: (typeof userOptions.selector === 'string') ? userOptions.selector : Rocket.defaults.button.selector
            };
            var buttons = document.querySelectorAll(options.selector);
            var objReturn = [];
            if (buttons.length < 1) {
                return false;
            }
            for (var _i = 0, buttons_1 = buttons; _i < buttons_1.length; _i++) {
                var button = buttons_1[_i];
                objReturn.push(buttonDropApply(button));
            }
            return objReturn;
        },
        buttonLoader: function (uOptions) {
            if (typeof uOptions !== 'object') {
                return false;
            }
            var options = {
                element: (isElement(uOptions.element)) ? uOptions.element : false,
                parseEvent: (typeof uOptions.parseEvent !== 'undefined') ? uOptions.parseEvent : false,
                reveal: (typeof uOptions.reveal === 'string') ? uOptions.reveal : 'appear',
                selector: (typeof uOptions.selector === 'string') ? uOptions.selector : false,
                timeout: (typeof uOptions.timeout === 'number') ? uOptions.timeout : false
            };
            if (!options.element && !options.selector) {
                return false;
            }
            if (options.parseEvent !== false) {
                options.parseEvent.preventDefault();
            }
            setup.buttonLoader(options);
        }
    };
    var setup = {
        buttonLoader: function (options) {
            var elm = (options.element) ? options.element : document.querySelector(options.selector);
            if (hasClass(elm, 'rb-loader')) {
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
    setup.global();
    RockMod_Button.dropdown = init.buttonDropDown;
    RockMod_Button.loader = init.buttonLoader;
})(RockMod_Button || (RockMod_Button = {}));
Rocket.button = RockMod_Button;
