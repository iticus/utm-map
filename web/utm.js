var map;
var ZONE_LETTERS = 'CDEFGHJKLMNPQRSTUVWX';

function init() {
	map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 0},
        minZoom: 3,
        maxZoom: 9, 
        zoom: 3
    });
    // Define the LatLng coordinates for the polygon's path.
	var k = 1;
	for (i=-180;i<180;i=i+6) { //longitude
		var c = 0; 
		for (j=-80;j<80;j=j+8) { //latitude
			var coords= [
			      {lat: j, lng: i},
			      {lat: j, lng: i+6},
			      {lat: j+8, lng: i+6},
			      {lat: j+8, lng: i},
			      {lat: j, lng: i}
			     ];
			var pos = new google.maps.LatLng(j+4, i+3);
			if (c == 17) { //custom norway regions "V"
				if (k == 31) {
					coords[1].lng = i + 3;
					coords[2].lng = i + 3;
					pos = new google.maps.LatLng(j+4, i+1.5);
				}
				else if (k == 32) {
				      coords[0].lng = i - 3;
				      coords[3].lng = i - 3;
				      coords[4].lng = i - 3;
				      pos = new google.maps.LatLng(j+4, i+1.5);
				}
			}
			if (c == 19) {//custom Svalbard regions "X"
				coords[2].lat = j+12;
		        coords[3].lat = j+12;
		        pos = new google.maps.LatLng(j+6, i+3);
		        if (k == 32 || k == 34 || k == 36) {
		        	continue
		        }
		        else if (k == 31) {
		        	coords[1].lng = i + 9;
					coords[2].lng = i + 9;
					pos = new google.maps.LatLng(j+6, i+4.5);
		        }
		        else if (k == 33 || k == 35) {
		        	coords[0].lng = i - 3;
		        	coords[1].lng = i + 9;
					coords[2].lng = i + 9;
                    coords[3].lng = i - 3;
				    coords[4].lng = i - 3;
					pos = new google.maps.LatLng(j+6, i+3);
		        }
		        else if (k == 37) {
		        	coords[0].lng = i - 3;
		        	coords[1].lng = i + 6;
					coords[2].lng = i + 6;
                    coords[3].lng = i - 3;
				    coords[4].lng = i - 3;
					pos = new google.maps.LatLng(j+6, i+1.5);
		        }
			}
		    var zone = new google.maps.Polygon({
		    	paths: coords,
		    	strokeColor: '#FF0000',
		    	strokeOpacity: 0.5,
		    	strokeWeight: 1,
		    	fillColor: randomColor(),
		    	fillOpacity: 0.25
			});
		    zone.setMap(map);
		    var mapLabel = new MapLabel({
		        text: '' + k + ZONE_LETTERS[c],
		        position: pos,
		        map: map,
		        fontSize: 14,
		        align: 'center'
		      });
		    c += 1;
		}
		k += 1;
	}
}

google.maps.event.addDomListener(window, 'load', init);
