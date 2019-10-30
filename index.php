<?php
/**
* The main template file
*
* This is the most generic template file in a WordPress theme
* and one of the two required files for a theme (the other being style.css).
* It is used to display a page when nothing more specific matches a query.
*
* @link https://developer.wordpress.org/themes/basics/template-hierarchy/
*
* @package GW_Theme
*/

get_header();

if ( have_posts() ) {
	if ( is_home() ) { ?>
<header>
	<h1 class="page-title screen-reader-text"><?php single_post_title(); ?></h1>
</header>
<?php } 

	while ( have_posts() ) : the_post();
	/** Include the Post-Type-specific template for the content.*/
	get_template_part( 'template-parts/content', get_post_type() );
	endwhile;
	if(function_exists('pagination')) {
		pagination();
	}

	the_posts_navigation();
} else {
	get_template_part( 'template-parts/content', 'none' );
}
 
get_sidebar();
get_footer(); ?>