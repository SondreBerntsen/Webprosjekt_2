$(document).ready(function(){
    var filterItems = $('.filter_item');
    $('.category_item').click(function(){
        var checkboxes = $('[name=filterData]');
        var selectedMisc = [];
        var selectedAreas = [];
        filterItems.addClass('hide');

        for (var i=0; i<checkboxes.length; i++) {
            if(checkboxes[i].checked){
                switch(checkboxes[i].value){
                        case 'ringsaker':
                            selectedAreas.push(checkboxes[i].value);
                            break;
                        case 'gudbrandsdalen':
                            selectedAreas.push(checkboxes[i].value);
                            break;
                        case 'valdres':
                            selectedAreas.push(checkboxes[i].value);
                            break;
                        case 'sør-trøndelag':
                            selectedAreas.push(checkboxes[i].value);
                            break;
                        default:
                            selectedMisc.push(checkboxes[i].value);
                    }
            }
        }//Nå skal verdien for områder ligge i egen array, mens misc ligger i en annen.
        if(selectedAreas.length > 0){
            filterItems.addClass('hideArea');
            for (var x=0; x<selectedAreas.length; x++){
                $('.'+selectedAreas[x]).removeClass('hideArea');
            }
        }
        for (var j=0; j<selectedMisc.length; j++) {
            $('.'+selectedMisc[j]).removeClass('hide');
        }
        if(selectedMisc.length == 0){
            filterItems.removeClass('hide');
        }
        if(selectedAreas.length == 0){
            filterItems.removeClass('hideArea');
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
      $("#slide1").attr("src","../images/seasonal_slider_images/edited/seasonal_winter1.png");
      $("#slide2").attr("src","../images/seasonal_slider_images/edited/seasonal_winter2.png");
      $("#slide3").attr("src","../images/seasonal_slider_images/edited/seasonal_winter3.png");
      $('#winterBtn').attr("class","btn-info");
	    $("#springBtn, #summerBtn, #fallBtn").attr("class","btn-primary");
    }
    function springImages() {
      $("#slide1").attr("src","../images/seasonal_slider_images/edited/seasonal_spring1.png");
      $("#slide2").attr("src","../images/seasonal_slider_images/edited/seasonal_spring2.png");
      $("#slide3").attr("src","../images/seasonal_slider_images/edited/seasonal_spring3.png");
      $('#springBtn').attr("class","btn-info");
	    $("#summerBtn, #winterBtn, #fallBtn").attr("class","btn-primary");
    }
    function summerImages() {
      $("#slide1").attr("src","../images/seasonal_slider_images/edited/seasonal_summer1.png");
      $("#slide2").attr("src","../images/seasonal_slider_images/edited/seasonal_summer2.png");
      $("#slide3").attr("src","../images/seasonal_slider_images/edited/seasonal_summer3.png");
      $('#summerBtn').attr("class","btn-info");
      $("#springBtn, #winterBtn, #fallBtn").attr("class","btn-primary");
    }
    function fallImages() {
      $("#slide1").attr("src","../images/seasonal_slider_images/edited/seasonal_fall1.png");
      $("#slide2").attr("src","../images/seasonal_slider_images/edited/seasonal_fall2.png");
      $("#slide3").attr("src","../images/seasonal_slider_images/edited/seasonal_fall3.png");
      $('#fallBtn').attr("class","btn-info");
      $("#springBtn, #winterBtn, #summerBtn").attr("class","btn-primary");
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
