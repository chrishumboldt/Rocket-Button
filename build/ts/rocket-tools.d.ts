/**
 * Author: Chris Humboldt
**/

declare namespace Rocket {
   var defaults: any;

   // Basic checks
   function exists(check: any);

   interface has {
      class(element: any, className: any);
   }
   var has: has;

   interface is {
      element(check: any): boolean;
      function(check: any): boolean;
      object(check: any): boolean;
      string(check: any): boolean;
      touch(): boolean;
   }
   var is: is;

   // Classes
   interface classes {
      add(elements: any, classes: any);
      remove(elements: any, classes: any);
   }
   var classes: classes;

   // Development
   function log(text: any);

   // DOM
   interface dom {
      body: any;
      html: any;
      remove(target: any);
      select(target: string);
   }
   var dom: dom;

   // Events
   interface event {
      add(element: any, type: string, eventHandle: any);
      remove(element: any, type: string, eventHandle: any);
   }
   var event: event;

   // Helpers
   interface helper {
      setDefault(set: any, defauit: any);
   }
   var helper: helper;

   // Overlays
   interface overlay {
      hide();
      show();
   }
   var overlay: overlay;

   // Modules
   var button: any;
   var form: any;
   var message: any;
}
