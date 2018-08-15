jQuery(document).ready(function(jQuery){    
    // Elements to inject
    var elementsToInject = document.querySelectorAll('svg[data-src]');
    // Options
    var injectorOptions = {
        evalScripts: 'once',
        pngFallback: 'image/fallback'
    };
    // Trigger the injection
    var injector = new SVGInjector(injectorOptions);
    injector.inject(
        elementsToInject
    );
});