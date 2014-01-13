/**
 * buttonplate.js
 *
 * Author:        	Chris Humboldt
 * Last Edited:   	13 January 2014
 * Edited By:   	Chris Humboldt
 */


// Plugin
(function($){

	var $buttons							= function(){
		
		// ------------------------------------------------ SETUP
		var $object 						= this;
		var $btn_width						= 0;
		

		// ------------------------------------------------ SETTINGS
		$object.settings 					= {};
		

		// ------------------------------------------------ INITIALIZE
		$object.init 						= function($element, settings){
			
			// Check if the settings are being edited via the call
			$object.settings 				= $.extend($object.settings, settings);
			
			// Some variables
			$this_button					= $element;
			
			// Close any drop downs
			$('html').on('click', function(){
				
				$('.drop-down-open').removeClass('drop-down-open').find('ul').hide();
			});
			
			// Set list options / Show list function
			if($this_button.find('ul').length > 0){
				
				$btn_width					= $this_button.outerWidth();
				$this_button.find('ul').width($btn_width);
				
				$object.show_drop_down();
			}
		}
		

		// ------------------------------------------------ FUNCTIONS
		$object.show_drop_down				= function(){
			
			$this_button.on('click', function(){
				
				$this_button.find('ul').fadeIn('fast', function(){
					
					$this_button.addClass('drop-down-open');
				});
			});
		}
	};
	
	// Call the plugin
	$.fn.buttons							= function($options){
		
		var len = this.length;

		return this.each(function(index) {
			
			var me = $(this), key = 'buttons' + (len > 1 ? '-' + ++index : ''), instance = (new $buttons).init(me, $options);
			me.data(key, instance).data('key', key);
		});
	};
	
}(jQuery));