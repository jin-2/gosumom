(function(window, document, undefined) {
	// 메인 서칭 바 탭
	tabMenu(".main_serching_bar li");

	// 어린이집 상세 상단 갤러리 이미지 사이즈 조정
	$('#slider img').each(function(index, el) {
		var maxWidth = 500;
		var maxHeight = 350;
		var ratio = 0;
		var width = $(this).width();
		var height = $(this).height();

		if(width > maxWidth){
			ratio = maxWidth / width;
			$(this).css("width", maxWidth);
			$(this).css("height", height * ratio);
			height = height * ratio;
		}

		var width = $(this).width();
		var height = $(this).height();

		if(height > maxHeight){
			ratio = maxHeight / height;
			$(this).css("height", maxHeight);
			$(this).css("width", width * ratio);
			width = width * ratio;
		}

		if(height < maxHeight){
			//var marginTop = (maxHeight - height)/2
			var marginTop = -Math.round((maxHeight - height) / 2);
			//console.log('maxHeight: '+maxHeight+'height: '+height+'marginTop: '+marginTop);
			if(marginTop < 0){
				$(this).css('margin-top', marginTop)
			}
		}else if(height == maxHeight){
			return false;
		}

	});

	// 고수맘이야기 top이동
	$('#go_top').click(function(){
		$("html, body").animate({ scrollTop: 0 }, 600);
		return false;
	});
	
	// 네모박스 정렬 - masonry
	if( $('#card_list') ){
		$('#card_list').masonry({
			itemSelector: '.item',
			columnWidth: 285,
			isFitWidth: true,
			gutter: 20
		});
	}

	// 네모박스 정렬 - masonry
	if( $('#card_tip_list') ){
		$('#card_tip_list').masonry({
			itemSelector: '.item',
			columnWidth: 590,
			isFitWidth: true,
			gutter: 20
		});
	}

	// gnb
	$('.gnb li')
		.mouseenter(function(){
			$(this).find('.snb').stop().slideDown(400);
		})
		.mouseleave(function(){
			$(this).find('.snb').hide();
		})

	// 메인 상단 슬라이더
	if( $('#main_visual_slider') ) {
		$('#main_visual_slider').bxSlider({
			auto: true,
			pagerCustom: '.main_visual_wrap .pager',
			controls: false,
			mode: 'fade',
			pause: 17000,
			//autoDelay: 10000,
			auto: true
		});
	}

	// 메인 중간 슬라이더
	if( $('#main_review_slider') ) {
		$('#main_review_slider').bxSlider({
			auto: true,
			pagerCustom: '.main_review_wrap .pager',
			controls: false,
			mode: 'fade'
		});
	}

	// 어린이집 상세보기 슬라이더
	if( $('#slider') ) {
		$('#slider').bxSlider({
			auto: true,
			pagerCustom: '#slider_pager',
			controls: false
		});
	}

	// 메인 리스트 소팅 탭
	$('.sorting_tab a').click(function(e){
		//e.preventDefault();
	});

	// 플레이스홀더
	$('.main_serching_bar .search_word').focus(function(){
		$(this).keydown(function(){
			$('.main_serching_bar .placeholder').hide();
		});
	})
	$('.main_serching_bar .search_word').focusout(function(){
		if($(this).val().length == 0) $('.main_serching_bar .placeholder').show();
	})
	if( $('.main_serching_bar .search_word').val()){
		$('.main_serching_bar .placeholder').hide();
	}

	// 플레이스홀더 공통사용
	$('.placeholder_wrap input, .placeholder_wrap textarea').focus(function(){
		$(this).keydown(function(){
			$(this).siblings().find('.placeholder').hide();
		});
	});
	$('.placeholder_wrap input, .placeholder_wrap textarea').focusout(function(){
		if($(this).val().length == 0){
			$(this).siblings().find('.placeholder').show();
		}
	});

	// 공통사용 value 있을 때 플레이스홀더 숨기기
	$('.placeholder_wrap').each(function(){

		var input_text = $('input', this);
		if( input_text.val() ){
			input_text.siblings('label').find('.placeholder').hide();
		}

	});

	// 스크롤 디자인
	if( $(".nano_scroll") ){
		$(".nano_scroll").nanoScroller({
			alwaysVisible: true
		});
	}

	// 파입업로드
	$('.file_input_wrap .input_hidden').change(function(){
		console.log( $(this).parent().siblings() )
		var src = $(this).val();
		$(this).parents().siblings().val(src);
	});

	// 마이페이지 비밀번호 변경
	$('#member_pw').click(function(){
		$('.password_modify').toggle();
	})

	// 어린이집 상세 갤러리
	if( $('#card_gallery') ){
		$('#card_gallery').masonry({
			itemSelector: '.item',
			columnWidth: 342,
			isFitWidth: true,
			gutter: 25
		});
	};
	
}(window, document));

// $(window).load(function(){
// 	if( $('#card_gallery') ){
// 		$('#card_gallery').masonry({
// 			itemSelector: '.item',
// 			columnWidth: 342,
// 			isFitWidth: true,
// 			gutter: 25
// 		});
// 	};
// })

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

function tabMenu(selector){
	selector = $('button', selector);
	$(selector).click(function(){
		selector.removeClass('scarlet');
		$(this).addClass('scarlet');
	})
}