$(document).ready(function(){

  $('.dropdown').on('show.bs.dropdown', function(){
    $('body').addClass("dropdown-open");
  });


  $('.dropdown').on('hide.bs.dropdown', function(){
    $('body').removeClass("dropdown-open");
  });


  $('.headerTop-menuMobile').on('show.bs.dropdown', function(){
    $('body').addClass("menuMobile-open");
  });


  $('.headerTop-menuMobile').on('hide.bs.dropdown', function(){
    $('body').removeClass("menuMobile-open");
  });
  




  $('.scrollToTop').click(function(){
  	$('html, body').animate({scrollTop : 0},600);
  	return false;
  });

});