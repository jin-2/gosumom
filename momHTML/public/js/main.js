(function(global){

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
	

})(window);

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