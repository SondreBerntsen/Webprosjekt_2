/*
*This file contians the code for the filter functionality
*/
var filterItems = $('.filter_item');
    //Activated when a checkbox is checked
    $('.category_item').click(function(){
        var checkboxes = $('[name=filterData]');//Array with all the filter options
        var selectedMisc = [];                  //Array for activities, facilities, infrastruktur
        var selectedAreas = [];                 //Array for areas
        filterItems.addClass('hide');           //Hide all the filteritems
        $('.tagFilter').remove();
        //Goes through all the chckeboxes that exists
        for (var i=0; i<checkboxes.length; i++) {
            if(checkboxes[i].checked){
              //If the checkbox that is checked is one of the areas the value is pushed into
              //SelectedAreas array.
                switch(checkboxes[i].value){
                        case 'ringsaker':
                            selectedAreas.push(checkboxes[i].value);
                            break;
                        case 'gudbrandsdalen':
                            selectedAreas.push(checkboxes[i].value);
                            break;
                        case 'valdres':
                            selectedAreas.push(checkboxes[i].value);
                            break;
                        case 'sor-trondelag':
                            selectedAreas.push(checkboxes[i].value);
                            break;
                        default:
                            selectedMisc.push(checkboxes[i].value);//If the value is not an area it is pushed into selectedMisc array
                    }
            }
        }
        if(selectedAreas.length > 0){
            filterItems.addClass('hideArea');
            //Goes through the array selectedAreas and reomves the class 'hidearea'
            for (var i=0; i<selectedAreas.length; i++){
                $('.'+selectedAreas[i]).removeClass('hideArea');
            }
        }
        //Goes through the array selectedAMisc and reomves the class 'hide'
        for (var i=0; i<selectedMisc.length; i++) {
            $('.'+selectedMisc[i]).removeClass('hide');
        }
        if(selectedMisc.length == 0){
            filterItems.removeClass('hide');
        }
        if(selectedAreas.length == 0){
            filterItems.removeClass('hideArea');
        }
        //Creats the tags for the filter
        var checkedBoxes = selectedAreas.concat(selectedMisc);
        for(var i=0; i<checkedBoxes.length; i++){
          $('#filterTags').append('<div class="tagFilter">'+checkedBoxes[i]+'</div>');
        }
    });
    //Click event for the buttons area, activities, facilities and infrastruktur
    //Toggles the view of the checkboxes
      $(".showCheckbox").on("click", function(e) {
           $(this).nextAll(".hideCheckbox").toggle('fast');
           //Changes the direction of the arrow
           var spanElement=e.target.firstElementChild;
            $(spanElement).toggleClass("fas fa-chevron-up",true);
            $(spanElement).toggleClass('fas fa-chevron-down',true);
	     });
