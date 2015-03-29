(function(global){

	// toogle box
	$('.togglebox .toggle_btn').click(function(e){
		e.preventDefault();
		$(this).next('.toggle_content').toggle();
	});

	// custom select
	$('.select_custom .select_insert').click(function(e){
		e.preventDefault();
		$(this).next('.select_option').toggle();
	});

})(window);