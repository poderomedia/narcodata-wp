<?php 
  $postid = get_id_by_slug("portada");
  $args = array(
      'name' => 'portada',
      'post_type'=> 'page',
      'p' => $postid
  );
  query_posts($args); 
?>
<?php if (have_posts()) : ?>
  <div class="sectionListItem">
    <?php while (have_posts()) : the_post(); ?>
     <?php if( have_rows('post_list') ): ?>
      <?php 
        while( have_rows('post_list') ): the_row(); 
        $post_object = get_sub_field('page_title');
        $post_text = get_sub_field('cabecera');
        $page_style = get_sub_field('page_style');
        $page_size = get_sub_field('page_size');
      ?>
        <?php
          global $post;
          if($post_object): 
          $post = $post_object;
          setup_postdata($post); 
        ?>
          <div class="sectionItem sectionItem--<?php echo $page_size; ?> sectionItem--<?php echo $page_style; ?>">
            <a href="<?php the_permalink(); ?>">
              <?php if($page_style == "new"): ?>
                <div class="sectionItem-wrap">
                  <div class="sectionItem-photo">
                    <?php if (has_post_thumbnail() ): ?>
                      <?php $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'img_200x400' ); ?> 
                      <figure style="background-image: url(<?php echo $image[0]; ?>);"></figure>
                    <?php else: ?>
                      <figure style="background-image: url(<?php bloginfo('template_url'); ?>/assets/images/default.png);"></figure>
                    <?php endif; ?>
                  </div>
                  <div class="sectionItem-body">
                    <div class="row-table">
                      <div class="row-cell middle">
                        <h1><?php the_title(); ?></h1>
                        <p><?php $cabecera = get_sub_field('cabecera'); echo $cabecera; ?></p>
                        <span><i class="flaticon icon stroke icon-16 right-4"></i></span>
                      </div>
                    </div>
                  </div>
                </div>
              <?php else : ?>
                <div class="sectionItem-wrap">
                  <div class="sectionItem-body">
                    <div class="row-table">
                      <div class="row-cell middle">
                        <div class="sectionItem-label">
                          <?php $cabecera = get_sub_field('cabecera'); echo $cabecera; ?>
                        </div>
                        <div class="sectionItem-photo">
                          <figure>
                            <?php if (has_post_thumbnail() ): ?>
                              <?php $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'img_200x400' ); ?> 
                              <img src="<?php echo $image[0]; ?>" />
                            <?php else: ?>
                              <img src="<?php bloginfo('template_url'); ?>/assets/images/default.png" />
                            <?php endif; ?>
                          </figure>
                        </div>
                        <h2><?php the_title(); ?></h2>
                      </div>
                    </div>
                  </div>
                </div>
              <?php endif; ?>
            </a>
          </div>
          <?php wp_reset_postdata(); ?>
        <?php endif; ?>
      <?php endwhile; ?>
     <?php endif; ?>  
    <?php endwhile; ?>
  </div>
<?php endif; wp_reset_query(); ?>














<?php if(false): ?>
  <div class="sectionListItem">
    <!-- Primero -->

    <div class="sectionItem sectionItem--large sectionItem--new">
      <a href="http://narcodata.animalpolitico.com/que-es-narco-data/">
        <div class="sectionItem-wrap">
          <div class="sectionItem-photo">
            <figure style="background-image: url(<?php bloginfo('template_url'); ?>/assets/images/01_ND.jpg);">
            </figure>
          </div>
          <div class="sectionItem-body">
            <div class="row-table">
              <div class="row-cell middle">
                <h1>NarcoData: <em>Radiografía interactiva del crimen organizado en México</em></h1>
                <p>Una plataforma digital para consultar el avance de los grupos delictivos que dominan el negocio de la droga y saquean al ciudadano. </p>
                <span><i class="flaticon icon stroke icon-16 right-4"></i></span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
    <!--Cierre primero-->

    <!-- Segundo -->
    <div class="sectionItem sectionItem--min sectionItem--display">
      <a href="<?php echo get_the_permalink(23); ?>">
        <div class="sectionItem-wrap">
          <div class="sectionItem-body">
            <div class="row-table">
              <div class="row-cell middle">
                <div class="sectionItem-label">
                  Cuarta Entrega
                </div>
                <div class="sectionItem-photo">
                  <figure>
                    <img src="<?php bloginfo('template_url'); ?>/assets/images/06_LP_ND.png" />
                  </figure>
                </div>
                <h2>De aliados a rivales: los conflictos entre cárteles</h2>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
    <!--Cierre segundo-->

  </div>

  <div class="sectionListItem sectionListItem--3">
    <!-- Tercero -->
    <div class="sectionItem sectionItem--display">
      <a href="http://narcodata.animalpolitico.com/brazos-armados/">
        <div class="sectionItem-wrap">
          <div class="sectionItem-body">
            <div class="row-table">
              <div class="row-cell middle">
                <div class="sectionItem-label">
                  Tercera Entrega
                </div>
                <div class="sectionItem-photo">
                  <figure>
                    <img src="<?php bloginfo('template_url'); ?>/assets/images/05_LP_ND.png" />
                  </figure>
                </div>
                <h2>Al servicio de los cárteles, los brazos armados hacen que estalle la violencia en el país</h2>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
    <!--Cierre tercero-->

    <!-- Cuarto -->
    <div class="sectionItem sectionItem--display">
      <a href="http://narcodata.animalpolitico.com/con-pena-el-chapo-y-jalisco-nueva-generacion-dominan-el-negocio-de-la-droga/">
        <div class="sectionItem-wrap">
          <div class="sectionItem-body">
            <div class="row-table">
              <div class="row-cell middle">
                <div class="sectionItem-label">
                  Segunda Entrega
                </div>
                <div class="sectionItem-photo">
                  <figure>
                    <img src="<?php bloginfo('template_url'); ?>/assets/images/03LPND.png" />
                  </figure>
                </div>
                <h2>Los Cárteles de la droga en la era de Peña Nieto</h2>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
    <!--Cierre cuarto-->

    <!-- Tercero -->
    <div class="sectionItem sectionItem--display">
      <a href="http://narcodata.animalpolitico.com/7-presidentes-pocos-resultados-40-anos-de-expansion-del-crimen-organizado/">
        <div class="sectionItem-wrap">
          <div class="sectionItem-body">
            <div class="row-table">
              <div class="row-cell middle">
                <div class="sectionItem-label">
                  Primera Entrega
                </div>
                <div class="sectionItem-photo">
                  <figure>
                    <img src="<?php bloginfo('template_url'); ?>/assets/images/02_LP_ND.png" />
                  </figure>
                </div>
                <h2>7 Presidentes, pocos resultados: 40 años de expansión del crimen organizado</h2>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
    <!--Cierre tercero-->

  </div>

  <div class="sectionListItem sectionListItem--3">
    
    <!-- Cuarto -->
    <div class="sectionItem sectionItem--display">
      <a target="_blank" href="https://www.youtube.com/watch?v=MAWguQlBWvA">
        <div class="sectionItem-wrap">
          <div class="sectionItem-body">
            <div class="row-table">
              <div class="row-cell middle">
                <div class="sectionItem-label">
                  Presentación
                </div>
                <div class="sectionItem-photo">
                  <figure>
                    <img src="<?php bloginfo('template_url'); ?>/assets/images/presentacion.png" />
                  </figure>
                </div>
                <h2>Un proyecto que explica la historia de la delincuencia organizada</h2>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
    <!--Cierre cuarto-->

    <!-- Quinto -->
    <div class="sectionItem sectionItem--display">
      <a href="http://narcodata.animalpolitico.com/proximamente/">
        <div class="sectionItem-wrap">
          <div class="sectionItem-body">
            <div class="row-table">
              <div class="row-cell middle">
                <div class="sectionItem-label">
                  Próximamente
                </div>
                <div class="sectionItem-photo">
                  <figure>
                    <img src="<?php bloginfo('template_url'); ?>/assets/images/11_LP_ND.png" />
                  </figure>
                </div>
                <h2>Las próximas entregas de NarcoData</h2>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
    <!--Cierre quinto-->

    <!-- Quinto -->
    <div class="sectionItem sectionItem--display">
      <a href="http://narcodata.animalpolitico.com/creditos/">
        <div class="sectionItem-wrap">
          <div class="sectionItem-body">
            <div class="row-table">
              <div class="row-cell middle">
                <div class="sectionItem-label">
                  Créditos
                </div>
                <div class="sectionItem-photo">
                  <figure>
                    <img src="<?php bloginfo('template_url'); ?>/assets/images/10_LP_ND.png" />
                  </figure>
                </div>
                <h2>El Equipo NarcoData</h2>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
    <!--Cierre quinto-->
  <?php endif; ?>





  <?php if(false): ?>

    <div class="sectionItem sectionItem--section">
      <a href="http://narcodata.animalpolitico.com/creditos/">
        <div class="sectionItem-wrap">
          <div class="sectionItem-icon">
            <i class="flaticon icon stroke icon-16 multiple-documents-1"></i>
          </div>
          <div class="sectionItem-body">
            <div class="row-table">
              <div class="row-cell middle">
                <h2>Créditos</h2>
              </div>
            </div>
          </div>
          <div class="sectionItem-actions">
            <span>Ver <i class="flaticon icon stroke icon-16 right-4"></i></span>
          </div>
        </div>
      </a>
    </div>

    <div class="sectionItem sectionItem--section">
      <a href="#">
        <div class="sectionItem-wrap">
          <div class="sectionItem-icon">
            <i class="flaticon icon stroke icon-16 calculator-1"></i>
          </div>
          <div class="sectionItem-body">
            <div class="row-table">
              <div class="row-cell middle">
                <h2>Numeralia</h2>
              </div>
            </div>
          </div>
          <div class="sectionItem-actions">
            <span>Ver <i class="flaticon icon stroke icon-16 right-4"></i></span>
          </div>
        </div>
      </a>
    </div>

    <div class="sectionItem sectionItem--section">
      <a href="#">
        <div class="sectionItem-wrap">
          <div class="sectionItem-icon">
            <i class="flaticon icon stroke icon-16 pin-1"></i>
          </div>
          <div class="sectionItem-body">
            <div class="row-table">
              <div class="row-cell middle">
                <h2>Fichas por Cartel</h2>
              </div>
            </div>
          </div>
          <div class="sectionItem-actions">
            <span>Ver <i class="flaticon icon stroke icon-16 right-4"></i></span>
          </div>
        </div>
      </a>
    </div>

  <?php endif; ?>