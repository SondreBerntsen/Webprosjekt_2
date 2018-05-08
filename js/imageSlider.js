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

  sliderImages("winter", "summerBtn", "springBtn", "fallBtn");
}
else if ( currentSeason == "Spring" ){
  sliderImages("spring", "summerBtn", "winterBtn", "fallBtn");
}
else if ( currentSeason == "Summer" ){
  sliderImages("summer", "springBtn", "winterBtn", "fallBtn");
}
else{
  sliderImages("fall", "summerBtn", "winterBtn", "springBtn");
}
function sliderImages(season, seasonBtn1, seasonBtn2, seasonBtn3 ) {

  $("#slide1").attr("src","../images/seasonal_slider_images/seasonal_"+season+"1.png");
  $("#slide2").attr("src","../images/seasonal_slider_images/seasonal_"+season+"2.png");
  $("#slide3").attr("src","../images/seasonal_slider_images/seasonal_"+season+"3.png");

  $('#'+season+"Btn").attr("class"," btn btn-info");
  $('#'+seasonBtn1+', #'+seasonBtn2+', #'+seasonBtn3).attr("class", "btn btn-primary");
}

$("#winterBtn").click(function(){
    sliderImages("winter", "summerBtn", "springBtn", "fallBtn");
});
$("#springBtn").click(function(){
  sliderImages("spring", "summerBtn", "winterBtn", "fallBtn");
});
$("#summerBtn").click(function(){
  sliderImages("summer", "springBtn", "winterBtn", "fallBtn");
});
$("#fallBtn").click(function(){
  sliderImages("fall", "summerBtn", "winterBtn", "springBtn");
});