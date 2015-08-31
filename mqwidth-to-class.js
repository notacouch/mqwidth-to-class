// Formerly:
/* Respond.js: min/max-width media query polyfill. (c) Scott Jehl. MIT Lic. j.mp/respondjs  */
(function( w, breakpoints ){

	"use strict";
    
	// //exposed namespace
	var respond = {};
	// w.respond = respond;

	//expose media query support flag for external use
	respond.mediaQueriesSupported = w.matchMedia && w.matchMedia( "only all" ) !== null && w.matchMedia( "only all" ).matches;

	//if media queries are supported, exit here
	if( respond.mediaQueriesSupported ){
		return;
	}

	//define vars
	var doc = w.document,
		docElem = doc.documentElement,
		resizeThrottle = 30,
		html = doc.getElementsByTagName( "html" )[0],
		//head = doc.getElementsByTagName( "head" )[0] || docElem,
		//base = doc.getElementsByTagName( "base" )[0],
		//links = head.getElementsByTagName( "link" ),

		lastCall,
		resizeDefer,


		//enable/disable styles
		applyMedia = function( fromResize ){
			var name = "clientWidth",
				docElemProp = docElem[ name ],
				currWidth = doc.compatMode === "CSS1Compat" && docElemProp || doc.body[ name ] || docElemProp,
				//lastLink = links[ links.length-1 ],
				now = (new Date()).getTime();

			//throttle resize calls
			if( fromResize && lastCall && now - lastCall < resizeThrottle ){
				w.clearTimeout( resizeDefer );
				resizeDefer = w.setTimeout( applyMedia, resizeThrottle );
				return;
			}
			else {
				lastCall = now;
			}
			
			// Remove extra spaces, not-min-/max-width, & min-/max-width classes
			var className = html.className.replace(/(not-)?m(in|ax)-width-\d+px/g, '').replace(/\s{2,}/, '');
			
			// Loop through breakpoints and apply styles
			for (var i = 0, l = breakpoints.length; i < l; ++i) {
    			var breakpoint   = breakpoints[i];
    			var max          = breakpoint - 1;
    			var unit         = 'px';
    			
    			// @media NOT [...] support
    			if (currWidth > max) {
        			className += ' not-max-width-' + max + unit;
    			} else if (currWidth < breakpoint) {
        			className += ' not-min-width-' + breakpoint + unit;        			
    			}
    			
    			// Basic classes
    			if (currWidth >= breakpoint) {
        			className += ' min-width-' + breakpoint + unit;
    			} else if (currWidth <= max) {
        			className += ' max-width-' + max + unit;
    			}
			}
			
			html.className = className;
		};
		
	applyMedia(false);

	//adjust on resize
	function callMedia(){
		applyMedia( true );
	}

	if( w.addEventListener ){
		w.addEventListener( "resize", callMedia, false );
	}
	else if( w.attachEvent ){
		w.attachEvent( "onresize", callMedia );
	}
})(this, [768, 992, 1200]); // adjust array of breakpoints here (currently based on Bootstrap)