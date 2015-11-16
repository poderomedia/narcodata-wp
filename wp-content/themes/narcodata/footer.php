			</section><!--/wrap-->

			<section class="sectionNewsletters">
				<form>
					<div class="col8 aright">
						<h6>Regístrate y recibe un correo</h6>
						<p>Cuando publiquemos la próxima entrega de NarcoData</p>
					</div>
					<div class="col4">
						<input type="text" name="EMAIL" placeholder="Ingresa tu correo" />
						<input type="hidden" name="EMAIL" value="{data_email}" />
					</div>
					<div class="form-actions">
						<a href="http://narcodata.animalpolitico.com/newsletter/">
							<i class="icon icon-32 flaticon solid right-4"></i>
						</a>
					</div>
				</form>
			</section>
			
			<footer class="row-module">
				<div class="row">
					<div class="col3">
						<h2 class="narcoData"><a href="<?php echo home_url(); ?>">NarcoData</a></h2>
					</div>
					<div class="col3">
						<h6>Un proyecto de</h6>
						<div class="logoList">
							<div class="logoList-item">
								<a target="_blank" href="http://www.animalpolitico.com/">
									<img src="<?php bloginfo('template_url'); ?>/assets/images/logos/animalpolitico.png" alt="Animal Politico" />
								</a>
							</div>
							<div class="logoList-item">
								<a target="_blank" href="http://www.poderopedia.com/">
									<img src="<?php bloginfo('template_url'); ?>/assets/images/logos/poderopedia.png" alt="Poderopedia" />
								</a>
							</div>
						</div>
					</div>
					<div class="col4">
						<h6>Contribuyeron para realizar esta iniciativa</h6>
						<div class="logoList">
							<div class="logoList-item">
								<a target="_blank" href="http://hackslabs.org/">
									<img src="<?php bloginfo('template_url'); ?>/assets/images/logos/hackslabs.png" alt="HackLabs" />
								</a>
							</div>
							<div class="logoList-item">
								<a target="_blank" href="http://www.icfj.org/">
									<img src="<?php bloginfo('template_url'); ?>/assets/images/logos/icfj.png" alt="ICFJ" />
								</a>
							</div>
							<div class="logoList-item">
								<a target="_blank" href="https://www.hivos.org/">
									<img src="<?php bloginfo('template_url'); ?>/assets/images/logos/hivos.png" alt="Hivos" />
								</a>
							</div>
							<div class="logoList-item">
								<a target="_blank" href="http://www.avina.net/esp/">
									<img src="<?php bloginfo('template_url'); ?>/assets/images/logos/avina.png" alt="Avina" />
								</a>
							</div>
						</div>
					</div>
					<div class="col2">
						<h6>Participa</h6>
						<ul>
							<li class="with-icon"><a target="_blank" href="https://www.facebook.com/Narcodata/"><i class="flaticon social icon icon-16 facebook-1"></i> Facebook</a></li>
							<li class="with-icon"><a target="_blank" href="https://twitter.com/narcodata"><i class="flaticon social icon icon-16 twitter-1"></i> Twitter</a></li>
							<li class="with-icon"><a target="_blank"  href="http://www.animalpolitico.com/contactanos/"><i class="flaticon solid icon icon-16 mail-1"></i> Enviar</a></li>
						</ul>
					</div>
				</div>
				<div class="row footerBottom">
					<hr />
					<div class="col6">
						<p><a target="_blank" href="http://www.animalpolitico.com/aviso-legal/">Legal y Privacidad</a><span>·</span><a href="http://narcodata.animalpolitico.com/metodologia/">Metodología</a></p>
					</div>
					<div class="col6 aright">
						<a target="_blank" href="http://www.animalpolitico.com/circulo-de-amigos-animal/">Financia a Animal Político</a>
					</div>
				</div>
			</footer>	

		</div><!--/wrapSite-->
	
		<?php wp_footer(); ?>
		<script>
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-68387804-1', 'auto');
			ga('send', 'pageview');
		</script>
		<script>
		  window.fbAsyncInit = function() {
		    FB.init({
		      appId      : '527744890712825',
		      xfbml      : true,
		      version    : 'v2.4'
		    });
		  };

		  (function(d, s, id){
		     var js, fjs = d.getElementsByTagName(s)[0];
		     if (d.getElementById(id)) {return;}
		     js = d.createElement(s); js.id = id;
		     js.src = "//connect.facebook.net/en_US/sdk.js";
		     fjs.parentNode.insertBefore(js, fjs);
		   }(document, 'script', 'facebook-jssdk'));
		</script>
	</body>

</html>