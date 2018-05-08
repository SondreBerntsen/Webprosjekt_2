function checkURL(path){
  console.log(path);


  var homeRegex = /\/webprosjekt_2\/home$/;
  var propertyAreaRegex = /\/webprosjekt_2\/[A-Za-z]+\/[A-Za-z]+$/;
  var areaRegex = /\/webprosjekt_2\/[A-Za-z]+$/;

  if(path.match(homeRegex)){
    //load home.html
  }
  if(path.match(propertyAreaRegex)){ //works, don't change it
    var PAData = hyttegrender; // the entire json file doesn't load unless the url matches regex
    var relevantPath = path.split('webprosjekt_2/')[1];
    var arrayURL = relevantPath.split('/');
    var areaIndex = arrayURL[0];
    var PAIndex = arrayURL[1];

    if(PAData[PAIndex] !== 'undefined' && areaIndex.toUpperCase() == PAData[PAIndex].area.toUpperCase()){
      console.log("Cool beans, load the page.");
    }
    else{
      //load 404.html with some info maybe
      console.log("Page not found");
    }

  }
  else if(path.match(areaRegex)){
    //Check if data[path] or whatever exists
    var areaData = omrader;
  }
  else{
    //load 404.html
  }


}
