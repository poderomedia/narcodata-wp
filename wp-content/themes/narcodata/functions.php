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

	function social_buttons() {
	  global $post;
	  $permalink = get_permalink($post->ID);
	  if(is_single() || is_page()) {
	  	if(get_field('social_title_post')) {
	  		$post_title = get_field('social_title_post');
	  	} else {
	  		$post_title = get_the_title($post->ID);
	  	}
	  } else {
	  	$post_title = $blogname;
	  }
	 	$post_thumbnail_id = get_post_thumbnail_id($post->ID);
	 	$post_thumbnail_url = wp_get_attachment_url( $post_thumbnail_id );
	  if(is_single() || is_page()) { 
	  	$html = '<ul class="shareSocial">';
	  	$html.= '<li><a href="https://www.facebook.com/sharer/sharer.php?u='.$permalink.'" onclick="window.open(this.href, \'facebook-share\',\'width=580,height=296\');return false;"><i class="icon icon-16 flaticon social facebook-1"></i>Facebook</a></li>';
	  	$html.= '<li><a href="http://twitter.com/share?text='.$post_title.'&url='.$permalink.'" onclick="window.open(this.href, \'twitter-share\', \'width=550,height=235\');return false;"><i class="icon icon-16 flaticon social twitter-1"></i>Twitter</a></li>';
	  	$html.= '</ul>';
	    echo $html;
	  }
	}
	
	add_action('wp_head', 'add_fb_open_graph_tags');
	function add_fb_open_graph_tags() {

		global $post;
		global $wp;

		$current_url = home_url(add_query_arg(array(),$wp->request));
		$blogtemplate = get_bloginfo('template_url');
		$blogurl = get_bloginfo('url') . "/";
		$blogname = get_bloginfo('name');
		$blogdescription = get_bloginfo('description');
		$blogkeywords = "";

		$post_url = $current_url . "/";

		if(is_single() || is_page()) {
			if(get_field('social_title_post')) {
				$post_title = get_field('social_title_post');
			} else {
				$post_title = get_the_title();
			}
		} else {
			$post_title = $blogname;
		}

		if(is_single()) { 
			$description = my_excerpt( $post->post_content, $post->post_excerpt );
			$description = strip_tags($description);
			$description = str_replace("\"", "\'", $description);
		} else {
			$description = $blogdescription;
		}
		
		$result = "<!-- og -->\n";
		$result .= "<meta property=\"og:site_name\" content=\"$blogname\" />\n";
		$result .= "<meta property=\"fb:app_id\" content=\"527744890712825\" />\n";
		$result .= "<meta property=\"og:locale\" content=\"es_ES\" />\n";
		$result .= "<meta property=\"article:author\" content=\"$blogurl\" />\n";
		$result .= "<meta property=\"article:publisher\" content=\"$blogurl\" />\n";
		$result .= "<meta property=\"og:description\" content=\"$description\" />\n";
		$result .= "<meta property=\"og:title\" content=\"$post_title\" />\n";

		$result .= "<meta name=\"twitter:card\" content=\"summary\"/>\n";
		$result .= "<meta name=\"twitter:title\" content=\"$post_title - $blogname\"/>\n";


		if (is_single() || is_page()) {
			$result .= "<meta property=\"og:type\" content=\"article\" />\n";
			$result .= "<meta property=\"og:url\" content=\"$post_url\" />\n";
		} elseif(is_home()) {
			$result .= "<meta property=\"og:type\" content=\"website\" />\n";
			$result .= "<meta property=\"og:url\" content=\"$blogurl\" />\n";
		} else {
			$result .= "<meta property=\"og:type\" content=\"website\" />\n";
			$result .= "<meta property=\"og:url\" content=\"$post_url\" />\n";
		}

		echo $result;

		if(is_single() || is_page()) {
			if(get_field('social_photo_post')) {
				$social_photo_post = get_field('social_photo_post');
				$image = $social_photo_post['url'];
				echo "<meta property=\"og:image\" content=\"$image\" />\n";
			} elseif(get_the_post_thumbnail($post->ID, 'thumbnail')) {
				$post_thumbnail_id = get_post_thumbnail_id($post->ID);
				$image = wp_get_attachment_url( $post_thumbnail_id );
				echo "<meta property=\"og:image\" content=\"$image\" />\n";
			}
		}

		echo "<!--/ og end -->";

	}

?>