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
    initMapPA(PAData[x]);

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

function initMapPA(PAData){

  var map = new google.maps.Map(document.getElementById('mapPA'), {
    center: PAData.mapData.position,
    zoom: 16,
    mapTypeId: 'hybrid'
  });
console.log(PAData.mapData.markers);
console.log(PAData.mapData.markers[0].outline);
var finsandvika1 = PAData.mapData.markers.outline;
console.log(finsandvika1);
console.log("hello");
for(i = 0; i < PAData.mapdData.markers.length; i++){
  console.log(PAData.mapData.markers);
  console.log("hello");
}

  // Define the LatLng coordinates for the polygon's path.
        /*/var finsandvika1 = [
          tomt1 = [
            {lat: 61.016047614752, lng: 10.519054152719},
            {lat: 61.015803269529, lng: 10.519553043596},
            {lat: 61.016273762378, lng: 10.519891001932},
            {lat: 61.016273762378, lng: 10.519376017801}
          ],

          tomt2 = [
            {lat:61.015805868956, lng:10.51954231476},
            {lat:61.015574519104, lng:10.519998290292},
            {lat:61.015891649933, lng:10.520282604448},
            {lat:61.015974831265, lng:10.520186044923},
            {lat:61.016052813566, lng:10.520218231431},
            {lat:61.016063211192, lng:10.519880273096}
          ],

          tomt3 = [
            {lat:61.016276361767,lng:10.519376017801},
            {lat:61.016063211192,lng:10.519880273096},
            {lat:61.016060611786,lng:10.520470359079},
            {lat:61.016354343327, lng:10.52025041794},
          ],

          tomt4 = [
            {lat:61.014360554593,lng:10.523045279733},
            {lat:61.014573716603,lng:10.522267439119},
            {lat:61.014230577056,lng:10.522063591234},
            {lat:61.013986217844,lng:10.522954084627},
            {lat:61.014160388964,lng:10.522956766836}
           ],

           tomt5 = [
             {lat:61.015020832255,lng:10.522224523775},
             {lat:61.014786877171,lng:10.523013093225},
             {lat:61.014516526926,lng:10.522669770471},
             {lat:61.014784277661,lng:10.521838285676}
           ],

           tomt6 = [
             {lat:61.015844860338,lng:10.520717122308},
             {lat:61.016159389068,lng:10.520701029054},
             {lat:61.016159389068,lng:10.521430589906},
             {lat:61.015857857455,lng:10.521462776414}
           ],

           tomt7 = [
             {lat:61.016161988466,lng:10.520695664472},
             {lat:61.016460917816,lng:10.520668842382},
             {lat:61.016460917816,lng:10.521425225324},
             {lat:61.016161988466,lng:10.521430589743}
           ],

           tomt8 = [
             {lat:61.015304175529,lng:10.523077466241},
             {lat:61.01508062048,lng:10.523780205003},
             {lat:61.01482067077,lng:10.523404695741},
             {lat:61.015026031218,lng:10.522637583963}
           ],

           tomt9 = [
             {lat:61.015306774997,lng:10.523077466241},
             {lat:61.015525129552,lng:10.522417642824},
             {lat:61.01536396324,lng:10.522133328668},
             {lat:61.015145607575,lng:10.522213794939},
             {lat:61.015026031218,lng:10.522632219545}
           ],

           tomt10 = [
             {lat:61.015233989851,lng:10.523646094553},
             {lat:61.015454944363,lng:10.522959449045},
             {lat:61.015769476956,lng:10.523281314127},
             {lat:61.015517331241,lng:10.524053790323}
           ],

           tomt11 = [
             {lat:61.015356164869,lng:10.519005872998},
             {lat:61.015088418959,lng:10.519284822735},
             {lat:61.014940247921,lng:10.518571355137},
             {lat:61.015158604998,lng:10.51834604958}
           ],

           tomt12 = [
             {lat:61.014643903781,lng:10.520963885538},
             {lat:61.014394348666,lng:10.520996072046},
             {lat:61.014370952773,lng:10.52180073475},
             {lat:61.014610109974,lng:10.521929480783},
             {lat:61.014815471784,lng:10.521478869668}
           ]
        ];
*/


        // Construct the polygon.
        var tomt1 = new google.maps.Polygon({
          paths: finsandvika1,
          strokeColor: '#00FF00',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#00FF00',
          fillOpacity: 0.35
        });
        tomt1.setMap(map);

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

function pullCardData(pArea, home){ //needs parameter to be used for both index and area pages

  var PAData = hyttegrender;

  var templateElement = $('#cardTemplate').clone();
  templateElement.removeAttr("id");
  templateElement.find("a").attr('href', PAData[pArea].area.toLowerCase()+'/'+PAData[pArea].name);
  templateElement.find("img").attr('src', 'images/thumbnailsFilter/'+pArea+'.jpeg');
  templateElement.find(".availabilityText").html(PAData[pArea].cardInfo.availability);
  templateElement.find(".price").html(PAData[pArea].cardInfo.price);
  templateElement.find(".card-title").html(PAData[pArea].title);
  templateElement.find(".card-text").html(PAData[pArea].oneliner);

  if(home == true){
    templateElement.find(".areaName").html(PAData[pArea].area);
    templateElement.addClass(PAData[pArea].area);
    templateElement.addClass(PAData[pArea].icons.join(" "));
  }
  $('#cardContainer').append(templateElement);
  filterItems = $('.filter_item');
}
