<?php 
$image = get_sub_field('fpsc_image');
$headline = get_sub_field('fpsc_headline');
$button_target = $boxLink['target'] ? $boxLink['target'] : '_self';
?>
<section class="showcase">
	<?php echo wp_get_attachment_image($image, 'showcase-xl', '', array('sizes' => '(max-width: 575px) 200vw'));
	if($headline) {
		echo '<h2 class="headline">'.$headline.'</h2>';
	}
	if($boxLink) {
		echo '<a href="'.$boxLink['url'].'" target="'.$button_target.'" class="btn btn-primary btn-lg">'.$boxLink['title'].'</a>';
	}
?>
</section>