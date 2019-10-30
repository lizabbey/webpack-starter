<?php if(have_rows('co_social', 'option')) : while(have_rows('co_social', 'option')) : the_row();
	$platform = get_sub_field('sm_platform');
	$link = get_sub_field('sm_link');
	echo '<a href="'.$link.'" target="_blank" title="'.$platform['label'].'"><img class="icon inject-me" src="'. WP_THEME_URL.'/image/icons/'.$platform['value'].'.svg" alt="'.$platform['label'].' Icon"></img></a>';
endwhile; endif;