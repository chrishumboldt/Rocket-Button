/*
Author: Chris Humboldt
*/

declare namespace Rocket {
   const defaults: any;

   // Basic checks
   function exists(check: any): any;

   interface has {
      class(element: any, className: any): any;
   }
   const has: has;

   interface is {
      element(check: any): boolean;
      email(check: any): boolean;
      function(check: any): boolean;
      number(check: any): boolean;
      object(check: any): boolean;
      password(check: any): boolean;
      string(check: any): boolean;
      touch(): boolean;
   }
   const is: is;

   // Button
   interface buttonLoaderOptions {
      element?: any;
      parseEvent?: any;
      reveal?: string;
      selector?: string;
      timeout?: number;
   }
   interface button {
      loader(options: buttonLoaderOptions): any;
   }
   let button: button;

   // Classes
   interface classes {
      add(elements: any, classes: any): any;
      remove(elements: any, classes: any): any;
   }
   const classes: classes;

   // Development
   function log(text: any): any;

   // DOM
   interface dom {
      body: any;
      html: any;
      select(target: string): any;
   }
   const dom: dom;

   // Events
   interface event {
      add(element: any, type: string, eventHandle: any): any;
      remove(element: any, type: string, eventHandle: any): any;
   }
   const event: event;

   // Gets
   interface get {
      extension(ext: string): string;
      index(elm: any): number;
   }
   const get: get

   // Helpers
   interface helper {
      setDefault(set: any, defauit: any): any;
   }
   const helper: helper;

   // Request
   interface requestOptions {
      url: string;
      asynch?: boolean;
      data?: any;
      dataForce?: string;
      dataType?: string;
      headers?: string;
      onComplete?: any;
      onError?: any;
      onLoading?: any;
      onStart?: any;
      onSuccess?: any;
      timeout?: number;
      type?: string;
      withCredentials?: boolean;
   }
   interface request {
      delete(options: requestOptions): any;
      get(options: requestOptions): any;
      post(options: requestOptions): any;
      put(options: requestOptions): any;
      run(options: requestOptions): any;
   }
   const request: request;

   // Storage
   interface storage {
      add(key: string, value: any): any;
      clear(): any;
      get(key: string): string;
      remove(key: string): any;
   }
   const storage: storage;

   // Modules
   const flicker: any;
   const form: any;
   const message: any;
}
