<?php
/**
 * gwself functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package gwself
 */

//SETUP__________
if ( ! function_exists( 'gwself_setup' ) ) {
	function gwself_setup() {
		load_theme_textdomain( 'gwself', get_template_directory() . '/languages' );
		add_theme_support( 'automatic-feed-links' );
		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		));
		
		register_nav_menu( 'menu-1', __( 'Primary', 'gwself' ) );
		register_nav_menu( 'menu-2', __( 'Footer 1', 'gwself' ) );
		register_nav_menu( 'menu-3', __( 'Footer 2', 'gwself' ) );
		register_nav_menu( 'menu-4', __( 'Footer 3', 'gwself' ) );
		register_nav_menu( 'menu-5', __( 'Footer 4', 'gwself' ) );
		register_nav_menu( 'menu-6', __( 'Footer 5', 'gwself' ) );

		add_theme_support( 'custom-background', apply_filters( 'gwself_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		) ) );
		add_theme_support( 'customize-selective-refresh-widgets' );
		add_theme_support( 'custom-logo', array(
			'height'      => 250,
			'width'       => 500,
			'flex-width'  => true,
			'flex-height' => true,
			'header-text' => array( 'sr-only' ),
		) );
	}
}
add_action( 'after_setup_theme', 'gwself_setup' );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function gwself_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'gwself' ),
		'id'            => 'sidebar-1',
		'description'   => esc_html__( 'Add widgets here.', 'gwself' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'gwself_widgets_init' );

//THEME FUNCTIONS
require get_template_directory() . '/inc/theme-functions.php';
require get_template_directory() . '/inc/php.browser.info.php';
require get_template_directory() . '/inc/bs4navwalker.php';
require get_template_directory() . '/inc/template-tags.php';
require get_template_directory() . '/inc/customizer.php';

if ( class_exists( 'WooCommerce' ) ) {
	require get_template_directory() . '/inc/woocommerce.php';
}

//GW HELPER FUNCTIONS
//ADD EXCERPTS TO PAGES
add_post_type_support('page', 'excerpt');

//REMOVE ADMIN BAR
show_admin_bar( false );

//REMOVE YOAST ADMIN COLUMNS
add_filter( 'wpseo_use_page_analysis', '__return_false' );

//MOVE YOAST META BOX TO BOTTOM
function yoasttobottom() {return 'low';}
add_filter( 'wpseo_metabox_prio', 'yoasttobottom');

//COMMENT HONEYPOT
function _tw_intercept_comment( array $data ){
	if( empty($data['comment_author_url']) ){
		return $data;
	} else {
		$message = 'Sorry, we capture spammers who add a web address to the comment form as it\'s hidden.';
		$title = 'Spam Block';
		$args = array('response' => 200);
		wp_die( $message, $title, $args );
		exit(0);
	}
}

add_filter('preprocess_comment','_tw_intercept_comment');

//Page Slug Body Class
function add_slug_body_class( $classes ) {
	global $post;
	if (isset($post)) {
		$classes[] = $post->post_type.'-'.$post->post_name;
	}

	if(!is_front_page()) {
		$classes[] = 'internal';
	} 
	return $classes;
}
add_filter( 'body_class', 'add_slug_body_class' );

//GET BROWSER
add_filter( 'body_class', function($classes) {
	$browser = php_browser_info();
    return array_merge($classes, array($browser));
});

//SANITIZE PHONE NUMBERS FOR LINKS
function gw_saniphone($phone) {
	$output = '+1'.preg_replace('/[^0-9]/', '', $phone);
	return $output;
}


//PAGINATION
function pagination($pages = '', $range = 4, $query = '') {
  $showitems = ($range * 2)+1;
  global $paged;
  if(empty($paged)) $paged = 1;

  if($pages == '') {
  	global $wp_query;
    $query = ($query) ? $query : $wp_query;
		$pages = $query->max_num_pages;
		if(!$pages) {
			$pages = 1;
		}
  }

if(1 != $pages) {
	echo "<ul class=\"pagination\"><li class=\"disabled\"><span>Page ".$paged." of ".$pages."</span></li>";
	if($paged > 2 && $paged > $range+1 && $showitems < $pages) echo "<li><a href='".get_pagenum_link(1)."'>&laquo; First</a></li>";
	if($paged > 1 && $showitems < $pages) echo "<li><a href='".get_pagenum_link($paged - 1)."'>&lsaquo; Previous</a></li>";

	for ($i=1; $i <= $pages; $i++) {
	  if (1 != $pages &&( !($i >= $paged+$range+1 || $i <= $paged-$range-1) || $pages <= $showitems )) {
		echo ($paged == $i)? "<li class=\"active\"><a href=\"#\">".$i."</a></li>":"<li ><a href='".get_pagenum_link($i)."' >".$i."</a></li>";
	  }
	}

	if ($paged < $pages && $showitems < $pages) echo "<li><a href=\"".get_pagenum_link($paged + 1)."\">Next &rsaquo;</a></li>";
	if ($paged < $pages-1 &&  $paged+$range-1 < $pages && $showitems < $pages) echo "<li><a href='".get_pagenum_link($pages)."'>Last &raquo;</a></li>";
	echo "</ul>\n";
  }
}

//CLEAN UP WP HEAD
remove_action( 'wp_head', 'rsd_link' );
remove_action( 'wp_head', 'wlwmanifest_link' );
remove_action( 'wp_head', 'wp_generator' );
remove_action( 'wp_head', 'rest_output_link_wp_head');
remove_action( 'wp_head', 'wp_shortlink_wp_head' );
remove_action( 'template_redirect', 'wp_shortlink_header' );
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );
remove_action( 'wp_head', 'start_post_rel_link' );
remove_action( 'wp_head', 'index_rel_link' );
remove_action( 'wp_head', 'adjacent_posts_rel_link' );
function remove_script_version($src) {
  return $src ? esc_url(remove_query_arg('ver', $src)) : false;
}
add_filter('script_loader_src', __NAMESPACE__ . '\\remove_script_version', 15, 1);
add_filter('style_loader_src', __NAMESPACE__ . '\\remove_script_version', 15, 1);
?>