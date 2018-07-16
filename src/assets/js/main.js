// Main js file

$(document).ready(function () {

  $(".work__section").click(function() {
    $(".work__section").removeClass("work__section--active");
    $(this).addClass("work__section--active");

    if($(this).hasClass("work__section--projects") ) {
      $(".work__block--article").parents("li").hide();
    } else {
      $(".work__block--article").parents("li").show();
    }

    if ($(this).hasClass("work__section--articles")) {
      $(".work__block--project").parents("li").hide();
    } else {
      $(".work__block--project").parents("li").show();
    }
  });
});
