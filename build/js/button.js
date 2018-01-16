/**
@author Chris Humboldt
**/

// Set the defaults
Rocket.defaults.button = {
   dropdown: {target: '.mod-button'},
   loader: {reveal: 'appear', timeout: 0}
};

// Module
Rocket.button = (() => {
   const store = {
      dropDownClassName: 'has-dropdown',
      docClick: false
   };

   // Methods
   const action = {
      hide: {
         allDropDowns() {
            const openDropDowns = Rocket.dom.select(`.${store.dropDownClassName} ul.is-open`);
            for (let i = 0, len = openDropDowns.length; i < len; i++) {
               Rocket.classes.remove(openDropDowns[i], 'is-open');
            }
         },
         dropdown() {
            Rocket.state.clear(this);
         },
         loader() {
            setTimeout(() => {
               Rocket.classes.remove(this, 'is-loading');
               this.removeAttribute('disabled');
            });
         }
      },
      show: {
         dropdown() {
            const { button, buttonUL } = this;

            action.hide.allDropDowns();
            buttonUL.style.width = `${button.clientWidth}px`;
            setTimeout(function () {
               Rocket.state.add(buttonUL, 'open');
            });
         },
         loader() {
            if (!this.getAttribute('disabled')) {
               setTimeout(() => {
                  Rocket.classes.add(this, 'is-loading');
                  this.setAttribute('disabled', '');
               });
            }
         }
      }
   };

   const apply = {
      dropdown(button) {
         const buttonUL = button.querySelector('ul');
         if (!buttonUL) return;

         Rocket.classes.add(button, store.dropDownClassName);
         Rocket.event.add(button, 'click', () => {
            action.show.dropdown.call({ button, buttonUL });
         });

         return {
            button,
            hide: action.hide.dropdown.bind(buttonUL),
            show: action.show.dropdown.bind({ button, buttonUL })
         };
      },
      loader({ button, timeout }) {
         action.show.loader.call(button);
         if (timeout > 0) { setTimeout(() => { action.hide.loader.call(button); }, timeout * 1000) }

         return {
            button,
            hide: action.hide.loader.bind(button),
            show: action.show.loader.bind(button)
         };
      }
   };

   const init = {
      dropdown({ target = Rocket.defaults.button.dropdown.target } = {}) {
         const objReturn = new Array;
         const buttons = Rocket.dom.select(target);

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

            return apply.loader({ button, timeout });
         }
      },
      setup() {
         if (!store.docClick) {
            Rocket.event.add(document, 'click', function () {
               action.hide.allDropDowns();
            });
            store.docClick = true;
         }
      }
   };

   // Expose and execute
   init.setup();
   return {
      dropdown: init.dropdown,
      loader: init.loader
   }
})();
