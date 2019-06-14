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


// Fluid typo
// var textSpans = document.querySelectorAll('.project__details--title > span');

// for( var i=0; i<textSpans.length; i++ ){

//  while( textSpans[i].offsetWidth > parseInt(window.getComputedStyle(textSpans[i].parentNode).width)  ){
//    textSpans[i].style.fontSize = parseInt(window.getComputedStyle(textSpans[i]).fontSize) - 1 +"px";
//  }
  
// }