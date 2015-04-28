(function(window, document, undefined) {
	
	// 네모박스 정렬 - masonry
	if( $('#card_list') ){
		$('#card_list').masonry({
			itemSelector: '.item',
			columnWidth: 285,
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
			controls: false
		});
	}

	// 메인 중간 슬라이더
	if( $('#main_review_slider') ) {
		$('#main_review_slider').bxSlider({
			controls: false
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

	// 스크롤 디자인
	if( $(".nano_scroll") ){
		$(".nano_scroll").nanoScroller({
			alwaysVisible: true
		});
	}

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