/*
Author: Chris Humboldt
*/

///<reference path="../../node_modules/rocket-tools/index.d.ts" />
import { optionsDropDown, optionsLoader } from './interfaces';

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
         Rocket.classes.add(button, buttonDropClassName);
         button.onclick = function () {
            buttonOpen();
         };
      };

      function buttonClose() {
         Rocket.classes.remove(buttonUL, '_open');
      };

      function buttonOpen() {
         closeAll();
         buttonUL.style.width = button.clientWidth + 'px';
         setTimeout(function () {
            Rocket.classes.add(buttonUL, '_open');
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
      // Functions
      function add() {
         setTimeout(function () {
            Rocket.classes.add(button, '_active');
            button.setAttribute('disabled', '');
         }, 10);
      };

      function remove() {
         setTimeout(function () {
            Rocket.classes.remove(button, '_active');
            button.removeAttribute('disabled');
         }, 20);
      };

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
   };

   function closeAll() {
      let openDropDowns: any = Rocket.dom.select('.' + buttonDropClassName + ' ul._open');
      for (let dropDown of openDropDowns) {
         Rocket.classes.remove(dropDown, '_open');
      }
   };

   // Initialiser
   const init = {
      buttonDropDown: (userOptions) => {
         // Options
         if (!Rocket.is.object(userOptions)) {
            userOptions = false;
         }
         const options = {
            target: (Rocket.is.string(userOptions.target)) ? userOptions.target : Rocket.defaults.button.target
         };

         // Initialise drop down
         let buttons: any = Rocket.dom.select(options.target);
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
      buttonLoader: (uOptions: optionsLoader) => {
         // Options
         if (!Rocket.is.object(uOptions)) {
            return false;
         }
         const options = {
            element: (Rocket.is.element(uOptions.element)) ? uOptions.element : false,
            parseEvent: (typeof uOptions.parseEvent !== 'undefined') ? uOptions.parseEvent : false,
            reveal: (Rocket.is.string(uOptions.reveal)) ? uOptions.reveal : Rocket.defaults.button.loader.reveal,
            target: (Rocket.is.string(uOptions.target)) ? uOptions.target : '',
            timeout: (Rocket.is.number(uOptions.timeout)) ? uOptions.timeout: Rocket.defaults.button.loader.timeout
         };

         // Catch
         if (!options.element && !options.target) {
            return false;
         }
         // Continue
         if (options.parseEvent !== false) {
            options.parseEvent.preventDefault();
         }
         const elm = (options.element) ? options.element : Rocket.dom.select(options.target)[0];

         // Check
         setup.buttonLoader(elm, options);
         if (!Rocket.has.class(elm, '_active')) {
            return buttonLoaderApply(elm, options);
         }
      }
   };

   const setup = {
      buttonLoader: (elm: any, options: optionsLoader) => {
         // Catch
         if (!Rocket.has.class(elm, 'rb-loader') && !Rocket.has.class(elm, 'rb-drop-down')) {
            var newInnerHTML = '';
            newInnerHTML += '<div class="loader"><div class="circle-one"></div><div class="circle-two"></div></div>';
            newInnerHTML += '<span>' + elm.innerHTML + '</span>';

            Rocket.classes.add(elm, 'rb-loader _reveal-' + options.reveal);
            elm.innerHTML = newInnerHTML;
         }
      },
      global: () => {
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
   export let dropdown = init.buttonDropDown;
   export let loader = init.buttonLoader;
}

// Bind to Rocket
Rocket.button = RockMod_Button;
