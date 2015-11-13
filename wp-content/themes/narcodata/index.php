<?php get_header(); ?>

<section class="row-module">
	<div class="row">
		<div class="col12">
			<?php get_template_part( 'content', 'home' ); rewind_posts(); ?>
		</div>
	</div>
</section>

<?php get_footer(); ?>