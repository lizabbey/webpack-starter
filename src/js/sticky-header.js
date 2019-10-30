//Sticky Header
function resizeContent() {
	let headerHeight = jQuery('header').height();
	jQuery('.site-main').css('margin-top', headerHeight);
	jQuery('.page-homepage .showcase').exists(function () {
		jQuery(this).css('max-height', 'calc(100vh - ' + headerHeight + 'px)');
	});
}

jQuery(document).ready(function (jQuery) {
	let sticky = jQuery('.fixed-top');
	jQuery(window).scroll(function () {
		let scroll = jQuery(window).scrollTop();
		if (scroll >= 60) {
			sticky.addClass('stuck');
		} else {
			sticky.removeClass('stuck');
		}
	});

	let logo = jQuery('#header-logo');
	if (jQuery(logo).complete) {
		resizeContent();
	} else {
		jQuery(logo).one('load', resizeContent());
	}
});