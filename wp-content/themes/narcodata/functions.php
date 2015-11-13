<?php

//Config Primary Menu with NarcoData pages
	register_nav_menu( 'NavMenu', 'primary' );

	add_theme_support( 'post-thumbnails' );
	set_post_thumbnail_size(165, 165, true);
	add_image_size( 'img_500x500', 500, 500, true );
	add_image_size( 'img_130x130', 130, 130, true );
	add_image_size( 'img_200x400', 200, 400, true );
	add_image_size( 'img_400x200', 400, 200, true );

	add_theme_support( 'html5', array(
		'search-form', 'comment-form', 'comment-list', 'gallery', 'caption'
	) );

function visualizationShortcode($atts) {
	global $wp;
	$siteurl = get_bloginfo('template_url');
	$atts = shortcode_atts(
		array(
			'id' => 'default',
			'js' => 'default',
			'class' => 'default',
		), $atts, 'visualization' );
	echo '<div class="wrapVisualization contenedor '.$atts['class'].'" id="'.$atts['id'].'"></div>';
	echo '<script language="javascript" type="text/javascript" src="'. $siteurl .'/js/'.$atts['js'].'.js"></script>';
	echo '<script language="javascript" type="text/javascript"> visualizacion.init();</script>';

add_shortcode('visualization', 'visualizationShortcode');
}

function get_id_by_slug($page_slug) {
	$page = get_page_by_path($page_slug);
	if ($page) {
		return $page->ID;
	} else {
		return null;
	}
}