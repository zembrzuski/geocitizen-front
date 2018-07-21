function createPath(coordinates, strokeColor, strokeOpacity, strokeWeight) {
  return new google.maps.Polyline({
    path: coordinates,
    strokeColor: strokeColor,
    strokeOpacity: strokeOpacity,
    strokeWeight: strokeWeight
  });
}

function plotaTrack(track_id) {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: {lat: -25.363, lng: 131.044}
  });

  $.get('http://127.0.0.1:5000/proxy_pass?path=track/by-id/' + track_id, function(data) {
    coordinates = data['points'];
    var myPath = createPath(coordinates, 'red', 0.8, 5);
    myPath.setMap(map);
  });
}

function plotaUserCallback(data, map) {
  paths = data['paths'];

  for(x = 0 ; x < paths.length; x++) {
    createPath(paths[x]['points'], 'black', 0.1, 5).setMap(map);
  }
}

function plotaUser(user_id) {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: {lat: -25.363, lng: 131.044}
  });

  $.get(
    'http://127.0.0.1:5000/proxy_pass?path=user/by-user-id/' + user_id, 
    function(data) {plotaUserCallback(data, map);}
  );
}

function initMap() {
    if (location.pathname.startsWith("/map/")) {
      var track_id = location.pathname.split("/map/")[1];
      plotaTrack(track_id);
    }

    location.pathname.startsWith("/user/")
    var user_id = location.pathname.split("/user/")[1];
    plotaUser(user_id);
}
