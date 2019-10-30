<?php
/**
 * @package Good Work Marketing
 */
?>
<?php 
// Get $post if you're inside a function
global $post;
$pid = $post->ID;
$pname = $post->post_name;
$pexcerpt = $post->post_excerpt; 
$pparent = $post->post_parent; 
$children = wp_list_pages('&child_of='.$post->ID.'&echo=0'); 
?>
<aside id="sidebar">
	<?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar('') ) :  ?>
	<?php endif; ?>
</aside>
