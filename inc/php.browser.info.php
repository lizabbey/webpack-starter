<?php

/*
Credits: This is a php port from Rafael Lima's original Javascript CSS Browser Selector: http://rafael.adm.br/css_browser_selector
*/


function cua($string=''){
		global $ua;
		if(strstr($ua, $string)) {
			return true;
		} else {
			return false;
		};
	}


function php_browser_info($ua=null) {
   global $ua;
	$ua = ($ua) ? strtolower($ua) : strtolower($_SERVER['HTTP_USER_AGENT']);

	// return true false on string match.


	$g = 'gecko';
	$w = 'webkit';
	$s = 'safari';
	$o = 'opera';
	$m = 'mobile';
	$t = 'tablet';
	$ts = 'touch';
	$d = 'desktop';
	$x = 'unknown';

	$b = array();

	// match browser
	if(!preg_match('/opera|webtv/i', $ua) && preg_match('/msie\s(\d)/', $ua, $array)) {
				$b[] = 'ie ie' . $array[1];
		}	elseif(cua('firefox/2')) {
				$b[] = $g . ' ff2';
		}	elseif(cua('firefox/3.5')) {
				$b[] = $g . ' ff3 ff3_5';
		}	elseif(cua('firefox/3.6')) {
				$b[] = $g . ' ff3 ff3_6';
		}	elseif(cua('firefox/3')) {
				$b[] = $g . ' ff3';
		} elseif(preg_match('/opera(\s|\/)(\d+)/', $ua, $array)) {
				$b[] = 'opera opera' . $array[2];
		} elseif(cua('konqueror')) {
				$b[] = 'konqueror';
		} elseif(cua('chrome')) {
				$b[] = $w . ' chrome';
		} elseif(cua('iron')) {
				$b[] = $w . ' ' . $s . ' iron';
		} elseif(cua('applewebkit/')) {
				$b[] = (preg_match('/version\/(\d+)/i', $ua, $array)) ? $w . ' ' . $s . ' ' . $s . $array[1] : $w . ' ' . $s;
		} elseif(cua('mozilla/')) {
				$b[] = $g;
		} else {
				$b[] = $x;
		}

		// match operating systems
		if(cua('mac')) {
				$b[] = 'mac';
		} elseif(cua('darwin')) {
				$b[] = 'mac';
		} elseif(cua('webtv')) {
				$b[] = 'webtv';
		} elseif(cua('win')) {
				$b[] = 'win';
		} elseif(cua('windows nt 6.0')) {
				$b[] = 'vista';
		} elseif(cua('freebsd')) {
				$b[] = 'freebsd';
		} elseif(cua('x11') || cua('linux')) {
				$b[] = 'linux';
		} else {
				$b[] = $x;
		}

		// match mobile devices
		if(cua('blackberry')) {
				$b[] = $m . ' blackberry ' . $ts;
		} elseif(cua('android')) {
				$b[] = $m . ' android';
		} elseif(cua('j2me')) {
				$b[] = $m . ' j2me';
		} elseif(cua('iphone')) {
				$b[] = $m . ' iphone ' . $ts;
		} elseif(cua('ipod')) {
				$b[] = $m . ' ipod ' . $ts;
		} elseif(cua('Windows Phone')) {
				$b[] = $m . ' Windows Phone ' . $ts;
		} elseif(cua('Phone')) {
				$b[] = $m . ' Phone ' . $ts;
		}

		// match tablets
		if(cua('ipad')) {
				$b[] = $t . ' ipad';
		} elseif(cua('tablet')) {
				$b[] = $t;
		} elseif(cua('touch') && !cua('blackberry') && !cua('android') && !cua('j2me') && !cua('iphone') && !cua('ipod')  && !cua('Windows Phone')) {
				$b[] = $t;
		}


		// match touch
		if(cua('touch')) {
				$b[] = $ts;
		}

		if( !in_array($t,$b) && !in_array($m,$b)){
				$b[]= $d;
		}

	return join(' ', $b);

}


function is_mobile($ua=null) {
   global $ua;
	$ua = ($ua) ? strtolower($ua) : strtolower($_SERVER['HTTP_USER_AGENT']);
	$check = false;
	// return true false on string match.


	// match mobile devices
	if(cua('blackberry') || cua('android') || cua('j2me') || cua('iphone') || cua('ipod') || cua('Windows Phone')) {
			$check = true;
	}

	return $check;

}


function is_tablet($ua=null) {
   global $ua;
	$ua = ($ua) ? strtolower($ua) : strtolower($_SERVER['HTTP_USER_AGENT']);
	$check = false;
	// return true false on string match.


	// match tablets
	if(cua('ipad')) {
			$check = true;
	} elseif(cua('tablet')) {
			$check = true;
	} elseif(cua('touch') && !cua('blackberry') && !cua('android') && !cua('j2me') && !cua('iphone') && !cua('ipod')) {
			$check = true;
	}

	return $check;


}