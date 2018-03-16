$(document).ready(function(){
    var selected = [];
    var filterItems = $('.filter_item');
    $('.category_item').click(function(){
        var checkboxes = $('[name=filterData]');
        var selected = [];
        filterItems.addClass('hide');

        for (var i=0; i<checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                selected.push(checkboxes[i].value);
            }
        }
        for (var j=0; j<selected.length; j++) {
            $('.' + selected[j]).removeClass('hide');
            }
        if(selected.length == 0){
                filterItems.removeClass('hide');
        }

    });
});
