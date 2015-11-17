<?php /* Template Name: Search Page */ ?>

<?php get_header(); ?>

<div class="row-module sectionArticle">

	<div class="row">
			<div class="col12">
				<div class="headingTop">
					<span>Resultados</span>
				</div>
			</div>
		<div class="col10 prefix1 nofloat">
			<div class="heading nomargin">
				<h1>Página de búsquedas para "<?php echo get_search_query(); ?>"</h1>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col10 prefix1 nofloat">
			<div class="text">
				<?php if ( have_posts() ) : ?>
					<ul>
						<?php while ( have_posts() ) : the_post(); ?>
							<li>
								<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a><br/>
								<?php the_excerpt(); ?>
							</li>
						<?php endwhile; ?>
					</ul>
				<?php else : ?>
					<div class="heading nomargin">
						<h2 style="margin:0;">No se encontraron resultados</h2>
					</div>
				<?php endif; ?>
			</div>
		</div>
	</div>
</div>

<?php get_footer(); ?>