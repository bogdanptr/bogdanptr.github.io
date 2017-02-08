// Main js file

$(document).ready(function () {

  $(".menu__toggle").click(function() {
    $(this).toggleClass("menu__toggle--active");
    $(".extended-nav").toggleClass("extended-nav__active");
    $("body").toggleClass("extended-nav__full");
  });

});
