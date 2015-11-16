<?php /* Template Name: Créditos */ ?>

<?php get_header(); ?>

<div class="row-module sectionArticle">

	<div class="row">
		<?php if(get_field('cabecera')) : ?>
			<div class="col12">
				<div class="headingTop">
					<span><?php the_field('cabecera'); ?></span>
				</div>
			</div>
		<?php endif; ?>
		<div class="col10 prefix1 nofloat">
			<div class="heading nomargin">
				<h1><?php the_title(); ?></h1>
				<?php
					if(get_field('subtitulo')) {
						echo '<p>' . get_field('subtitulo') . '</p>';
					}
				?>
				<?php social_buttons(); ?>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col10 prefix1 nofloat">
			<div class="text">
				<?php if ( have_posts() ) : while( have_posts() ) : the_post(); the_content();
				endwhile; endif; ?>
			</div>
		</div>
	</div>
</div>

<?php get_footer(); ?>