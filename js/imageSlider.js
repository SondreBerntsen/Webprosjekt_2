var myIndex = 0;
carousel();
function carousel() {
    var i;
    var x = $(".mySlides");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}
    x[myIndex-1].style.display = "block";
    setTimeout(carousel, 3000); // Change image every 3 seconds
}
var season = ["Winter", "Winter", "Spring", "Spring", "Spring", "Summer", "Summer", "Summer", "Fall", "Fall", "Fall", "Winter"];

var d = new Date();
var currentSeason = season[d.getMonth()];

if ( currentSeason == "Winter" ){
  winterImages();
}
else if ( currentSeason == "Spring" ){
  springImages();
}
else if ( currentSeason == "Summer" ){
  summerImages();
}
else{
  fallImages();
}
function winterImages() {
  $("#slide1").attr("src","../images/seasonal_slider_images/seasonal_winter1.png");
  $("#slide2").attr("src","../images/seasonal_slider_images/seasonal_winter2.png");
  $("#slide3").attr("src","../images/seasonal_slider_images/seasonal_winter3.png");
  $('#winterBtn').attr("class"," btn btn-info");
  $("#springBtn, #summerBtn, #fallBtn").attr("class"," btn btn-primary");
}
function springImages() {
  $("#slide1").attr("src","../images/seasonal_slider_images/seasonal_spring1.png");
  $("#slide2").attr("src","../images/seasonal_slider_images/seasonal_spring2.png");
  $("#slide3").attr("src","../images/seasonal_slider_images/seasonal_spring3.png");
  $('#springBtn').attr("class"," btn btn-info");
  $("#summerBtn, #winterBtn, #fallBtn").attr("class"," btn btn-primary");
}
function summerImages() {
  $("#slide1").attr("src","../images/seasonal_slider_images/seasonal_summer1.png");
  $("#slide2").attr("src","../images/seasonal_slider_images/seasonal_summer2.png");
  $("#slide3").attr("src","../images/seasonal_slider_images/seasonal_summer3.png");
  $('#summerBtn').attr("class","btn btn-info");
  $("#springBtn, #winterBtn, #fallBtn").attr("class","btn btn-primary");
}
function fallImages() {
  $("#slide1").attr("src","../images/seasonal_slider_images/seasonal_fall1.png");
  $("#slide2").attr("src","../images/seasonal_slider_images/seasonal_fall2.png");
  $("#slide3").attr("src","../images/seasonal_slider_images/seasonal_fall3.png");
  $('#fallBtn').attr("class","btn btn-info");
  $("#springBtn, #winterBtn, #summerBtn").attr("class","btn btn-primary");
}
$("#winterBtn").click(function(){
    winterImages();
});
$("#springBtn").click(function(){
  springImages();
});
$("#summerBtn").click(function(){
  summerImages();
});
$("#fallBtn").click(function(){
  fallImages();
});