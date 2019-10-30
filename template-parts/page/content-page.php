<?php
/**
 * Template part for displaying page content in page.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package GW_Theme
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="container page-content">
		<div class="row">
			<div class="col-lg-10 offset-lg-1">
				<header class="entry-header text-center">
					<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
				</header><!-- .entry-header -->
				<div class="entry-content text-center">
					<?php the_content();?>
				</div><!-- .entry-content -->
			</div>
		</div>
	</div>
</article><!-- #post-<?php the_ID(); ?> -->