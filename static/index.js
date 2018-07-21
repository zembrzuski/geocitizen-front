/**
  * Funções belas
  */

function createPath(coordinates, strokeColor, strokeOpacity, strokeWeight) {
  return new google.maps.Polyline({
    path: coordinates,
    strokeColor: strokeColor,
    strokeOpacity: strokeOpacity,
    strokeWeight: strokeWeight
  });
}

function desenhaTrackIdsNoCantoEsquerdo(paths) {
  for(x = 0 ; x < paths.length; x++) {
    current_path = paths[x]
    current_path_id = current_path['id']

    dia_da_semana = current_path['firstTimestamp']['diaDaSemana']
    hora = current_path['firstTimestamp']['hora']
    dia_hora = dia_da_semana + ' ~~' + hora + ':00'

    html_to_append = `
      <div>
        <input 
          type="checkbox" id="` + current_path_id + `" 
          name="` + current_path_id + `" 
          value="` + current_path_id + `" 
        >
        <label for="` + current_path_id + `">` + dia_hora + `</label>
      </div>
    `

    $("#right_form").append(html_to_append);
  }
}

function initMapCallback(data, map) {
  single_user_data = data;
  desenhaTrackIdsNoCantoEsquerdo(single_user_data['paths']);
}

function initMap() {
  var user_id = location.pathname.split("/user/")[1];

  mmmap = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: {lat: -25.363, lng: 131.044}
  });

  $.get(
    'http://127.0.0.1:5000/proxy_pass?path=user/by-user-id/' + user_id, 
    function(data) {initMapCallback(data, mmmap);}
  );
}


/**
  * Estado
  */
var mmmap = null;
var single_user_data = null;

/**
  * Listeners
  */
$(document).ready(function() {
   $('#right_form').on('change', 'input[type=checkbox]', function(e) {
      //console.log(this.name+' '+this.value+' '+this.checked);
      path_id = this.value;
      alert(path_id);
    });
});