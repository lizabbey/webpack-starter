<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package GW_Theme
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>

<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php
	if(!defined('WP_THEME_URL')) define( 'WP_THEME_URL', esc_url(get_stylesheet_directory_uri().'/dist'));
	if(!defined('WP_SITE_URL')) define( 'WP_SITE_URL', esc_url(home_url()));
	if(!defined('WP_SITE_NAME')) define( 'WP_SITE_NAME', get_bloginfo('name'));

wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<?php wp_body_open(); ?>
	<header class="site-header">
		<nav>
			<?php wp_nav_menu([
				'menu'            => 'main',
				'theme_location'  => 'primary',
				'container'       => 'div',
				'container_id'    => 'site-header-nav',
				'container_class' => 'collapse navbar-collapse navbar-expand-lg justify-content-end text-center pt-lg-3',
				'menu_id'         => false,
				'menu_class'      => 'navbar-nav',
				'depth'           => 2,
				'fallback_cb'     => 'bs4navwalker::fallback',
				'walker'          => new bs4navwalker()
			]);?>
		</nav>
	</header>
	<main id="main" class="site-main content-area">