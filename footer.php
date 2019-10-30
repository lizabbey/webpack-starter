<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package GW_Theme
 */

?>
</main><!-- #main -->

<footer class="site-footer">
	<section class="copy">
		<div class="container">
			<?php printf( esc_html__( '%1$s%2$s' , 'gwself'), '&copy;', date('Y'));?>
				<a href="<?php echo esc_url( __( WP_SITE_URL, 'gwself' ) ); ?>" title="<?php printf( esc_html__( '%1$s', 'gwself'), WP_SITE_NAME);?>">
				<?php printf( esc_html__( '%1$s' , 'gwself'), WP_SITE_NAME);?>
			</a>
			<span class="d-block"><?php printf( esc_html__( 'Web design and Development by %s', 'gwself' ), '<a href="https://www.goodworkmarketing.com" title="Good Work Marketing" target="_blank">Good Work Marketing</a>' );?></span>
		</div>
	</section>
</footer>
<?php wp_footer(); ?>
<?php //get_template_part('inc/schema');?>
</body>

</html>