<?php
/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package GW_Theme
 */
$redirect = '';
$type = get_post_type();

if($redirect) {
	if ( wp_redirect( $redirect ) ) {
		exit;
	}
}

get_header();

if ( have_posts() ) : ?>

<header class="page-header">
	<?php
		the_archive_title( '<h1 class="page-title">', '</h1>' );
		?>
</header><!-- .page-header -->

<?php
	/* Start the Loop */
	while ( have_posts() ) :
		the_post();
		echo get_post_type();
		/*
			* Include the Post-Type-specific template for the content.
			* If you want to override this in a child theme, then include a file
			* called content-___.php (where ___ is the Post Type name) and that will be used instead.
			*/
		get_template_part( 'template-parts/archive/content', get_post_type() );

	endwhile;

	the_posts_navigation();

else :

	get_template_part( 'template-parts/content', 'none' );

endif;

get_sidebar();
get_footer();