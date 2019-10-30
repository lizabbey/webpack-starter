//Partner Slider
jQuery(document).ready(function (jQuery) {
	jQuery('.partner-slider').slick({
		dots: true,
		speed: 300,
		slidesToShow: 2,
		slidesToScroll: 2,
		mobileFirst: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4,
				}
			},
			{
				breakpoint: 720,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3
				}
			}
		]
	});
});