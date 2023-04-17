$(document).ready(function() {
     // add click event to navigation links
     $('nav a').click(function(e) {
       e.preventDefault();
       var target = $(this).attr('href');
       $('html, body').animate({
         scrollTop: $(target).offset().top
       }, 1000); // animate scroll to target section
     });
   }); 