//const base = '/sondrber/webprosjekt_2/'; //Deployed
const base = '/webprosjekt_2/'; //Localhost

// Gets the relevant property area from checkURL.js and loads the correct data from the property area's JSON data.
function loadContentPA(propertyArea){

    var PAData = hyttegrender;

    $('#imgHeader').attr("src", base+PAData[propertyArea].imgHeader)
    $('#headerTitle').html(PAData[propertyArea].title);
    $('#hgoneliner').html(PAData[propertyArea].oneliner);

    for(i = 0; i < PAData[propertyArea].description.length; i++){
        var templateElement = $('#pTemplate').clone();

        templateElement.removeAttr("id");
        templateElement.html(PAData[propertyArea].description[i]);

        $('#hgdescription').append(templateElement);
    }

    for(i = 0; i < PAData[propertyArea].icons.length; i++){
        var templateElement = $('#iconTemplate').clone();

        templateElement.removeAttr("id");
        templateElement.attr('src', base +'images/icons/'+PAData[propertyArea].icons[i]+'.png');
        templateElement.attr('title', PAData[propertyArea].icons[i]);

        $('#icons').append(templateElement);
    }
    // calls the initMapPA function
    initMapPA(PAData[propertyArea]);
    // calls the tableCreate function
    tableCreate(PAData[propertyArea]);

    for(i = 0; i < PAData[propertyArea].information.propertyInfo.length; i++){
      var templateElement = $('#pTemplate').clone();

      templateElement.removeAttr('id');
      templateElement.html(PAData[propertyArea].information.propertyInfo[i]);

      $('#propertyInfo').append(templateElement);
    }


    for(i = 0; i < PAData[propertyArea].information.arrival.length; i++){
      var templateElement = $('#pTemplate').clone();

      templateElement.removeAttr('id');
      templateElement.html(PAData[propertyArea].information.arrival[i]);

      $('#arrival').append(templateElement);
    }

    for(i = 0; i < PAData[propertyArea].information.facts.length; i++){
      var templateElement = $('#pTemplate').clone();

      templateElement.removeAttr('id');
      templateElement.html(PAData[propertyArea].information.facts[i]);

      $('#facts').append(templateElement);
    }

    for(i = 0; i < PAData[propertyArea].information.priceInfo.length; i++){
      var templateElement = $('#pTemplate').clone();

      templateElement.removeAttr('id');
      templateElement.html(PAData[propertyArea].information.priceInfo[i]);

      $('#priceInfo').append(templateElement);
    }

    for(i = 0; i < PAData[propertyArea].information.contactInfo.length; i++){
        var templateElement = $('#contactTemplate').clone();

        templateElement.removeAttr('id');
        templateElement.find('.contactName').html(PAData[propertyArea].information.contactInfo[i].name);
        templateElement.find('.fa-phone').after(PAData[propertyArea].information.contactInfo[i].tlf);
        templateElement.find('.fa-envelope').after(PAData[propertyArea].information.contactInfo[i].email);

        $('#contactInfo').append(templateElement.html());
    }
}
// map for property areas
function initMapPA(PArea){

  var map = new google.maps.Map(document.getElementById('mapPA'), {
    center: PArea.mapPosition,
    zoom: 16,
    mapTypeId: 'satellite'
  });

  for(i = 0; i < PArea.properties.length; i++) {
    number = PArea.properties[i].propertyNumber;
    outlines = PArea.properties[i].outline;
    price = PArea.properties[i].price;
    availability = PArea.properties[i].availability;
    perimiter = PArea.properties[i].perimiter;
    // gives the property area color based on their availability
    switch(availability){
      case "available":
        color = "#5B965B";
        break;
      case "sold":
        color = "#C84646";
        break;
      case "reserved":
        color = "#FFA500";
    }
    // Construct the polygon.
    plot = new google.maps.Polygon({
      paths: outlines,
      strokeColor: '#000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: color,
      fillOpacity: 0.7,
      number: number,
      availability: availability,
      price: price,
      perimiter: perimiter
    });

    plot.setMap(map);

    plot.addListener('click', infoWindowPA);
    var  infoWindow = new google.maps.InfoWindow;
    plot.addListener('mouseover', mouseover);
    plot.addListener('mouseout', mouseout);

  }

    /*
      We are aware that having functions within functions is bad practise,
      yet we did not find another way to transfer the right data from coordinates
      outside of the map function. There are some restrictions to the Google API
      when it comes to using polygons.
    */

    function infoWindowPA(event) {
      for(i = 0; i < PArea.properties.length; i++){
          // if the property area is not available..
          if (this.availability !== "available"){
              // the infoWindow will show its property area number and say it is not available.
              var contentString = '<strong>Tomt nr. '+this.number+' er utilgjengelig</strong>';
          // if it is available..
          } else {
            // the infoWindow will show additional info about the property area.
            var contentString = '<strong>Tomt nr.: '+ this.number+ '</strong><br>Pris: '+this.price+ ' kr <br>Areal: '+this.perimiter+' kvm';
          }

        /*
         uncomment the three lines benath this to log
         the polygon you have clicked
        */
           /*
             outlines = this.getPath();
             var xy = outlines.getAt(i);
             console.log(xy.lat());
           */
      }

      infoWindow.setContent(contentString);
      infoWindow.setPosition(event.latLng);
      infoWindow.open(map);
    }
    // opacity of color changes on the event of mouseover
    function mouseover(event) {
      for(i = 0; i < PArea.properties.length; i++){
        this.setOptions({fillOpacity: 1});
      }
    }
  // changes the color back to what it was before on the event of mouseout
  function mouseout(event) {
    for(i = 0; i < PArea.properties.length; i++){
      switch(this.availability){
        case "available":
          // color and its opacity for the available property areas
          this.setOptions({fillColor: "#5B965B"});
          this.setOptions({fillOpacity: 0.7});
          break;
        case "sold":
          // color and its opacity for the sold property areas
          this.setOptions({fillColor: "#C84646"});
          this.setOptions({fillOpacity: 0.7});
          break;
        case "reserved":
          // color and its opacity for the reserved property areas
          this.setOptions({fillColor: "#FFA500"});
          this.setOptions({fillOpacity: 0.7});
      }
    }
  }
}

function loadContentArea(areaName){
  var areaData = omrader;
  $('#areaHeaderImg').attr("src", areaData[areaName].imgHeader)
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

// creates the table based on the property area information
function tableCreate(PAarea){
  tbl= document.getElementById("propertyTable");
  props = PAarea.properties;

  for(i = 0; i < props.length; i++){
    // we only want the information about the available property areas
    if (props[i].availability == "available"){
      // creates a new row for each available property area
      var row = tbl.insertRow(-1);
      // inserts four cells for each row
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      // first cell contains the property number
      cell1.appendChild(document.createTextNode(props[i].propertyNumber));
      // second cell contains the perimiter
      cell2.appendChild(document.createTextNode(props[i].perimiter));
      // third cell contains the price
      cell3.appendChild(document.createTextNode(props[i].price));
      // fourth cell contains a button
      var templateElement = $('<button class="">Interessert</button>');
      templateElement.attr('id', PAarea.name +" property "+ props[i].propertyNumber);
      templateElement.addClass("btn propertyBtn");
      templateElement.appendTo(cell4);
    }
  }
}

// scrolls user to #tomteInformasjon when the link #scrollTo is clicked
function scrollToAnchor(){
  $('html, body').animate({
       scrollTop: $("#anchor").offset().top
   }, '2000');
}

// Loads dropdown elements
function loadNavItems(){

  var PAData = hyttegrender;
  var areaData = omrader;

  for(i = 0; i < Object.keys(areaData).length; i++){
    var temp = Object.keys(areaData)[i];
    var area = areaData[temp].href;
    var templateElement = $('#navAreaTemplate').clone();

    templateElement.removeAttr("id");
    templateElement.find('a').attr('href', base + area);
    templateElement.find('a').html(areaData[temp].title);

    for(j = 0; j < areaData[temp].propertyAreas.length; j++){
      var propArea = areaData[temp].propertyAreas[j].toLowerCase();
      var templateSubElement = $('#navPATemplate').clone();

      templateSubElement.removeAttr("id");
      templateSubElement.find('a').attr('href', base + area + '/' +propArea);
      templateSubElement.find('a').html(areaData[temp].mapData.markers[j].propertyAreaName);
      templateElement.find('ul').append(templateSubElement);
    }
    $('#navElementContainer').append(templateElement);
  }
}

// Gets the relevant area name and outputs the property areas within that area. Function is called as many times as needed, depending on how many property areas exist. Called from checkURL.js
function pullCardData(pArea, home){

  var PAData = hyttegrender;

  // Template elements for cards are cloned and appended.
  var templateElement = $('#cardTemplate').clone();
  templateElement.removeAttr("id");
  templateElement.find("a").attr('href', PAData[pArea].area.toLowerCase()+'/'+PAData[pArea].name);
  templateElement.find("img").attr('src', 'images/thumbnailsFilter/'+pArea+'.jpeg');
  templateElement.find(".availabilityText").html(PAData[pArea].cardInfo.availability);
  templateElement.find(".price").html(PAData[pArea].cardInfo.price);
  templateElement.find(".card-title").html(PAData[pArea].title);
  templateElement.find(".card-text").html(PAData[pArea].oneliner);

  // If this is the home page, additional information is appended that would be reduntant on the area page.
  if(home == true){
    templateElement.find(".areaName").html(PAData[pArea].area);
    templateElement.addClass(PAData[pArea].area);
    templateElement.addClass(PAData[pArea].icons.join(" "));
  }
  $('#cardContainer').append(templateElement);
  filterItems = $('.filter_item');
}
