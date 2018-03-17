$(document).ready(function(){
    var selected = [];
    var filterItems = $('.filter_item');
    $('.category_item').click(function(){
        var checkboxes = $('[name=filterData]');
        var selected = [];
        filterItems.addClass('hide');

        for (var i=0; i<checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                selected.push(checkboxes[i].value);
            }
        }
        for (var j=0; j<selected.length; j++) {
            $('.' + selected[j]).removeClass('hide');
            }
        if(selected.length == 0){
                filterItems.removeClass('hide');
        }

    });

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
    var season = ["Winter", "Winter", "Winter", "Spring", "Spring", "Spring", "Summer", "Summer", "Summer", "Fall", "Fall", "Fall", "Winter"];

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
      $("#slide1").attr("src","./images/seasonal_slider_images/seasonal_vinter1.png");
      $("#slide2").attr("src","./images/seasonal_slider_images/seasonal_vinter2.png");
      $("#slide3").attr("src","./images/seasonal_slider_images/seasonal_vinter3.png");
      $('#winterBtn').attr("class","btn-info");
	    $("#springBtn, #summerBtn, #fallBtn").attr("class","btn-primary");
    }
    function springImages() {
      $("#slide1").attr("src","./images/seasonal_slider_images/seasonal_spring1.jpg");
      $("#slide2").attr("src","./images/seasonal_slider_images/seasonal_spring2.jpg");
      $("#slide3").attr("src","./images/seasonal_slider_images/seasonal_spring3.jpg");
      $('#springBtn').attr("class","btn-info");
	    $("#summerBtn, #winterBtn, #fallBtn").attr("class","btn-primary");
    }
    function summerImages() {
      $("#slide1").attr("src","./images/seasonal_slider_images/seasonal_summer1.jpeg");
      $("#slide2").attr("src","./images/seasonal_slider_images/seasonal_summer2.jpeg");
      $("#slide3").attr("src","./images/seasonal_slider_images/seasonal_summer3.jpeg");
      $('#summerBtn').attr("class","btn-info");
      $("#springBtn, #winterBtn, #fallBtn").attr("class","btn-primary");
    }
    function fallImages() {
      $("#slide1").attr("src","./images/seasonal_slider_images/seasonal_fall1.jpg");
      $("#slide2").attr("src","./images/seasonal_slider_images/seasonal_fall2.jpg");
      $("#slide3").attr("src","./images/seasonal_slider_images/seasonal_fall3.jpg");
      $('#fallBtn').attr("class","btn-info");
      $("#summerBtn, #winterBtn, #summerBtn").attr("class","btn-primary");
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
    //Calling function to initialize map
    initMap();
    //initializing maps
    function initMap() {
      var finsandvika = {lat: 61.015699, lng: 10.518729};
      var map = new google.maps.Map(document.getElementById('mapFinsanvika'), {
        zoom: 12,
        center: finsandvika,
        //mapTypeId: google.maps.MapTypeId.TERRAIN
      });
      var marker = new google.maps.Marker({
        position: finsandvika,
        map: map
      });
    }

});
