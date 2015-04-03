/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
(function() {
	var $bodyEl = $('body'),
		$content = $('.container'),
		$openbtn = $('#button_menu, #button_searching'),
		$closebtn = $('.close-button'),
		isOpen = false;

	function init() {
		initEvents();
	}

	function initEvents() {
		$openbtn.on( 'click', toggleMenu );
		if( $closebtn ) {
			$closebtn.on( 'click', toggleMenu );
		}

		// close the menu element if the target it´s not the menu element or one of its descendants..
		$content.on( 'click', function(ev) {
			var target = ev.target;
			//console.log(target);
			if( isOpen && target == $openbtn ) {
				toggleMenu();
			}
		} );
	}

	function toggleMenu() {
		if( isOpen ) {
			$bodyEl.removeClass('show_menu');
		}
		else {
			$bodyEl.addClass('show_menu');
		}
		isOpen = !isOpen;
	}

	function toggleSearch() {
		if( isOpen ) {
			$bodyEl.removeClass('show_search');
		}
		else {
			$bodyEl.addClass('show_search');
		}
		isOpen = !isOpen;
	}

	init();

})();