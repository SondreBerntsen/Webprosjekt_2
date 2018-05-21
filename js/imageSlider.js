//The carousel function is inspired by https://stackoverflow.com/questions/40142693/slideshow-not-working
var myIndex = 0;
carousel();
//Creates an automatic slideshow
function carousel() {
  var i;
  var slides = $(".mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  myIndex++;
  if (myIndex > slides.length) {
    myIndex = 1
  }
  slides[myIndex - 1].style.display = "block";
  setTimeout(carousel, 3000); // Change image every 3 seconds
}
//An array containing the seasons of every month
var season = ["Winter", "Winter", "Spring", "Spring", "Spring", "Summer", "Summer", "Summer", "Fall", "Fall", "Fall", "Winter"];

var d = new Date();

var currentSeason = season[d.getMonth()];
//Depending on the current season sliderImages function is called with different parameters
if (currentSeason == "Winter") {
  sliderImages("winter", "summerBtn", "springBtn", "fallBtn");
} else if (currentSeason == "Spring") {
  sliderImages("spring", "summerBtn", "winterBtn", "fallBtn");
} else if (currentSeason == "Summer") {
  sliderImages("summer", "springBtn", "winterBtn", "fallBtn");
} else {
  sliderImages("fall", "summerBtn", "winterBtn", "springBtn");
}
//Function that displays the correct images for the selected season
function sliderImages(season, seasonBtn1, seasonBtn2, seasonBtn3) {

  $("#slide1").attr("src", base + "images/seasonal_slider_images/seasonal_" + season + "1.png");
  $("#slide2").attr("src", base + "images/seasonal_slider_images/seasonal_" + season + "2.png");
  $("#slide3").attr("src", base + "images/seasonal_slider_images/seasonal_" + season + "3.png");
  //The current season button gets his own style
  $('#' + season + "Btn").attr("class", " btn btn-info");
  //The other buttons gets another style
  $('#' + seasonBtn1 + ', #' + seasonBtn2 + ', #' + seasonBtn3).attr("class", "btn btn-primary");
}
/*Click events for the different season buttons that calls the sliderImages Function
 *with the corresponding parameters
 */
$("#winterBtn").click(function() {
  sliderImages("winter", "summerBtn", "springBtn", "fallBtn");
});
$("#springBtn").click(function() {
  sliderImages("spring", "summerBtn", "winterBtn", "fallBtn");
});
$("#summerBtn").click(function() {
  sliderImages("summer", "springBtn", "winterBtn", "fallBtn");
});
$("#fallBtn").click(function() {
  sliderImages("fall", "summerBtn", "winterBtn", "springBtn");
});