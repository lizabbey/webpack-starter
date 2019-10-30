<?php get_header();
if(have_posts()) : while(have_posts()) : the_post();
	if(have_rows('fp_sections')) : while (have_rows('fp_sections')) : the_row();
		switch(get_row_layout()) {
			case 'fp_showcase':
				get_template_part('/template-parts/components/front-page/fp', 'showcase');
			break;
		}
	endwhile; endif;
endwhile; endif;
get_footer();