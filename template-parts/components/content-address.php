<?php if(have_rows('co_location', 'option')) {
	echo '<div class="contact">';
	 while( have_rows('co_location', 'option') ): the_row();
    $name = get_sub_field('loc_name');
    $address = get_sub_field('loc_address');
    $city = get_sub_field('loc_city');
    $state = get_sub_field('loc_state');
    $zip = get_sub_field('loc_zip');
    $phone = get_sub_field('loc_phone');
    $email = get_sub_field('loc_email');
    echo '<address>';

    if($name) echo '<span>'.$name.'</span>';
    if($address) echo '<span>'.$address.'</span>';
    if($city && $state && $zip) echo '<span>'.$city.', '.$state.' '.$zip.'</span>';
    if($phone) echo '<span>'.$phone.'</span>';
    echo '</address>';
endwhile; 
echo '</div>';
} ?>