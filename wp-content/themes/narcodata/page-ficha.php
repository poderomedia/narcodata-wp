<?php /* Template Name: Ficha */ ?>

<?php get_header(); ?>


<?php if (have_posts()) : ?>
	<?php while (have_posts()) : the_post(); ?>
		

		<div class="row-module sectionArticle">

			<div class="row">
					<div class="col12">
						<div class="headingTop">
							<span>Ficha de Cártel</span>
						</div>
					</div>


				<div class="col10 prefix1 nofloat">
					<div class="heading nomargin">

							<div class="col2">
							<?php 
								$icono_cartel = get_field('icono_cartel');
								if ($icono_cartel) : 
							?>
								<img src="<?php echo $icono_cartel['sizes']['img_130x130']; ?>" />
							<?php endif; ?>
							</div>

							<div class="col8">
								<?php if( get_field('nombre_cartel') ): ?>
									<h1><?php echo get_field('nombre_cartel'); ?></h1>
								<?php endif; ?>
								<?php if( get_field('tiempo_operacion') ): ?>
									<h2><?php echo get_field('tiempo_operacion'); ?></h2>
								<?php endif; ?>
								<?php social_buttons(); ?>
							</div>

					</div>
				</div>
			</div>
			<div class="row">
				<div class="col10 prefix1 nofloat">



				
					<?php if( have_rows('fundadores') ): ?>

						<div class="infoList">
							<div class="infoList-title">
								<h6>Fundadores</h6>
							</div>
						  <?php 
						    while( have_rows('fundadores') ): the_row(); 
						    $nombre_fundador = get_sub_field('nombre_fundador');
						    $foto_fundador = get_sub_field('foto_fundador');
						    $status_fundador = get_sub_field('status_fundador');

						    $fecha_status_fundador = get_sub_field('fecha_status_fundador');
						    $fecha_status_fundador_end =  date('d/m/Y', $fecha_status_fundador);

						  ?>
						 		<div class="infoList-item">
						 			<?php if($foto_fundador) : ?>
							 			<div class="infoListPhoto">
							 				<img src="<?php echo $foto_fundador['sizes']['img_130x130']; ?>" />
							 			</div>
						 			<?php endif; ?>
						 			<div class="infoListBody">
						 				<?php if($nombre_fundador) : ?>
						 					<h6><?php echo $nombre_fundador; ?></h6>
						 				<?php endif; ?>
						 				<?php if($status_fundador) : ?>
						 					<h5><?php echo $status_fundador; ?><?php if($fecha_status_fundador) : ?><span> (<?php echo $fecha_status_fundador; ?>)</span><?php endif; ?></h5>
						 				<?php endif; ?>
						 			</div>
						 		</div>
						 	<?php endwhile; ?>
					 	</div>
					<?php endif; ?>
				

				
					<?php if( have_rows('lideres') ): ?>
						<div class="infoList">
							<div class="infoList-title">
								<h6>Lideres</h6>
							</div>
						  <?php 
						    while( have_rows('lideres') ): the_row(); 
						    $nombrelider = get_sub_field('nombrelider');
						    $foto_lider = get_sub_field('foto_lider');
						    $statuslider = get_sub_field('statuslider');


						    $fechastatuslider = get_sub_field('fechastatuslider');
						    $fechastatuslider_end =  date('d/m/Y', $fechastatuslider);



						  ?>
						 		<div class="infoList-item">
						 			<?php if($foto_lider) : ?>
							 			<div class="infoListPhoto">
							 				<img src="<?php echo $foto_lider['sizes']['img_130x130']; ?>" />
							 			</div>
						 			<?php endif; ?>
						 			<div class="infoListBody">
						 				<?php if($nombrelider) : ?>
						 					<h6><?php echo $nombrelider; ?></h6>
						 				<?php endif; ?>
						 				<?php if($statuslider) : ?>
						 					<h5><?php echo $statuslider; ?><?php if($fechastatuslider) : ?><span> (<?php echo $fechastatuslider; ?>)</span><?php endif; ?></h5>
						 				<?php endif; ?>
						 			</div>
						 		</div>
						 	<?php endwhile; ?>
					 	</div>
					<?php endif; ?>  
				

					<?php if( have_rows('zonas_de_operacion') ): ?>
						<div class="infoList">
							<div class="infoList-title">
								<h6>Zonas de operación</h6>
							</div>
						  <?php 
						    while( have_rows('zonas_de_operacion') ): the_row(); 
						    $nombre_area = get_sub_field('nombre_area');
						    $zona_de_operacion = get_sub_field('zona_de_operacion');
						  ?>
						 		<div class="infoList-item">
						 			<div class="infoListBody">
						 				<?php if($nombre_area) : ?>
						 					<h6><?php echo $nombre_area; ?></h6>
						 				<?php endif; ?>
										<?php
											$zona_de_operacion = get_sub_field('zona_de_operacion');
											if( ! empty($zona_de_operacion) ):
										?>
											<div id="map" style="width: 70%; height: 350px;"></div>
											<script src='http://maps.googleapis.com/maps/api/js?sensor=false' type='text/javascript'></script>
											<script type="text/javascript">
											  //<![CDATA[
												function load() {
												var lat = <?php echo $zona_de_operacion['lat']; ?>;
												var lng = <?php echo $zona_de_operacion['lng']; ?>;
												// coordinates to latLng
												var latlng = new google.maps.LatLng(lat, lng);
												// map Options
												var myOptions = {
												zoom: 8,
												center: latlng,
												mapTypeId: google.maps.MapTypeId.HYBRID
											   };
												//draw a map
												var map = new google.maps.Map(document.getElementById("map"), myOptions);
												var marker = new google.maps.Marker({
												position: map.getCenter(),
												map: map
											   });
											}
											// call the function
											   load();
											//]]>
											</script>
										<?php endif; ?> 					 				
						 			
						 			</div>
					 			</div>
					 		<?php endwhile; ?>
						</div>
					<?php endif; ?>


					<?php if( have_rows('hechos_clave') ): ?>
						<div class="infoList">
							<div class="infoList-title">
								<h6>Hechos Clave</h6>
							</div>
						  <?php 
						    while( have_rows('hechos_clave') ): the_row(); 
						    $titulo_hecho_clave = get_sub_field('titulo_hecho_clave');
						    $texto_hecho_clave = get_sub_field('texto_hecho_clave');
						    $foto_hecho_clave = get_sub_field('foto_hecho_clave');
						    $link_hecho_clave = get_sub_field('link_hecho_clave');
						  ?>
						 		<div class="infoList-item infoList-item--large">
							 		<?php if($foto_hecho_clave) : ?>
							 			<div class="infoListPhoto">
								 			<img src="<?php echo $foto_hecho_clave['sizes']['img_400x200']; ?>" />
								 		</div>
							 		<?php endif; ?>
							 		<div class="infoListBody">
							 			<?php if($titulo_hecho_clave) : ?>
							 				<h6><?php echo $titulo_hecho_clave; ?></h6>
							 			<?php endif; ?>
							 			<?php if($link_hecho_clave) : ?>
							 				<h6><a href="<?php echo $link_hecho_clave; ?>" target="_blank"><?php echo $link_hecho_clave; ?></a></h6>
							 			<?php endif; ?>
							 			<?php if($texto_hecho_clave) : ?>
							 				<h5><?php echo $texto_hecho_clave; ?></h5>
							 			<?php endif; ?>
							 		</div>
						 		</div>
						 	<?php endwhile; ?>
					 	</div>
					<?php endif; ?>

				</div>
			</div>
		</div>

		<?php get_template_part( 'content', 'comments' ); ?>

	<?php endwhile; ?>
<?php endif; ?>

<?php get_footer(); ?>