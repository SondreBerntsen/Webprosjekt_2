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
      $("#slide1").attr("src","images/seasonal_slider_images/seasonal_vinter1.png");
      $("#slide2").attr("src","images/seasonal_slider_images/seasonal_vinter2.png");
      $("#slide3").attr("src","images/seasonal_slider_images/seasonal_vinter3.png");
      $('#winterBtn').attr("class","btn-info");
	    $("#springBtn, #summerBtn, #fallBtn").attr("class","btn-primary");
    }
    function springImages() {
      $("#slide1").attr("src","images/seasonal_slider_images/seasonal_spring1.jpg");
      $("#slide2").attr("src","images/seasonal_slider_images/seasonal_spring2.jpg");
      $("#slide3").attr("src","images/seasonal_slider_images/seasonal_spring3.jpg");
      $('#springBtn').attr("class","btn-info");
	    $("#summerBtn, #winterBtn, #fallBtn").attr("class","btn-primary");
    }
    function summerImages() {
      $("#slide1").attr("src","images/seasonal_slider_images/seasonal_summer1.jpeg");
      $("#slide2").attr("src","images/seasonal_slider_images/seasonal_summer2.jpeg");
      $("#slide3").attr("src","images/seasonal_slider_images/seasonal_summer3.jpeg");
      $('#summerBtn').attr("class","btn-info");
      $("#springBtn, #winterBtn, #fallBtn").attr("class","btn-primary");
    }
    function fallImages() {
      $("#slide1").attr("src","images/seasonal_slider_images/seasonal_fall1.jpg");
      $("#slide2").attr("src","images/seasonal_slider_images/seasonal_fall2.jpg");
      $("#slide3").attr("src","images/seasonal_slider_images/seasonal_fall3.jpg");
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


//Blabla skikkelig bra kommentering

function buttonClick(x){
    localStorage.setItem("hyttegrend", x);
}

function loadContent(x){
    console.log(x);
    var ourData = hyttegrender;
    //console.log(hyttegrender);
    //$('#imgHeader').attr("src", ourData[x].imgHeader)
    $('#hgtitle').html(ourData[x].title);
    $('#hgoneliner').html(ourData[x].oneliner);
    $('#hgdescription').html("<article id='dArticle'></article>");

    for(i = 0; i < ourData[x].description.length; i++){
        $('#dArticle').append("<p>"+ourData[x].description[i]+"</p>");
    }

    for(i = 0; i < ourData[x].icons.length; i++){
        $('#icons').append("<img src='images/icons/"+ourData[x].icons[i]+".png' class='icon'>");
    }

    for(i = 0; i < ourData[x].information.arrival.length; i++){
        $('#arrival').append("<p>"+ourData[x].information.arrival[i]+"</p>");
    }

    for(i = 0; i < ourData[x].information.facts.length; i++){
        $('#facts').append("<p>"+ourData[x].information.facts[i]+"</p>");
    }

    for(i = 0; i < ourData[x].information.priceInfo.length; i++){
        $('#priceInfo').append("<p>"+ourData[x].information.priceInfo[i]+"</p>");
    }
    
    for(i = 0; i < ourData[x].information.contactInfo.length; i++){
        console.log(ourData[x].information.contactInfo[i]);
        $('#contactInfo').append("<p>"+ ourData[x].information.contactInfo[i].name+"</p>");
        $('#contactInfo').append("<p><span id='tlf'><i class='fas fa-phone'></i>"+ourData[x].information.contactInfo[i].tlf+"</span></p>");
        $('#contactInfo').append ("<p><span id='email'><i class='fas fa-envelope'></i>"+ourData[x].information.contactInfo[i].email+"</span></p>");
        
    }
}
