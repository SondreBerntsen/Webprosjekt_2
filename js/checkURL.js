function checkURL(path){
  path = path.toLowerCase();

  var homeRegex = path.match(/\/webprosjekt_2\/(home)\/?$/);
  var indexRegex = path.match(/\/webprosjekt_2\/(index\.html)\/?$/);
  var defaultRegex = path.match(/\/webprosjekt_2\/$/);
  var propertyAreaRegex = path.match(/\/webprosjekt_2\/([A-Za-z]+|[A-Za-z]+\-[A-Za-z]+)\/([A-Za-z]+)\/?$/);
  var areaRegex = path.match(/\/webprosjekt_2\/([A-Za-z]+|[A-Za-z]+\-[A-Za-z]+)\/?$/);

  if(homeRegex || indexRegex || defaultRegex){
    console.log("Pretty sure HOME loads now, right?");
    $('#SPAContent').load('home.html', function() {
      pullCardData();
    });
  }

  if(propertyAreaRegex){

    var PAData = hyttegrender;
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
    var areaData = omrader;
    var areaIndex = areaRegex[1];

    //This prototype thing was taken from https://stackoverflow.com/questions/16576983/replace-multiple-characters-in-one-replace-call?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
    String.prototype.allReplace = function(obj){
      var retStr = this;
      for(var x in obj){
        retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
      }
      return retStr;
    };
    console.log(areaIndex);
    var areaTitle = areaData[areaIndex].title.allReplace({'æ': 'e', 'ø': 'o', 'å': 'a'});

    console.log(areaTitle);
    if(
      areaData[areaIndex] !== 'undefined' &&
      areaIndex.toUpperCase() == areaTitle.toUpperCase()
    ){
      console.log("Cool beans, load the area page");
      $('#SPAContent').load('/webprosjekt_2/areas/area.html', function(){
        loadContentArea(areaIndex);
      });
    }
  }
  else{
    //load 404.html
  }
}
