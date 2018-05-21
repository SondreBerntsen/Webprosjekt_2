function checkURL(path) {

  path = path.toLowerCase();
  var PAData = hyttegrender;
  var areaData = omrader;

  var homeRegex = base + 'home/?$';
  var defaultRegex = base + '$';
  var propertyAreaRegex = base + '([A-Za-z]+|[A-Za-z]+-[A-Za-z]+)/([A-Za-z]+)/?$';
  var areaRegex = base + '([A-Za-z]+|[A-Za-z]+-[A-Za-z]+)/?$';

  homeControllerRegex = new RegExp(homeRegex);
  defaultControllerRegex = new RegExp(defaultRegex);
  PAControllerRegex = new RegExp(propertyAreaRegex);
  areaControllerRegex = new RegExp(areaRegex);

  if (homeControllerRegex.test(path) || defaultControllerRegex.test(path)) {

    $('#SPAContent').load(base + 'pages/home.html', function() {

      //This is the only way to avoid deprecation notice
      $.ajax({
        async: true,
        type: "POST",
        url: 'js/filter.js',
      });

      for (i = 0; i < Object.keys(PAData).length; i++) {
        var pArea = Object.keys(PAData)[i];
        pullCardData(pArea, true);
      }
    });
  } else if (PAControllerRegex.test(path)) {

    var areaIndex = path.match(propertyAreaRegex)[1];
    var PAIndex = path.match(propertyAreaRegex)[2];

    if (
      typeof PAData[PAIndex] !== 'undefined' &&
      areaIndex.toUpperCase() == PAData[PAIndex].area.toUpperCase()
    ) {

      $('#SPAContent').load(base + 'pages/propertyArea.html', function() {
        loadContentPA(PAIndex);

        $.ajax({
          async: true,
          type: "POST",
          url: base + '/js/imageSlider.js',
        });

      });
    } else {
      $('#SPAContent').load(base + 'pages/404.html');
    }
  } else if (!homeControllerRegex.test(path) && areaControllerRegex.test(path)) {
    var areaIndex = path.match(areaRegex)[1];

    //This prototype thing was taken from https://stackoverflow.com/questions/16576983/replace-multiple-characters-in-one-replace-call?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
    String.prototype.allReplace = function(obj) {
      var retStr = this;
      for (var x in obj) {
        retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
      }
      return retStr;
    };

    if (typeof areaData[areaIndex] !== 'undefined') {

      var areaTitle = areaData[areaIndex].title.allReplace({
        'æ': 'e',
        'ø': 'o',
        'å': 'a'
      });
      $('#SPAContent').load(base + '/pages/area.html', function() {
        loadContentArea(areaIndex);
        for (i = 0; i < areaData[areaIndex].propertyAreas.length; i++) {
          var pArea = areaData[areaIndex].propertyAreas[i];
          pullCardData(pArea, false);
        }
      });
    } else {
      $('#SPAContent').load(base + 'pages/404.html');
    }
  } else {
    $('#SPAContent').load(base + 'pages/404.html');
  }
}