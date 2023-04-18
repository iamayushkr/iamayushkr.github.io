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

// dots is an array of Dot objects,
// mouse is an object used to track the X and Y position
   // of the mouse, set with a mousemove event listener below
   var dots = [],
   mouse = {
     x: 0,
     y: 0
   };

// The Dot object used to scaffold the dots
var Dot = function() {
 this.x = 0;
 this.y = 0;
 this.node = (function(){
   var n = document.createElement("div");
   n.className = "trail";
   document.body.appendChild(n);
   return n;
 }());
};
// The Dot.prototype.draw() method sets the position of 
 // the object's <div> node
Dot.prototype.draw = function() {
 this.node.style.left = this.x + "px";
 this.node.style.top = this.y + "px";
};

// Creates the Dot objects, populates the dots array
for (var i = 0; i < 12; i++) {
 var d = new Dot();
 dots.push(d);
}

// This is the screen redraw function
function draw() {
 // Make sure the mouse position is set everytime
   // draw() is called.
 var x = mouse.x,
     y = mouse.y;
 
 // This loop is where all the 90s magic happens
 dots.forEach(function(dot, index, dots) {
   var nextDot = dots[index + 1] || dots[0];
   
   dot.x = x;
   dot.y = y;
   dot.draw();
   x += (nextDot.x - dot.x) * .6;
   y += (nextDot.y - dot.y) * .6;

 });
}

addEventListener("mousemove", function(event) {
 //event.preventDefault();
 mouse.x = event.pageX;
 mouse.y = event.pageY;
});

// animate() calls draw() then recursively calls itself
 // everytime the screen repaints via requestAnimationFrame().
function animate() {
 draw();
 requestAnimationFrame(animate);
}

// And get it started by calling animate().
animate();
