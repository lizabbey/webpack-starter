<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package GW_Theme
 */
get_header();?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<?php
		while ( have_posts() ) :
			the_post();

			get_template_part( 'template-parts/post/content', get_post_type() );

			if(is_singular('post')) {
				the_post_navigation();
			}
			
			
		endwhile; // End of the loop.
		?>
</article><!-- #primary -->

<?php
get_sidebar();
get_footer();