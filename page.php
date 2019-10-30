<?php
/**
 * The template for displaying all pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package GW_Theme
 */
get_header();

while ( have_posts() ) : the_post();
	get_template_part( 'template-parts/page/content', 'page' );
endwhile; // End of the loop.
get_footer();