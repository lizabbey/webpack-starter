<?php 
//ENQUEUE SCRIPTS AND STYLES
function gwself_scripts() {
	global $post;
	//default script - needed everywhere
	wp_enqueue_script( 'theme-jquery', get_template_directory_uri() . '/dist/js/theme.js', array('jquery'), 20190529, true);
	wp_localize_script('theme-jquery', 'WPURLS', array('siteurl' => get_option('siteurl')));
	//header, footer, global css
	wp_enqueue_style( 'theme-style', get_template_directory_uri() . '/dist/css/theme.css', array(), date("H:i:s"));

	//section specific styles and scripts
	if(is_front_page()) {
		//FRONT PAGE SCRIPTS
		wp_enqueue_script( 'fp-script', get_template_directory_uri() . '/dist/js/frontpage.js', array('jquery'), 20190529, true);
		wp_enqueue_style( 'frontpage-style', get_template_directory_uri() . '/dist/css/frontpage.css', array(), date("H:i:s"));
	} elseif(is_singular()) {
		$type = $post->post_type;
		wp_enqueue_style( $type.'-style', get_template_directory_uri() . '/dist/css/type_'.$type.'.css', array(), date("H:i:s"));
	} else {
		wp_enqueue_style( 'page-style', get_template_directory_uri() . '/dist/css/type_page.css', array(), date("H:i:s"));
	}
}

add_action( 'wp_enqueue_scripts', 'gwself_scripts' );


//image sizes
add_image_size('showcase-xl', 2000, 1315, true );
add_image_size('showcase-lg', 1400, 920, true );
add_image_size('showcase-md', 1000, 657, true );
add_image_size('showcase-sm', 800, 525, true );
add_image_size('card-image', 1000, 560, true );

//Filter excerpt length
function gw_custom_excerpt_length( $length ) {
    return 25;
}
add_filter( 'excerpt_length', 'gw_custom_excerpt_length', 999 );

//BOOTSTRAP GRAVITY FORMS
add_filter( 'gform_field_container', 'add_bootstrap_container_class', 10, 6 );
function add_bootstrap_container_class( $field_container, $field, $form, $css_class, $style, $field_content ) {
  $id = $field->id;
  $field_id = is_admin() || empty( $form ) ? "field_{$id}" : 'field_' . $form['id'] . "_$id";
  return '<li id="' . $field_id . '" class="' . $css_class . ' form-group">{FIELD_CONTENT}</li>';
}

//ACF OPTIONS PAGE
if( function_exists('acf_add_options_page') ) {
	acf_add_options_page(array(
		'page_title' 	=> 'Company Info',
		'menu_title'	=> 'Company Info',
		'menu_slug' 	=> 'company-info',
		'capability'	=> 'edit_posts',
		'redirect'		=> false
	));
}