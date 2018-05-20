//const base = '/sondrber/webprosjekt_2/'; //Deployed
const base = '/webprosjekt_2/'; //Localhost

// Gets the relevant property area from checkURL.js and loads the correct data from the property area's JSON data.
function loadContentPA(propertyArea){

    //Stores the JSON data for the relevant property area as variable PAData
    var PAData = hyttegrender[propertyArea];

    // Populates header data
    $('#imgHeader').attr("src", base + PAData.imgHeader);
    $('#headerTitle').html(PAData.title);
    $('#hgoneliner').html(PAData.oneliner);
    $('#contactTempID').attr("id", "interest " + PAData.name + " general");

    // Populates and appends paragraph tags to the description section for every description element in the JSON file
    for(i = 0; i < PAData.description.length; i++){
        var templateElement = $('#pTemplate').clone();

        templateElement.removeAttr("id");
        templateElement.html(PAData.description[i]);

        $('#hgdescription').append(templateElement);
    }

    // Appends icons to the icons section for each icon name in the JSON file
    for(i = 0; i < PAData.icons.length; i++){
        var templateElement = $('#iconTemplate').clone();

        templateElement.removeAttr("id");
        templateElement.attr('src', base +'images/icons/'+PAData.icons[i]+'.png');
        templateElement.attr('title', PAData.icons[i]);

        $('#icons').append(templateElement);
    }

    // calls the initMapPA function
    initMapPA(PAData);
    // calls the tableCreate function
    tableCreate(PAData);

    // Populates and appends paragraph tags to the property information section for each propertyInfo element in the JSON file
    for(i = 0; i < PAData.information.propertyInfo.length; i++){
      var templateElement = $('#pTemplate').clone();

      templateElement.removeAttr('id');
      templateElement.html(PAData.information.propertyInfo[i]);

      $('#propertyInfo').append(templateElement);
    }

    // Populates and appends paragraph tags to the arrival information section for each arrival element in the JSON file
    for(i = 0; i < PAData.information.arrival.length; i++){
      var templateElement = $('#pTemplate').clone();

      templateElement.removeAttr('id');
      templateElement.html(PAData.information.arrival[i]);

      $('#arrival').append(templateElement);
    }
    // Populates and appends paragraph tags to the facts section for each facts element in the JSON file
    for(i = 0; i < PAData.information.facts.length; i++){
      var templateElement = $('#pTemplate').clone();

      templateElement.removeAttr('id');
      templateElement.html(PAData.information.facts[i]);

      $('#facts').append(templateElement);
    }

    // Populates and appends paragraph tags to the price information section for each priceInfo element in the JSON file
    for(i = 0; i < PAData.information.priceInfo.length; i++){
      var templateElement = $('#pTemplate').clone();

      templateElement.removeAttr('id');
      templateElement.html(PAData.information.priceInfo[i]);

      $('#priceInfo').append(templateElement);
    }

    // Populates and appends contact templates to the contact information section for each contactInfo element in the JSON file
    for(i = 0; i < PAData.information.contactInfo.length; i++){
        var templateElement = $('#contactTemplate').clone();

        templateElement.removeAttr('id');
        templateElement.find('.contactName').html(PAData.information.contactInfo[i].name);
        templateElement.find('.fa-phone').after(PAData.information.contactInfo[i].tlf);
        templateElement.find('.fa-envelope').after(PAData.information.contactInfo[i].email);

        $('#contactInfo').append(templateElement.html());
    }
} // End function loadContentPA

// Map for property areas
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
} // End function initMapPA


// Gets the relevant area from checkURL.js and loads the correct data from the area's JSON data.
function loadContentArea(areaName){

  // Stores the area's JSON data as variable areaData
  var areaData = omrader[areaName];

  // Populates header data
  $('#imgHeader').attr("src", areaData.imgHeader)
  $('#headingArea').html(areaData.title);
  $('#areatext').html(areaData.information);

  // Calls the map function for the area page
  initMapArea(areaData);
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
      var templateElement = $('#envelopeTempID').clone();
      templateElement.removeAttr('id');
      templateElement.attr('id', PAarea.name +" property "+ props[i].propertyNumber);
      templateElement.attr('role', 'button');
      templateElement.attr('data-toggle', 'modal');
      templateElement.attr('data-target', '#contactModal');

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

// Loads dropdown elements based on how many areas and property areas exist in the JSON files.
function loadNavItems(){

  // Stores the JSON data for the areas as variable areaData
  var areaData = omrader;

  // Populates and appends a navAreaTemplate for each area present in the area JSON file
  for(i = 0; i < Object.keys(areaData).length; i++){

    var area = Object.keys(areaData)[i];
    var areahref = areaData[area].href;
    var templateElement = $('#navAreaTemplate').clone();

    templateElement.removeAttr("id");
    templateElement.find('a').attr('href', base + areahref);
    templateElement.find('a').html(areaData[area].title);

    // Populates and appends a navPATemplate for each property area with
    for(j = 0; j < areaData[area].propertyAreas.length; j++){
      var propArea = areaData[area].propertyAreas[j].toLowerCase();
      var templateSubElement = $('#navPATemplate').clone();

      templateSubElement.removeAttr("id");
      templateSubElement.find('a').attr('href', base + areahref + '/' +propArea);
      templateSubElement.find('a').html(areaData[area].mapData.markers[j].propertyAreaName);
      templateElement.find('ul').append(templateSubElement);
    }
    $('#navElementContainer').append(templateElement);
  }
}

// Gets the relevant area name and outputs the property areas within that area. Function is called as many times as needed, depending on how many property areas exist. Called from checkURL.js
function pullCardData(pArea, home){

  //Stores the JSON data for the relevant property area as variable PAData
  var PAData = hyttegrender[pArea];

  // Template elements for cards are cloned and appended.
  var templateElement = $('#cardTemplate').clone();
  templateElement.removeAttr("id");
  templateElement.find("a").attr('href', PAData.area.toLowerCase()+'/'+PAData.name);
  templateElement.find("img").attr('src', 'images/thumbnailsFilter/'+pArea+'.jpeg');
  templateElement.find(".availabilityText").html(PAData.cardInfo.availability);
  templateElement.find(".price").html(PAData.cardInfo.price);
  templateElement.find(".card-title").html(PAData.title);
  templateElement.find(".card-text").html(PAData.oneliner);

  // If this is the home page, additional information is appended that would be reduntant on the area page.
  if(home == true){
    templateElement.find(".areaName").html(PAData.area);
    templateElement.addClass(PAData.area);
    templateElement.addClass(PAData.icons.join(" "));
  }
  $('#cardContainer').append(templateElement);
  filterItems = $('.filter_item');
}
