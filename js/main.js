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
    }, 1000);
});
function loadNavItems(){
  var ourData = hyttegrender;
  var areaData = omrader;

  for(i = 0; i < ourData[x].description.length; i++){
    var templateElement = $('#navItemAreaTemplate').clone();

    templateElement.removeAttr("id");
    templateElement.find("a").attr('href', );


    $('#navElements').append(templateElement);
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
