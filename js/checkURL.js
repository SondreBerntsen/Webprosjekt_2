function checkURL(path){
  path = path.toLowerCase();
  var PAData = hyttegrender;
  var areaData = omrader;


  var homeRegex = path.match(/\/webprosjekt_2\/(home)\/?$/);
  var indexRegex = path.match(/\/webprosjekt_2\/(index\.html)\/?$/);
  var defaultRegex = path.match(/\/webprosjekt_2\/$/);
  var propertyAreaRegex = path.match(/\/webprosjekt_2\/([A-Za-z]+|[A-Za-z]+\-[A-Za-z]+)\/([A-Za-z]+)\/?$/);
  var areaRegex = path.match(/\/webprosjekt_2\/([A-Za-z]+|[A-Za-z]+\-[A-Za-z]+)\/?$/);

  if(homeRegex || indexRegex || defaultRegex){
    console.log("Cool beans, load the home page.");
    $('#SPAContent').load('home.html', function() {
      for(i = 0; i < Object.keys(PAData).length; i++){
        var pArea = Object.keys(PAData)[i];
        pullCardData(pArea, true);
      }
    });
  }

  if(propertyAreaRegex){
    var areaIndex = propertyAreaRegex[1];
    var PAIndex = propertyAreaRegex[2];

    if(
      PAData[PAIndex] !== 'undefined' &&
      areaIndex.toUpperCase() == PAData[PAIndex].area.toUpperCase()
    ){
      console.log("Cool beans, load the property area page.");

      //$.getScript('/webprosjekt_2/js/mapPlot.js'); May have to do it like this unless we include everything in index, to avoid deprecation notice

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
    !homeRegex &&
    areaRegex
  ){
    var areaIndex = areaRegex[1];

    //This prototype thing was taken from https://stackoverflow.com/questions/16576983/replace-multiple-characters-in-one-replace-call?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
    String.prototype.allReplace = function(obj){
      var retStr = this;
      for(var x in obj){
        retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
      }
      return retStr;
    };

    var areaTitle = areaData[areaIndex].title.allReplace({'æ': 'e', 'ø': 'o', 'å': 'a'});

    if(
      areaData[areaIndex] !== 'undefined' &&
      areaIndex.toUpperCase() == areaTitle.toUpperCase()
    ){
      console.log("Cool beans, load the area page");
      $('#SPAContent').load('/webprosjekt_2/areas/area.html', function(){
        loadContentArea(areaIndex);
        for(i = 0; i < areaData[areaIndex].propertyAreas.length; i++){
          var pArea = areaData[areaIndex].propertyAreas[i];
          pullCardData(pArea, false);
        }
      });
    }
  }
  else{
    //load 404.html
  }
}
