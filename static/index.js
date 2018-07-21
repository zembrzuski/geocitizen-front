/**
  * Funções belas
  */

function createPolyline(coordinates, strokeColor, strokeOpacity, strokeWeight) {
  return new google.maps.Polyline({
    path: coordinates,
    strokeColor: strokeColor,
    strokeOpacity: strokeOpacity,
    strokeWeight: strokeWeight
  });
}

function find_path_by_id(all_paths, path_id) {
  for(x = 0 ; x < all_paths.length; x++) {
    current_path = all_paths[x]

    if (current_path['id'] == path_id) {
      return current_path
    }
  }

  throw "could not find a path";  
}

function plotaUmTrack(all_paths, path_id, map, polylines) {
  var path = find_path_by_id(all_paths, path_id);
  var myPolyline = createPolyline(path['points'], 'red', 0.8, 5);
  polylines[path_id] = myPolyline;
  myPolyline.setMap(map);
}

function removeUmTrack(path_id, polylines) {
  var myPolyline = polylines[path_id];
  myPolyline.setMap(null);
  delete polylines[path_id];
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
    center: {lat: 0, lng: 0}
  });

  $.get(
    'http://127.0.0.1:5000/proxy_pass?path=user/by-user-id/' + user_id, 
    function(data) {initMapCallback(data, mmmap);}
  );
}

function checkboxBehavior(checkboxInfo, single_user_data, map, polylines) {
  path_id = checkboxInfo.value;

  if (checkboxInfo.checked) {
    plotaUmTrack(single_user_data['paths'], path_id, map, polylines);
  } else {
    removeUmTrack(path_id, polylines)
  }
}

/**
  * Estado
  */
var mmmap = null;
var polylines = {};
var single_user_data = null;

/**
  * Listeners
  */
$(document).ready(function() {
  $('#right_form').on('change', 'input[type=checkbox]', function(e) {
    checkboxBehavior(this, single_user_data, mmmap, polylines);
  });
});
