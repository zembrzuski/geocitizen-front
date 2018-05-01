function plota(track_id) {
  var uluru = {lat: -25.363, lng: 131.044};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });

  var cao = $.get('http://127.0.0.1:5000/proxy_pass?path=track/by-id/' + track_id, function(data) {

    coordinates = data['points'];

    var myPath = new google.maps.Polyline({
      path: coordinates,
      strokeColor: 'red',
      strokeOpacity: 0.8,
      strokeWeight: 5
    });

    myPath.setMap(map);
  });

}

function plotaUser(user_id) {
  var uluru = {lat: -25.363, lng: 131.044};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });

  var cao = $.get('http://127.0.0.1:5000/proxy_pass?path=user/by-user-id/' + user_id, function(data) {
  //var cao = $.get('http://127.0.0.1:5000/proxy_pass?path=user/by-user-id-and-hour-of-day/011/22/24', function(data) {

    paths = data['paths'];

    var menuEsquerdaItems = []

    for(x = 0 ; x < paths.length; x++) {

      var menuEsquerdaItem = Object()
      menuEsquerdaItem.id = paths[x]['id']
      menuEsquerdaItem.inicio = paths[x]['firstTimestamp']
      menuEsquerdaItem.fim = paths[x]['lastTimestamp']
      menuEsquerdaItems = menuEsquerdaItems.concat(menuEsquerdaItem)

      var myPath = new google.maps.Polyline({
        path: paths[x]['points'],
        strokeColor: 'black',
        strokeOpacity: 0.1,
        strokeWeight: 5
      });

      myPath.setMap(map);
    }

    var stringao = ""
    for(x = 0 ; x < menuEsquerdaItems.length; x++) {
      xx = menuEsquerdaItems[x]
      stringao += xx['inicio'] + "<br/>"
    }
    $(".right").html(stringao);

  });

}

function initMap() {
    if (location.pathname.startsWith("/map/")) {
      var track_id = location.pathname.split("/map/")[1];
      plota(track_id);
    }

    location.pathname.startsWith("/user/")
    var user_id = location.pathname.split("/user/")[1];
    plotaUser(user_id);
}
