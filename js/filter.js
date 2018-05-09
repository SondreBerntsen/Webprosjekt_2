var filterItems = "";
$(document).ready(function(){
    $('.category_item').click(function(){
        var checkboxes = $('[name=filterData]');
        var selectedMisc = [];
        var selectedAreas = [];
        filterItems.addClass('hide');
        $('.tagFilter').remove();

        for (var i=0; i<checkboxes.length; i++) {
            if(checkboxes[i].checked){
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
                        case 'sør-trøndelag':
                            selectedAreas.push(checkboxes[i].value);
                            break;
                        default:
                            selectedMisc.push(checkboxes[i].value);
                    }
            }
        }//Nå skal verdien for områder ligge i egen array, mens misc ligger i en annen.
        if(selectedAreas.length > 0){
            filterItems.addClass('hideArea');
            for (var i=0; i<selectedAreas.length; i++){
                $('.'+selectedAreas[i]).removeClass('hideArea');
            }
        }
        for (var i=0; i<selectedMisc.length; i++) {
            $('.'+selectedMisc[i]).removeClass('hide');
        }
        if(selectedMisc.length == 0){
            filterItems.removeClass('hide');
        }
        if(selectedAreas.length == 0){
            filterItems.removeClass('hideArea');
        }
        var checkedBoxes = selectedAreas.concat(selectedMisc);
        for(var i=0; i<checkedBoxes.length; i++){
          $('#filterTags').append('<div class="tagFilter">'+checkedBoxes[i]+'</div>');
        }
    });
      $(".showCheckbox").on("click", function(e) {
           $(this).nextAll(".hideCheckbox").toggle('fast');
           var spanElement=e.target.firstElementChild;
            $(spanElement).toggleClass("fas fa-chevron-up",true);
            $(spanElement).toggleClass('fas fa-chevron-down',true);
	     });

});
