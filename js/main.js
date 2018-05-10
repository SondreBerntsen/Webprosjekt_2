function loadContent(x){
    var ourData = hyttegrender;
    $('#imgHeader').attr("src", "../"+ourData[x].imgHeader)
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
        templateElement.attr('src', '../images/icons/'+ourData[x].icons[i]+'.png');
        templateElement.attr('title', ourData[x].icons[i]);

        $('#icons').append(templateElement);
    }
    initMapProperties(ourData[x]);

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
    }, 1000);
});
function loadNavItems(){
  $('#templates').load('/webprosjekt_2/includeFiles/templates.html'); //This is pointless as they can't be cloned from there anyway. I think the templates must be file separated and loaded to their respective target containers once the page loads. Then again it works on propertyArea, what the fuck.
  var ourData = hyttegrender;
  var areaData = omrader;

  for(i = 0; i < Object.keys(areaData).length; i++){
    var temp = Object.keys(areaData)[i];
    var area = areaData[temp].title.toLowerCase();
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

function pullCardData(){ //needs parameter to be used for both index and area pages

    var ourData = hyttegrender;

    for(i = 0; i < Object.keys(ourData).length; i++){
      temp = Object.keys(ourData)[i];

      var templateElement = $('#cardTemplate').clone();
      templateElement.removeAttr("id");
      templateElement.addClass(ourData[temp].area);
      templateElement.addClass(ourData[temp].icons.join(" "));
      templateElement.find("a").attr('href', ourData[temp].area.toLowerCase()+'/'+ourData[temp].name);
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
