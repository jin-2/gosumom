//(function(global){
// 공통 js
(function(window, document, undefined) {

	// gnb
	$('.gnb li')
		.mouseenter(function(){
			$(this).find('.snb').stop().slideDown(400);
		})
		.mouseleave(function(){
			$(this).find('.snb').hide();
		})

	// 메인 
	if( $('#main_visual_slider') ) $('#main_visual_slider').bxSlider();
	if( $('#main_review_slider') ) $('#main_review_slider').bxSlider();

	// toogle box
	$('.togglebox .toggle_btn').click(function(e){
		e.preventDefault();
		$(this).next('.toggle_content').toggle();
	});

	$('.review_content .button_more_review').click(function(e){
		e.preventDefault();
		var condition = $(this).parent().hasClass('blind')
		if( !condition ){
			if( !$(this).hasClass('active') ){
				$(this).addClass('active').text('닫기')
			}else{
				$(this).removeClass('active').text('자세히보기');
			}
		}
	});

	$('.register_rule .noti_text').click(function(e){
		e.preventDefault();
		$(this).toggleClass('active');
	});

	// 핸드폰 인증 팝업
	$('.button_phone_check').click(function(){
		if (screen.width <= 800) {
			$('#popup_phone_check').bPopup({
				closeClass: 'popup_close',
				follow: [false, false],
				position: ['auto', 200]
			});
		} else {
			$('#popup_phone_check').bPopup({
				closeClass: 'popup_close',
				positionStyle: 'fixed'
			});
		}
	})

	$('.my_review_list .button_more_review').click(function(e){
		e.preventDefault();
		if( !$(this).hasClass('active') ){
				$(this).addClass('active').text('닫기');
				$(this).parent().next('.toggle_content').show();
			}else{
				$(this).removeClass('active').text('자세히보기');
				$(this).parent().next('.toggle_content').hide();
			}
	});

	// 커뮤니티 메뉴 중비중 
	$('.gnb .community').click(function(){
		alert('곧 만나요~');
	});

	// custom select
	$('.select_custom .select_insert, .search_input .search_button').click(function(e){
		e.preventDefault();
		$(this).next('.select_option').toggle();
	});

	// footer dashboard
	$('.dashboard .button').click(function(){
		$(this).toggleClass('active');
		if( $(this).hasClass('active') ){
			$(this).parent('.wrapper').css('height', '0');
		}else{
			$(this).parent('.wrapper').css('height', '125px');
		}
	});

	// 마이페이지 비밀번호 변경
	$('#member_pw').click(function(){
		$('.password_modify').toggle();
	})

	// 모바일 헬프 오버레이
	var $win, doc_H, $overlayer, margin_box;

	initSetting(function() {
		$win.on('resize', setHeight);
	});

	function initSetting(fn) {
		$win = $(window);
		setHeight();
		fn ? fn() : null;
	}

	function setHeight() {
		doc_H = $win.height();

		if (!$overlayer) { $overlayer = $('#intro_layer.small'); }
		overlayer_H = $overlayer.height();

		margin_box = ( doc_H - overlayer_H ) / 2;

		$overlayer.css('margin-top', margin_box);
	}

	/* placeholder plugin for ie 7~9 */
	// Don't run the polyfill if it isn't needed
	if ('placeholder' in document.createElement('input')) {
		document.placeholderPolyfill = function() { /*  no-op */ };
		document.placeholderPolyfill.active = false;
		return;
	}

	// Fetch NodeLists of the needed element types
	var inputs = document.getElementsByTagName('input');
	var textareas = document.getElementsByTagName('textarea');

	// 
	// Define the exposed polyfill methods for manual calls
	// 
	document.placeholderPolyfill = function(elems) {
		elems = elems ? validElements(elems) : validElements(inputs, textareas);
		each(elems, polyfillElement);
	};

	// Expose whether or not the polyfill is in use (false means native support)
	document.placeholderPolyfill.active = true;

	// Run automatically
	document.placeholderPolyfill();

// -------------------------------------------------------------
	
	// Use mutation events for auto-updating
	if (document.addEventListener) {
		document.addEventListener('DOMAttrModified', document.placeholderPolyfill);
		document.addEventListener('DOMNodeInserted', document.placeholderPolyfill);
	}
	
	// Use onpropertychange for auto-updating
	else if (document.attachEvent && 'onpropertychange' in document) {
		document.attachEvent('onpropertychange', document.placeholderPolyfill);
	}
	
	// No event-based auto-update
	else {
		// pass
	}

// -------------------------------------------------------------

	// Add some basic default styling for placeholders
	firstStylesheet().addRule('.-placeholder', 'color: #888;', 0);

// -------------------------------------------------------------
	
	// 
	// Polyfill a single, specific element
	// 
	function polyfillElement(elem) {
		// If the element is already polyfilled, skip it
		if (elem.__placeholder != null) {
			// Make sure that if the placeholder is already shown, that it is at least up-to-date
			if (elem.__placeholder) {
				elem.value = getPlaceholder();
			}
			return;
		}

		// Keep track of placeholder changes so we can fire off updates correctly
		var currentPlaceholder = getPlaceholderFor(elem);
		function getPlaceholder() {
			return currentPlaceholder = getPlaceholderFor(elem);
		}

		// Is there already a value in the field? If so, don't replace it with the placeholder
		if (elem.value) {
			elem.__placeholder = false;
			if (elem.value === getPlaceholder()) {
				doShowPlaceholder();
			}
		} else {
			showPlaceholder();
		}

		// Define the events that cause these functions to be fired
		addEvent(elem, 'keyup',    checkPlaceholder);
		addEvent(elem, 'keyDown',  checkPlaceholder);
		addEvent(elem, 'blur',     checkPlaceholder);
		addEvent(elem, 'focus',    hidePlaceholder);
		addEvent(elem, 'click',    hidePlaceholder);

		// Use mutation events for auto-updating
		if (elem.addEventListener) {
			addEvent(elem, 'DOMAttrModified', updatePlaceholder);
		}
		
		// Use onpropertychange for auto-updating
		else if (elem.attachEvent && 'onpropertychange' in elem) {
			addEvent(elem, 'propertychange', updatePlaceholder);
		}
	
		// No event-based auto-update
		else {
			// pass
		}

		function updatePlaceholder() {
			// Run this asynchronously to make sure all needed updates happen before we run checks
			setTimeout(function() {
				var old = currentPlaceholder;
				var current = getPlaceholder();

				// If the placeholder attribute has changed
				if (old !== current) {
					// If the placeholder is currently shown
					if (elem.__placeholder) {
						elem.value = current;
					}
				}

				// Make sure that elem.__placeholder stays acurate, even if the placeholder or value are
				// manually changed via JavaScript
				if (elem.__placeholder && elem.value !== current) {
					elem.__placeholder = false;
				}
			}, 0);
		}

		function checkPlaceholder() {
			if (elem.value) {
				hidePlaceholder();
			} else {
				showPlaceholder();
			}
		}

		function showPlaceholder() {
			if (! elem.__placeholder && ! elem.value) {
				doShowPlaceholder();
			}
		}

		function doShowPlaceholder() {
			elem.__placeholder = true;
			elem.value = getPlaceholder();
			addClass(elem, '-placeholder');
		}

		function hidePlaceholder() {
			if (elem.__placeholder) {
				elem.__placeholder = false;
				elem.value = '';
				removeClass(elem, '-placeholder');
			}
		}
	}

// -------------------------------------------------------------
	
	// 
	// Build a list of valid (can have a placeholder) elements from the given parameters
	// 
	function validElements() {
		var result = [ ];

		each(arguments, function(arg) {
			if (typeof arg.length !== 'number') {
				arg = [ arg ];
			}

			result.push.apply(result, filter(arg, isValidElement));
		});

		return result;
	}

	// 
	// Check if a given element supports the placeholder attribute
	// 
	function isValidElement(elem) {
		var tag = (elem.nodeName || '').toLowerCase();
		return (tag === 'textarea' || (tag === 'input' && (elem.type === 'text' || elem.type === 'password')));
	}

// -------------------------------------------------------------
	
	function addEvent(obj, event, func) {
		if (obj.addEventListener) {
			obj.addEventListener(event, func, false);
		} else if (obj.attachEvent) {
			obj.attachEvent('on' + event, func);
		}
	}

	function removeEvent(obj, event, func) {
		if (obj.removeEventListener) {
			obj.removeEventListener(event, func, false);
		} else if (obj.detachEvent) {
			obj.detachEvent('on' + event, func);
		}
	}

// -------------------------------------------------------------

	function each(arr, func) {
		if (arr.forEach) {
			return arr.forEach(func);
		}

		for (var i = 0, c = arr.length; i < c; i++) {
			func.call(null, arr[i], i, arr);
		}
	}

	function filter(arr, func) {
		if (arr.filter) {
			return arr.filter(func);
		}

		var result = [ ];
		for (var i = 0, c = arr.length; i < c; i++) {
			if (func.call(null, arr[i], i, arr)) {
				result.push(arr[i]);
			}
		}

		return result;
	}

// -------------------------------------------------------------

	var regexCache = { };
	function classNameRegex(cn) {
		if (! regexCache[cn]) {
			regexCache[cn] = new RegExp('(^|\\s)+' + cn + '(\\s|$)+', 'g');
		}

		return regexCache[cn];
	}

	function addClass(elem, cn) {
		elem.className += ' ' + cn;
	}

	function removeClass(elem, cn) {
		elem.className = elem.className.replace(classNameRegex(cn), ' ');
	}

// -------------------------------------------------------------

	// Internet Explorer 10 in IE7 mode was giving me the wierest error
	// where e.getAttribute('placeholder') !== e.attributes.placeholder.nodeValue
	function getPlaceholderFor(elem) {
		return elem.getAttribute('placeholder') || (elem.attributes.placeholder && elem.attributes.placeholder.nodeValue);
	}

// -------------------------------------------------------------

	// Get the first stylesheet in the document, or, if there are none, create/inject
	// one and return it.
	function firstStylesheet() {
		var sheet = document.styleSheets && document.styleSheets[0];
		if (! sheet) {
			var head = document.head || document.getElementsByTagName('head')[0];
			var style = document.createElement('style');
			style.appendChild(document.createTextNode(''));
			document.head.appendChild(style);
			sheet = style.sheet;
		}
		return sheet;
	}
	

//})(window);
}(window, document));

// Design checkbox
$.fn.designCheckbox = function(option){
	var option = $.extend({}, $.fn.designCheckbox.option, option);
		
	return this.each(function(){
	var select_root = $(this),
			select_type = select_root.find("input[type=checkbox]");
			
		select_type.change(function(){
			if(select_type.prop("checked")){
				select_root.addClass("checked");
			}else{
				select_root.removeClass("checked");
			}
		}).change().hover(
			function(){
				select_root.addClass(option.overClass);
			},function(){
				select_root.removeClass(option.overClass);
			}
		).bind({
			focusin : function(){select_root.addClass(option.overClass);},
			focusout : function(){select_root.removeClass(option.overClass);},
			mouseover : function(){select_root.addClass(option.overClass);},
			mouseout : function(){select_root.removeClass(option.overClass);},
			mousedown : function(){select_root.addClass(option.clickClass);},
			mouseup : function(){select_root.removeClass(option.clickClass);},
			keypress : function(){select_root.addClass(option.clickClass);},
			keyup : function(){select_root.removeClass(option.clickClass);}
		});
			
		if(select_type.prop("disabled")){
			select_root.addClass("disabled");
		}
	});
};
$.fn.designCheckbox.option = {
	checked		: "checked",
	disabled		: "disabled",
	overClass		: "over",
	clickClass	: "click"
};
$(".dcheck").designCheckbox();

// Design radio
$.fn.designRadio = function(option){
	var option = $.extend({}, $.fn.designRadio.option, option);
	return this.each(function(){
	var select_root = $(this),
			select_type = select_root.find("input[type=radio]");
		$(this).find('input[type=radio]').click(function(){
			select_root.find('input[type=radio]').each(function(){
				if($(this).prop('checked')){
					$(this).parent().addClass('checked');
				}else{
					$(this).parent().removeClass('checked');
				}
			});
		});
		if($(this).find('input[type=radio]').prop('checked')){
			$(this).addClass('checked');
		}
		select_type.bind({
			mousedown : function() {$(this).parent().addClass("click");},
			mouseup : function() {$(this).parent().removeClass("click");},
			mouseover : function(){$(this).parent().addClass("over");},
			mouseout : function(){$(this).parent().removeClass("over");},
			focusin : function(){$(this).parent().addClass("over");},
			focusout : function(){$(this).parent().removeClass("over");}
		});
			
		if(select_type.prop("disabled")){
			select_root.addClass("disabled");
		}
	
	});
};
$.fn.designRadio.option = {
	checked		: "checked",
	disabled		: "disabled",
	overClass		: "over",
	clickClass	: "click"
};
$(".set_radio").designRadio();