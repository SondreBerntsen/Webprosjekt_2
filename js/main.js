var filterItems = "";
$(document).ready(function(){
    $('.category_item').click(function(){
        var checkboxes = $('[name=filterData]');
        var selectedMisc = [];
        var selectedAreas = [];
        filterItems.addClass('hide');
        $('.tagFilter').remove();

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
            for (var i=0; i<selectedAreas.length; i++){
                $('.'+selectedAreas[i]).removeClass('hideArea');
            }
        }
        for (var i=0; i<selectedMisc.length; i++) {
            $('.'+selectedMisc[i]).removeClass('hide');
        }
        if(selectedMisc.length == 0){
            filterItems.removeClass('hide');
        }
        if(selectedAreas.length == 0){
            filterItems.removeClass('hideArea');
        }
        var checkedBoxes = selectedAreas.concat(selectedMisc);
        for(var i=0; i<checkedBoxes.length; i++){
          $('#filterTags').append('<div class="tagFilter">'+checkedBoxes[i]+'</div>');
        }
    });
      $(".showCheckbox").on("click", function(e) {
           $(this).nextAll(".hideCheckbox").toggle('fast');
           var spanElement=e.target.firstElementChild;
            $(spanElement).toggleClass("fas fa-chevron-up",true);
            $(spanElement).toggleClass('fas fa-chevron-down',true);
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
      $("#slide1").attr("src","images/seasonal_slider_images/seasonal_winter1.png");
      $("#slide2").attr("src","images/seasonal_slider_images/seasonal_winter2.png");
      $("#slide3").attr("src","images/seasonal_slider_images/seasonal_winter3.png");
      $('#winterBtn').attr("class"," btn btn-info");
	    $("#springBtn, #summerBtn, #fallBtn").attr("class"," btn btn-primary");
    }
    function springImages() {
      $("#slide1").attr("src","images/seasonal_slider_images/seasonal_spring1.png");
      $("#slide2").attr("src","images/seasonal_slider_images/seasonal_spring2.png");
      $("#slide3").attr("src","images/seasonal_slider_images/seasonal_spring3.png");
      $('#springBtn').attr("class"," btn btn-info");
	    $("#summerBtn, #winterBtn, #fallBtn").attr("class"," btn btn-primary");
    }
    function summerImages() {
      $("#slide1").attr("src","images/seasonal_slider_images/seasonal_summer1.png");
      $("#slide2").attr("src","images/seasonal_slider_images/seasonal_summer2.png");
      $("#slide3").attr("src","images/seasonal_slider_images/seasonal_summer3.png");
      $('#summerBtn').attr("class","btn btn-info");
      $("#springBtn, #winterBtn, #fallBtn").attr("class","btn btn-primary");
    }
    function fallImages() {
      $("#slide1").attr("src","images/seasonal_slider_images/seasonal_fall1.png");
      $("#slide2").attr("src","images/seasonal_slider_images/seasonal_fall2.png");
      $("#slide3").attr("src","images/seasonal_slider_images/seasonal_fall3.png");
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
    //Calling function to initialize map
    //initMap();
    //initializing maps
    /*function initMap() {
      var finsandvika = {lat: 61.215699, lng: 10.518729};
      var lillehammer = {lat: 61.1734420545982, lng: 10.604606905279};
      var gala = {lat: 61.4953383074326, lng: 9.76728911774898};
      var galatoppen = {lat: 61.4894488500888, lng: 9.77770110446772};
      var hafjell = {lat: 61.257729, lng: 10.5032857999999};
      var haugsetra = {lat: 61.750702, lng: 9.58495978181156};
      var hjerkinnho = {lat: 62.2243612859522, lng: 10.518729};
      var hjerkinnlia = {lat: 62.2146969402496, lng: 9.56385840753171};
      var hundyrju = {lat: 62.0917610768937, lng: 9.19969217135008};
      var lavashaugne = {lat: 61.7183709623906, lng: 9.72657208808595};
      var ringebu = {lat: 61.6095576569589, lng: 10.0754232406616};
      var varden = {lat: 61.440287, lng: 10.087837};
      var skeikampen = {lat: 61.3505957, lng: 10.0887576999998};
      var tiurlia = {lat: 61.015699, lng: 9.74306563056643};
      var raudalen = {lat: 61.229504, lng: 8.82236799999998};
      var aaremsanden = {lat: 63.563, lng: 9.75400000000001};

      var map = new google.maps.Map(document.getElementById('mapFinsanvika'), {
        zoom: 9,
        center: finsandvika,
        //mapTypeId: google.maps.MapTypeId.TERRAIN
      });
      var marker = new google.maps.Marker({
        position: finsandvika,
        map: map
      });
    }*/
});


//Blabla skikkelig bra kommentering

function buttonClick(x){
    localStorage.setItem("hyttegrend", x);
}

function loadContent(x){
    console.log(x);
    var ourData = hyttegrender;
    $('#imgHeader').attr("src", ourData[x].imgHeader)
    $('#headerTitle').html(ourData[x].title);
    $('#hgoneliner').html(ourData[x].oneliner);

    for(i = 0; i < ourData[x].description.length; i++){
        var templateElement = $('#pTemplate').clone();

        templateElement.removeAttr("id");
        templateElement.html(ourData[x].description[i]);

        $('#hgdescription').append(templateElement);
    }

    for(i = 0; i < ourData[x].icons.length; i++){
        var templateElement = $('#iconTemplate').clone();

        templateElement.removeAttr("id");
        templateElement.attr('src', 'images/icons/'+ourData[x].icons[i]+'.png');
        templateElement.attr('title', ourData[x].icons[i]);

        $('#icons').append(templateElement);
    }

    initMapProperties();

    function initMapProperties(){
      var map = new google.maps.Map(document.getElementById('mapPropertyArea'), {
        zoom: 16,
        center: ourData[x].mapData.position,
        mapTypeId: 'hybrid'
      });
      console.log(ourData[x].mapData.markers.length);
      for (i = 0; i < ourData[x].mapData.markers.length; i++){
        var markerPosition = ourData[x].mapData.markers[i].position;
        var labelNumber = ourData[x].mapData.markers[i].propertyNumber;
        var marker = new google.maps.Marker({
          position: markerPosition,
          label: labelNumber,
          map: map
        });
      }
    }

    for(i = 0; i < ourData[x].information.propertyInfo.length; i++){
      var templateElement = $('#pTemplate').clone();

      templateElement.removeAttr('id');
      templateElement.html(ourData[x].information.propertyInfo[i]);

      $('#propertyInfo').append(templateElement);
    }


    for(i = 0; i < ourData[x].information.arrival.length; i++){
      var templateElement = $('#pTemplate').clone();

      templateElement.removeAttr('id');
      templateElement.html(ourData[x].information.arrival[i]);

      $('#arrival').append(templateElement);
    }

    for(i = 0; i < ourData[x].information.facts.length; i++){
      var templateElement = $('#pTemplate').clone();

      templateElement.removeAttr('id');
      templateElement.html(ourData[x].information.facts[i]);

      $('#facts').append(templateElement);
    }

    for(i = 0; i < ourData[x].information.priceInfo.length; i++){
      var templateElement = $('#pTemplate').clone();

      templateElement.removeAttr('id');
      templateElement.html(ourData[x].information.priceInfo[i]);

      $('#priceInfo').append(templateElement);
    }

    for(i = 0; i < ourData[x].information.contactInfo.length; i++){
        var templateElement = $('#contactTemplate').clone();

        templateElement.removeAttr('id');
        templateElement.find('.contactName').html(ourData[x].information.contactInfo[i].name);
        templateElement.find('.fa-phone').after(ourData[x].information.contactInfo[i].tlf);
        templateElement.find('.fa-envelope').after(ourData[x].information.contactInfo[i].email);

        $('#contactInfo').append(templateElement.html());
    }
}
$("#scrollToTable").click(function() {
    $('html, body').animate({
        scrollTop: $("#propertyTable").offset().top
    }, 2000);
});

function pullCardData(){ //needs parameter to be used for both index and area pages
    /*
    if(page == index){

    }else if(page == area){

    }
    */
    var ourData = hyttegrender;

    for(i = 0; i < Object.keys(ourData).length; i++){
      temp = Object.keys(ourData)[i];

      var templateElement = $('#cardTemplate').clone();
      templateElement.removeAttr("id");
      templateElement.addClass(ourData[temp].area);
      templateElement.addClass(ourData[temp].icons.join(" "));
      templateElement.find("a").attr('onclick', 'buttonClick("'+ourData[temp].name+'");');
      templateElement.find("img").attr('src', 'images/thumbnailsFilter/'+temp+'.jpeg');
      templateElement.find(".availabilityText").html(ourData[temp].cardInfo.availability);
      templateElement.find(".price").html(ourData[temp].cardInfo.price);
      templateElement.find(".card-title").html(ourData[temp].title);
      templateElement.find(".areaName").html(ourData[temp].area);
      templateElement.find(".card-text").html(ourData[temp].oneliner);

      $('#cardContainer').append(templateElement);
      filterItems = $('.filter_item');
    }
}
