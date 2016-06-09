var Map = function(latLng, zoom) {

  this.googleMap = new google.maps.Map(document.getElementById('map'), {
    center: latLng,
    zoom: zoom
  });

  this.addInfoWindow = function(latLng, country ) {
      var marker = this.addMarker( latLng, country.name );

       var contentString =

           "<h2>" + country.name + "</h2>" + 
          "<p>Population: " + country.population + "</p>" +
          "<p>Capital: " + country.capital + "</p>";
     
        
       
        
      
      marker.addListener( 'click', function() {
        var infowindow = new google.maps.InfoWindow({
             content: contentString
           });
        console.log(this.googleMap);
        infowindow.open(this.googleMap, this);
      });
  };

  this.addMarker = function( latLng, title ) {
    var marker = new google.maps.Marker( {
      position: latLng,
      map: this.googleMap,
      label: title
    } );
    return marker;
  };

  this.bindClick = function() {
    google.maps.event.addListener( this.googleMap, "click", function(event) {
      var latlng = { lat: event.latLng.lat(), lng: event.latLng.lng() }
      this.addMarker(latlng, "1");
    }.bind(this) );
  };
  
  this.resetCenter = function( latLng ) {
    this.googleMap.setCenter(latLng);
  };
}