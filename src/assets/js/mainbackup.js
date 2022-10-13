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
        t[i].onclick=()=>$('tbody').append(`
        <tr class="details_${('tr').length-2}">
        <td headers="col_01">${$('tfoot td span')[0].textContent}</td>
        <td headers="col_03">${$('tfoot td span')[1].textContent}</td>
        <td headers="col_03">${$('tfoot td span')[2].textContent}</td>
        <td headers="col_04" class="nombre-alignement">${$('tfoot td input')[3].value}</td>
        <td headers="col_06" class="actions">
        <a class="btn btn-xs btn-primary" alt="Modifier" title="Modifier" onclick="$('.details_${('tr').length-2}').hide();$('.modif_${('tr').length-2}').show();">
            <i class="fa fa-pencil-square-o"></i>
        </a>                                                
        <a class="btn btn-xs btn-primary" alt="Supprimer" title="Supprimer">
            <i class="fa fa-trash-o"></i>
        </a>
      </td></tr>
      <tr class="modif_${('tr').length-2}" style="display: none;">
      <td headers="col_01">
          <select class="form-control chosen-select" id="categorie" style="display: none;">
              <option value="0">Sélectionnez...</option>
              <option value="1" selected="">Matériel de Bureau</option>
              <option value="2">Matériel de Couchage et de campement </option>
          </select><div class="chosen-container chosen-container-single" style="width: 100%;" title="" id="categorie_chosen"><a class="chosen-single"><span>Matériel de Bureau</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off"></div><ul class="chosen-results"></ul></div></div>
      </td>
      <td headers="col_02">
          <select class="form-control chosen-select" id="sous-categorie" style="display: none;">
              <option value="0">Sélectionnez...</option>
              <option value="1" selected="">Bureau</option>
              <option value="2">Bureau-désign-2017</option>
          </select><div class="chosen-container chosen-container-single" style="width: 100%;" title="" id="sous_categorie_chosen"><a class="chosen-single"><span>Bureau</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off"></div><ul class="chosen-results"></ul></div></div>
      </td>
      <td headers="col_03">
          <select class="form-control chosen-select" id="produit" style="display: none;">
              <option value="0">Sélectionnez...</option>
              <option value="1" selected="">Chaise de bureau</option>
              <option value="2">chaise salle de réunion</option>
              <option value="3">bureau droit</option>
          </select><div class="chosen-container chosen-container-single" style="width: 100%;" title="" id="produit_chosen"><a class="chosen-single"><span>Chaise de bureau</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off"></div><ul class="chosen-results"></ul></div></div> 
      </td>  
      <td headers="col_04"><input type="text" class="form-control" value="10"></td>
      <td headers="col_06" class="actions ">
          <a class="btn btn-primary" alt="Modifier" title="Modifier" onclick="$('.details_${('tr').length-2}').show();$('.modif_${('tr').length-2}').hide();">
              Modifier
          </a>    
      </td>
  </tr>`)
    }
  });