$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();
});

equalheight = function(container){

  var currentTallest = 0,
      currentRowStart = 0,
      rowDivs = new Array(),
      $el,
      topPosition = 0;
  $(container).each(function() {

    $el = $(this);
    $($el).height('auto')
    topPostion = $el.position().top;

    if (currentRowStart != topPostion) {
      for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
        rowDivs[currentDiv].height(currentTallest);
      }
      rowDivs.length = 0; // empty the array
      currentRowStart = topPostion;
      currentTallest = $el.height();
      rowDivs.push($el);
    } else {
      rowDivs.push($el);
      currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
    }
    for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
      rowDivs[currentDiv].height(currentTallest);
    }
  });
}

$(window).load(function() {
  equalheight('.dashboard-div-wrapper');
});


$(window).resize(function(){
  equalheight('.dashboard-div-wrapper');
});

$(".modal-wide").on("show.bs.modal", function () {
  var height = $(window).height() - 100;
  $(this).find(".modal-body").css("height", height);
  $("#frame").css("height", height);
});
$(function() {
  $('.chosen-select').chosen({ width: '100%'});
});

$(document).ready(function(){
  $('[data-toggle="popover"]').popover();
  $('ul.nav li.dropdown').hover(function() {
    $(this).find('.dropdown-menu').first().stop(true, true).delay(50).fadeIn(300);
  }, function() {
    $(this).find('.dropdown-menu').first().stop(true, true).delay(50).fadeOut(300);
  });
  var t = $('.btn.btn-primary');
  for(i=0;i<t.length;i++){
    if(t[i].text.trim()=="Ajouter")
      t[i].onclick=()=>{
        newRow = `<tr class="details_${$('tr').length-2}">`
        newRowtd = $('tfoot td')
        for(i=0;i<newRowtd.length-1;i++){
          if($('tfoot td')[i].textContent!=""){
            newRow+=`<td headers="${$('tfoot td')[i].headers}">${$('tfoot td span')[i].textContent}`
          }
          else{
            newRow+=`<td headers="${$('tfoot td')[i].headers}" class="nombre-alignement">${$('tfoot td')[i].firstChild.value}`
          }
        }
        newRow+=` <td headers="col_06" class="actions">
        <a class="btn btn-xs btn-primary" alt="Modifier" title="Modifier" onclick="$('.details_${('tr').length-2}').hide();$('.modif_${('tr').length-2}').show();">
            <i class="fa fa-pencil-square-o"></i>
        </a>                                                
        <a class="btn btn-xs btn-primary" alt="Supprimer" title="Supprimer">
            <i class="fa fa-trash-o"></i>
        </a>
      </td>`
        $('tbody').append(newRow);
  }
  }
});