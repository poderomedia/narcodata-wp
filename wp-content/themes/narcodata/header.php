<!DOCTYPE html>
<html xmlns:fb="http://ogp.me/ns/fb#">
	<head>
		<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
		<meta name="viewport" content="width=device-width, user-scalable=yes" />
		<link rel="shortcut icon" href="<?php bloginfo('template_url'); ?>/favicon.ico" />
		<title><?php wp_title('&laquo;', true, 'right'); ?> <?php bloginfo('name'); ?></title>

		<link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/assets/stylesheets/application.css" type="text/css" media="screen" />
		<link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/assets/stylesheets/others.css" type="text/css" media="screen" />
		<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />

		<?php wp_head(); ?>

		<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/assets/javascripts/min/application-min.js" charset="utf-8"></script>

		<script type="text/javascript">
			var siteurl = "<?php bloginfo('template_url'); ?>/";
		</script>


	</head>
	
	<body <?php body_class(); ?>>

		<header>
			<div class="headerTop">
				<div class="row">
					<div class="col12">
						<nav class="headerTop-nav">
							<ul>
								<li class="headerTop-nav-social"><a target="_blank" href="https://www.facebook.com/Narcodata/"><i class="flaticon social icon icon-16 facebook-1"></i> Facebook</a></li>
								<li class="headerTop-nav-social"><a target="_blank" href="https://twitter.com/narcodata"><i class="flaticon social icon icon-16 twitter-1"></i> Twitter</a></li>
								<li class="headerTop-nav-social"><a target="_blank" href="http://www.animalpolitico.com/contactanos/"><i class="flaticon solid icon icon-16 mail-1"></i> Enviar</a></li>
								<li class="dropdown headerTop-search">
									<a href="#" class="dropdown-toggle" data-toggle="dropdown">
										<i class="flaticon stroke icon icon-32 zoom-2"></i> Search
									</a>
									<div class="dropdown-menu">
										<a href="#" class="dropdown-menu-close">
											<i class="flaticon stroke icon icon-32 x-1"></i> cerrar
										</a>
										<div class="row-table">
											<div class="row-cell middle">
												<?php get_template_part( 'content', 'search' ); ?>
											</div>
										</div>
									</div>
								</li>
								<li class="dropdown headerTop-menuMobile">
									<a href="#" class="dropdown-toggle" data-toggle="dropdown">
										<i class="flaticon stroke icon icon-32 menu-2"></i> Menu
									</a>
									<div class="dropdown-menu">
										<div class="headerTop-menuMobile-form">
											<?php get_template_part( 'content', 'search' ); ?>
										</div>
										<?php
											$defaults = array(
												'menu'            => 'NavMenu',
												'container'       => 'ul',
												'menu_class'      => 'dropdown-menu-list',
											);
											wp_nav_menu( $defaults );
										?>
										<ul>
											<li>
												<a href="#" class="headerTop-menuMobile-close">
													<span>
														<i class="flaticon stroke icon icon-32 x-1"></i> cerrar
													</span>
												</a>
											</li>
										</ul>
									</div>
								</li>
							</ul>
						</nav>
						<h3 class="animalPolitico">Animal Politico</h3>
						<h2 class="narcoData"><a href="<?php echo home_url(); ?>">NarcoData</a></h2>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col12">
					<?php
						$defaults = array(
							'menu'            => 'NavMenu',
							'container'       => 'nav',
							'container_class' => 'headerNav',
							'container_id'    => 'site-navigation',
							'menu_class'      => 'menu',
						);
						wp_nav_menu( $defaults );
					?>
				</div>
			</div>
		</header>
			<div class="wrapSite">
				<section class="wrap">