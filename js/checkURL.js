function checkURL(path){

  path = path.toLowerCase();
  var PAData = hyttegrender;
  var areaData = omrader;

  const base = '/webprosjekt_2';

  var homeRegex =  base + '/(home)/?$';
  //var indexRegex = base + '/(index\.html)/?$';
  var defaultRegex = base +'/$';
  var propertyAreaRegex = base + '/([A-Za-z]+|[A-Za-z]+-[A-Za-z]+)/([A-Za-z]+)/?$';
  var areaRegex = base + '/([A-Za-z]+|[A-Za-z]+-[A-Za-z]+)/?$';

  homeControllerRegex = new RegExp(homeRegex);
  defaultControllerRegex = new RegExp(defaultRegex);
  PAControllerRegex = new RegExp(propertyAreaRegex);
  areaControllerRegex = new RegExp(areaRegex);

  if(homeControllerRegex.test(path) || defaultControllerRegex.test(path)){
    console.log("Cool beans, load the home page.");
    $('#SPAContent').load('home.html', function() {

      $.ajax({
       async: true,
       type: "POST",
       url: base+ '/js/filter.js',
      });

      for(i = 0; i < Object.keys(PAData).length; i++){
        var pArea = Object.keys(PAData)[i];
        pullCardData(pArea, true);
      }
    });
  }
  else if(PAControllerRegex.test(path)){

    path.match(propertyAreaRegex);

    var areaIndex = path.match(propertyAreaRegex)[1];
    var PAIndex = path.match(propertyAreaRegex)[2];

    if(
      PAData[PAIndex] !== 'undefined' &&
      areaIndex.toUpperCase() == PAData[PAIndex].area.toUpperCase()
    ){
      console.log("Cool beans, load the property area page.");

      $('#SPAContent').load(base + '/areas/propertyArea.html', function() {
        loadContent(PAIndex);

        $.ajax({
         async: true,
         type: "POST",
         url: base+ '/js/imageSlider.js',
        });

      });
    }
    else{
      //load 404.html with some info maybe
      console.log("Page not found");
    }
  }
  else if(!homeControllerRegex.test(path) && areaControllerRegex.test(path)){
    var areaIndex = path.match(areaRegex)[1];

    //This prototype thing was taken from https://stackoverflow.com/questions/16576983/replace-multiple-characters-in-one-replace-call?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
    String.prototype.allReplace = function(obj){
      var retStr = this;
      for(var x in obj){
        retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
      }
      return retStr;
    };

    var areaTitle = areaData[areaIndex].title.allReplace({'æ': 'e', 'ø': 'o', 'å': 'a'});

    if(areaData[areaIndex] !== 'undefined' && areaIndex.toUpperCase() == areaTitle.toUpperCase()){
      console.log("Cool beans, load the area page");

      $('#SPAContent').load(base+ '/areas/area.html', function(){
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
