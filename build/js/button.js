/**
@author Chris Humboldt
**/

// Set the defaults
Rocket.defaults.button = {
   dropdown: {targets: '.mod-button'},
   loader: {reveal: 'appear', timeout: 0}
};

// Module
Rocket.button = (() => {
   const store = {
      dropDownClassName: 'has-dropdown',
      docClick: false
   };

   // Methods
   const apply = {
      dropdown(button) {
         const buttonUL = button.querySelector('ul');

         if (!buttonUL) return;

         function close() {
            Rocket.state.clear(buttonUL);
         };

         function open() {
            closeAll();
            buttonUL.style.width = `${button.clientWidth}px`;
            setTimeout(function () {
               Rocket.state.add(buttonUL, 'open');
            });
         };

         // Expose and execute
         Rocket.classes.add(button, store.dropDownClassName);
         Rocket.event.add(button, 'click', () => {
            open(button, buttonUL);
         });
         return {button, close, open};
      },
      loader({ button, timeout }) {
         function add() {
            if (!button.getAttribute('disabled')) {
               setTimeout(() => {
                  Rocket.classes.add(button, 'is-loading');
                  button.setAttribute('disabled', '');
               });
            }
         }

         function remove() {
            setTimeout(() => {
               Rocket.classes.remove(button, 'is-loading');
               button.removeAttribute('disabled');
            });
         }

         // Expose and execute
         add();
         if (timeout > 0) { setTimeout(() => { remove(); }, timeout * 1000) }
         return {add, button, remove};
      }
   };

   function closeAll() {
      const openDropDowns = Rocket.dom.select(`.${store.dropDownClassName} ul.is-open`);
      for (let i = 0, len = openDropDowns.length; i < len; i++) {
         Rocket.classes.remove(openDropDowns[i], 'is-open');
      }
   };

   const init = {
      dropdown({ targets = Rocket.defaults.button.dropdown.targets } = {}) {
         const objReturn = new Array;
         const buttons = Rocket.dom.select(targets);

         if (buttons.length <= 0) return;

         buttons.forEach((button) => {
            objReturn.push(apply.dropdown(button));
         });

         return objReturn;
      },
      loader({
         element = null,
         parseEvent = null,
         reveal = Rocket.defaults.button.loader.reveal,
         target = null,
         timeout = Rocket.defaults.button.loader.timeout
      } = {}) {
         if (parseEvent) { parseEvent.preventDefault(); }
         if (!element && !target) { return; }

         const button = (element) ? element : Rocket.dom.element(target);

         if (!Rocket.has.class(button, 'is-loading')) {
            setup.buttonLoader({ button, reveal });
            return apply.loader({ button, timeout });
         }
      }
   };

   const setup = {
      buttonLoader: function ({ button, reveal }) {
         if (!button.querySelector('.mod-button-loader')) {
            let newInnerHTML = '';
            newInnerHTML += `
            <div class="mod-button-loader">
               <div class="mod-button-loader-circle"></div>
               <div class="mod-button-loader-circle"></div>
            </div>
            `;
            newInnerHTML += '<span>' + button.innerHTML + '</span>';
            button.innerHTML = newInnerHTML;
         }
         Rocket.classes.add(button, '_reveal-' + reveal);
      },
      global() {
         if (!store.docClick) {
            Rocket.event.add(document, 'click', function () {
               closeAll();
            });
            store.docClick = true;
         }
      }
   };

   // Expose and execute
   setup.global();
   return {
      dropdown: init.dropdown,
      loader: init.loader
   }
})();
