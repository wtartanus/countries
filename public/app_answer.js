window.onload = function() {
  var url = "https://restcountries.eu/rest/v1";
  var request = new XMLHttpRequest();
  request.open('GET', url);

  request.onload = function() {
    if(request.status === 200 ) {
      var jsonString = request.responseText;
      var countries = JSON.parse(jsonString);
      
      main(countries);
    }
  }
  request.send(null);
}

var main = function(countries) {
  populateSelect(countries);
  var selected = countries[0];
  var cached = localStorage.getItem('selectedCountry');

  if(cached) {
    selected = JSON.parse(cached);
    document.querySelector('#countries').selectedIndex = selected.index;
  }

  // updateDisplay(selected);
  document.querySelector("#info").style.display = "block";
  var button = document.getElementById('button');
  button.onclick = handleButtonClick();

  // locator = new GeoLocator(map);

}

var populateSelect = function(countries) {
  var parent = document.querySelector('#countries');

  countries.forEach(function(item,index) {
    item.index = index;
    var option = document.createElement("option");
    option.value = index;
    option.text = item.name;
    parent.appendChild(option);
  });
  parent.style.display = "block";
  parent.addEventListener("change", function() {
    var index = +this.value;
    var country = countries[index];
    var infodisplay = updateDisplay(country);
    var latLng = { lat: country.latlng[0], lng: country.latlng[1]};
    var map = new Map(latLng, 4);
    console.log(country);
    map.addInfoWindow(latLng, country);
    localStorage.setItem("selectedCountry", JSON.stringify(country));
  })
}

var updateDisplay = function(country) {
  var contentString = "<h2>" + country.name + "</h2>" + 
  "<p>Population: " + country.population + "</p>" +
  "<p>Capital: " + country.capital + "</p>";

  var infowindow = new google.maps.InfoWindow({
     content: contentString
   });

  return infowindow;
  // var tags = document.querySelectorAll("#info p");
  // tags[0].innerText = country.name;
  // tags[1].innerText = country.population;
  // tags[2].innerText = country.capital;
}

var GeoLocator = function( map ) {
  this.map = map;
  this.getPosition = function() {
        // var center = { lat: position.lat, lng: position.lng }
        this.map.resetCenter(position);
        this.map.addMarker(position, "M");
  };
}

var displayMap = function(position) {
 
}

var handleButtonClick = function() {

  navigator
  
 var map = new Map(latLng, 4);
  
  map.addInfoWindow(latLng, country);
}











