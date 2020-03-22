// Main js file

// Set the Access Token
var accessToken = '8952e3f6bc05276d909eaaffca5407d07b3d10a26e980abd53b1fd6aefdc3b2d';

// Call Dribble v2 API
$.ajax({
    url: 'https://api.dribbble.com/v2/user/shots?access_token='+accessToken + '&per_page=4',
    dataType: 'json',
    type: 'GET',
    success: function(data) {
      if (data.length > 0) {
        $.each(data.reverse(), function(i, val) {
          $('#dribbbleShots').prepend(
            '<li class="dribbble-shot"><a class="" target="_blank" href="'+ val.html_url +'" title="' + val.title + '"><img src="'+ val.images.hidpi +'" class="img-fluid" height="300"/></a></li>'
            )
        })
      }
      else {
        $('#dribbbleShots').append('<p>No shots yet!</p>');
      }
    }
});

// Reveal element on scroll
var scroll = window.requestAnimationFrame ||
             // IE Fallback
             function(callback){ window.setTimeout(callback, 1000/60)};
var elementsToShow = document.querySelectorAll('.show-on-scroll');

function loop() {

    Array.prototype.forEach.call(elementsToShow, function(element){
      if (isElementInViewport(element)) {
        element.classList.add('is-visible');
      }
    });

    scroll(loop);
}

// Call the loop for the first time
loop();

// Helper function from: http://stackoverflow.com/a/7557433/274826
function isElementInViewport(el) {
  // special bonus for those using jQuery
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }
  var rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0
      && rect.bottom >= 0)
    ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );
}