$(document).ready(function(){
    $('.owl-carousel').owlCarousel({
        loop:true,
        items:2,
        autoplay: true,
        margin:10,
        nav:true,
        dots:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:3
            }
        }
    })
    
  });
