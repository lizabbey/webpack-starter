import './scss/theme.scss';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/modal';
import './js/sticky-header.js';

jQuery(document).ready(function (jQuery) {
	//Elements to inject
	var elementsToInject = document.querySelectorAll('.inject-me');
	// Options
	var injectorOptions = {
		evalScripts: 'once'
	};
	// Trigger the injection
	var injector = new SVGInjector(injectorOptions);
	if (jQuery(elementsToInject).length) {
		injector.inject(
			elementsToInject
		);
	}
});

jQuery.fn.exists = function (callback) {
	var args = [].slice.call(arguments, 1);

	if (this.length) {
		callback.call(this, args);
	}

	return this;
};