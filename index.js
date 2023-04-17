$(document).ready(function() {
  var sections = $('section');
  var index = 0;
  var scrolling = false;

  // Set the height of each section to the viewport height minus the height of the navigation bar
  sections.height($(window).height() - $('nav').height());

  $(window).resize(function() {
    // Update the height of each section when the window is resized
    sections.height($(window).height() - $('nav').height());
  });

  $(window).on('wheel', function(e) {
    e.preventDefault();

    // Only scroll if we're not already scrolling
    if (!scrolling) {
      scrolling = true;

      // Determine the direction of the scroll (up or down)
      var direction = (e.originalEvent.deltaY > 0) ? 1 : -1;

      // Update the index of the current section
      index += direction;
      if (index < 0) {
        index = 0;
      } else if (index >= sections.length) {
        index = sections.length - 1;
      }

      // Scroll to the next section
      $('html, body').animate({
        scrollTop: sections.eq(index).offset().top
      }, 1, function() {
        scrolling = false;
      });
    }
  });
});

