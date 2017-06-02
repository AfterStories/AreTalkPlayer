$(document).ready(function() {
    var owl = $('.owl-carousel');
      owl.owlCarousel({ 
        margin: 10,
        nav: true,
        loop: true,
        dots:false,
        items:4,
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        stopOnHover:true
      })
  });