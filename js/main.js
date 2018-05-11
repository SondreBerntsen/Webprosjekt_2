function loadContent(x){
    var PAData = hyttegrender;
    $('#imgHeader').attr("src", "../"+PAData[x].imgHeader)
    $('#headerTitle').html(PAData[x].title);
    $('#hgoneliner').html(PAData[x].oneliner);

    for(i = 0; i < PAData[x].description.length; i++){
        var templateElement = $('#pTemplate').clone();

        templateElement.removeAttr("id");
        templateElement.html(PAData[x].description[i]);

        $('#hgdescription').append(templateElement);
    }

    for(i = 0; i < PAData[x].icons.length; i++){
        var templateElement = $('#iconTemplate').clone();

        templateElement.removeAttr("id");
        templateElement.attr('src', '../images/icons/'+PAData[x].icons[i]+'.png');
        templateElement.attr('title', PAData[x].icons[i]);

        $('#icons').append(templateElement);
    }
    initMapProperties(PAData[x]);

    for(i = 0; i < PAData[x].information.propertyInfo.length; i++){
      var templateElement = $('#pTemplate').clone();

      templateElement.removeAttr('id');
      templateElement.html(PAData[x].information.propertyInfo[i]);

      $('#propertyInfo').append(templateElement);
    }


    for(i = 0; i < PAData[x].information.arrival.length; i++){
      var templateElement = $('#pTemplate').clone();

      templateElement.removeAttr('id');
      templateElement.html(PAData[x].information.arrival[i]);

      $('#arrival').append(templateElement);
    }

    for(i = 0; i < PAData[x].information.facts.length; i++){
      var templateElement = $('#pTemplate').clone();

      templateElement.removeAttr('id');
      templateElement.html(PAData[x].information.facts[i]);

      $('#facts').append(templateElement);
    }

    for(i = 0; i < PAData[x].information.priceInfo.length; i++){
      var templateElement = $('#pTemplate').clone();

      templateElement.removeAttr('id');
      templateElement.html(PAData[x].information.priceInfo[i]);

      $('#priceInfo').append(templateElement);
    }

    for(i = 0; i < PAData[x].information.contactInfo.length; i++){
        var templateElement = $('#contactTemplate').clone();

        templateElement.removeAttr('id');
        templateElement.find('.contactName').html(PAData[x].information.contactInfo[i].name);
        templateElement.find('.fa-phone').after(PAData[x].information.contactInfo[i].tlf);
        templateElement.find('.fa-envelope').after(PAData[x].information.contactInfo[i].email);

        $('#contactInfo').append(templateElement.html());
    }
}
function loadContentArea(areaName){
  var areaData = omrader;
  $('#headingArea').html(areaData[areaName].title);
  $('#areatext').html(areaData[areaName].information);
  initMapArea(areaData[areaName]);
}
function initMapArea(areaData){

  var map = new google.maps.Map(document.getElementById('mapArea'), {
    center: areaData.mapData.position,
    zoom: 8,
    mapTypeId: 'hybrid'
  });

  for (i = 0; i < areaData.mapData.markers.length; i++){
    var markerPosition = areaData.mapData.markers[i].position;
    //console.log(markerPosition);
    var label= areaData.mapData.markers[i].propertyAreaName;
    var marker = new google.maps.Marker({
      position: markerPosition,
      title: label,
      map: map
    });
    /*The code for getting infowindows is inspired by:
    *https://stackoverflow.com/questions/11106671/google-maps-api-multiple-markers-with-infowindows
    */
    var content = label;
    var infowindow = new google.maps.InfoWindow()
    google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){
        return function() {
            infowindow.setContent(content);
            infowindow.open(map,marker);
        };
    })(marker,content,infowindow));

  }


}


function scrollToTable(){
  $('html, body').animate({
       scrollTop: $("#tomtInformasjon").offset().top
   }, '2000');
}
function loadNavItems(){
  //$('#templates').load('/webprosjekt_2/includeFiles/templates.html'); //This is pointless as they can't be cloned from there anyway. I think the templates must be file separated and loaded to their respective target containers once the page loads. Then again it works on propertyArea, what the fuck.
  var PAData = hyttegrender;
  var areaData = omrader;

  for(i = 0; i < Object.keys(areaData).length; i++){
    var temp = Object.keys(areaData)[i];
    var area = areaData[temp].href;
    var templateElement = $('#navAreaTemplate').clone();

    templateElement.removeAttr("id");
    templateElement.find('a').attr('href', '/webprosjekt_2/'+area);
    templateElement.find('a').html(areaData[temp].title);

    for(j = 0; j < areaData[temp].propertyAreas.length; j++){
      var propArea = areaData[temp].propertyAreas[j].toLowerCase();
      var templateSubElement = $('#navPATemplate').clone();

      templateSubElement.removeAttr("id");
      templateSubElement.find('a').attr('href', '/webprosjekt_2/'+area+'/'+propArea);
      templateSubElement.find('a').html(areaData[temp].mapData.markers[j].propertyAreaName);
      templateElement.find('ul').append(templateSubElement);
    }
    $('#navElementContainer').append(templateElement);
  }
}

function initMapProperties(PA){
  var map = new google.maps.Map(document.getElementById('mapPropertyArea'), {
    center: PA.mapData.position,
    zoom: 16,
    mapTypeId: 'hybrid'
  });

  for (i = 0; i < PA.mapData.markers.length; i++){
    var markerPosition = PA.mapData.markers[i].position;
    var labelNumber = PA.mapData.markers[i].propertyNumber;
    var marker = new google.maps.Marker({
      position: markerPosition,
      label: labelNumber,
      map: map
    });
  }
}

function pullCardData(pArea){ //needs parameter to be used for both index and area pages

  var PAData = hyttegrender;

  var templateElement = $('#cardTemplate').clone();
  templateElement.removeAttr("id");
  templateElement.addClass(PAData[pArea].area);
  templateElement.addClass(PAData[pArea].icons.join(" "));
  templateElement.find("a").attr('href', PAData[pArea].area.toLowerCase()+'/'+PAData[pArea].name);
  templateElement.find("img").attr('src', 'images/thumbnailsFilter/'+pArea+'.jpeg');
  templateElement.find(".availabilityText").html(PAData[pArea].cardInfo.availability);
  templateElement.find(".price").html(PAData[pArea].cardInfo.price);
  templateElement.find(".card-title").html(PAData[pArea].title);
  templateElement.find(".areaName").html(PAData[pArea].area);
  templateElement.find(".card-text").html(PAData[pArea].oneliner);

  $('#cardContainer').append(templateElement);
  filterItems = $('.filter_item');
}
