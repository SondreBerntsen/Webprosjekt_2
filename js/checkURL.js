function checkURL(path){
  console.log(path);
  path = path.toLowerCase();
  console.log(path);

  var homeRegex = /\/webprosjekt_2\/home$/;
  var propertyAreaRegex = /\/webprosjekt_2\/[A-Za-z]+\/[A-Za-z]+$/;
  var areaRegex = /\/webprosjekt_2\/[A-Za-z]+$/;

  if(path.match(homeRegex)){

    console.log("Pretty sure HOME loads now, right?");
    $('#SPAContent').load('home.html', function() {
      pullCardData();
    });
  }

  if(path.match(propertyAreaRegex)){

    var PAData = hyttegrender;
    var relevantPath = path.split('webprosjekt_2/')[1];
    var arrayURL = relevantPath.split('/');
    var areaIndex = arrayURL[0];
    var PAIndex = arrayURL[1];

    if(
      PAData[PAIndex] !== 'undefined' &&
      areaIndex.toUpperCase() == PAData[PAIndex].area.toUpperCase()
    ){
      console.log("Cool beans, load the property area page.");

      //$.getScript('/webprosjekt_2/js/mapPlot.js'); like this or wat?

      $('#SPAContent').load('/webprosjekt_2/areas/propertyArea.html', function() {
        loadContent(PAIndex);
      });
    }
    else{
      //load 404.html with some info maybe
      console.log("Page not found");
    }

  }
  else if(
    !path.match(homeRegex) &&
    path.match(areaRegex)
  ){
    //Check if data[path] or whatever exists
    var areaData = omrader;
    var areaIndex = path.split('webprosjekt_2/')[1];

    if(
      areaData[areaIndex] !== 'undefined' &&
      areaIndex.toUpperCase() == areaData[areaIndex].title.toUpperCase()
    ){
      console.log("Cool beans, load the area page");

      $('#SPAContent').load('/webprosjekt_2/areas/area.html');
    }
  }
  else{
    //load 404.html
  }


}
