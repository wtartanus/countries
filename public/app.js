window.onload = function() {
  var url = "https://restcountries.eu/rest/v1";
  var request = new XMLHttpRequest();

  // console.log(request);
  request.open("Get", url );
  request.onload = function() {
    if(request.status === 200 ) {
      console.log("got the data");
      var jsonString = request.responseText;
      countries = JSON.parse(jsonString);
      createOptions(countries);
      createElements();
    }
  }
 request.send(null);
}

var preventFormDefault = function(event) {
  event.preventDefault();
}


var createOptions = function(list) {
  var select = document.getElementById('country-list');
  select.onchange = changeEvent;

  for (var i = 0; i < list.length; i++) {
    var option = document.createElement("option");
    option.innerText = list[i].name;
    option.classList.add("countries");
    select.appendChild(option);
  }
}

var changeEvent = function(event) {
 var country = getData(this.value);
 processData(country);
}

var getData = function(country) {
  for (var i = 0; i < countries.length; i++) {
    if (countries[i].name === country) {
      var selectedCountry = { name: countries[i].name, capital: countries[i].capital, population: countries[i].population, borders: countries[i].borders }
    }
  }
  return selectedCountry;
}

var createElements = function() {
  var body = document.getElementsByTagName("body")[0];
  var p1 = document.createElement("p");
  var p2 = document.createElement("p");
  var p3 = document.createElement("p");
  p1.id = "country";
  p2.id = "capital";
  p3.id = "population";
  printPersist(p1,p2,p3);
  body.appendChild(p1);
  body.appendChild(p2);
  body.appendChild(p3);

}

var processData = function(country) {
  var p1 = document.getElementById('country');
  var p2 = document.getElementById('capital');
  var p3 = document.getElementById('population');
  

  p1.innerText = "Country: " + country.name;
  p2.innerText = "Capital: " + country.capital;
  p3.innerText = "Population: " + country.population;
  persist(country);
  var borders = getNeibours(country);
  printNeibours(borders);
}

var persist = function( value ) {
  var country = JSON.parse(localStorage.getItem('country')) || {};
  country.name = value.name;
  country.capital = value.capital;
  country.population = value.population;
  country.borders = value.borders;
  country = JSON.stringify(country);
  localStorage.setItem('country', country);
}

var printPersist = function(item1,item2,item3) {
  var country = JSON.parse(localStorage.getItem('country')) || {};
  if(country) {
    item1.innerText = "Country: " + country.name;
    item2.innerText = "Capital: " + country.capital;
    item3.innerText = "Population: " + country.population;
  }
}

var getNeibours = function(country) {
  
  if(country.borders.length) {
    var neibours = [];
    for (var index = 0; index < country.borders.length; index++) {
      for(var i = 0; i < countries.length; i++) {
        if(country.borders[index] === countries[i].alpha3Code ) {
           neibours.push(countries[i]);
        }
      }
    }
  } else {
    console.log('empty');
  }
  return neibours;
}

var printNeibours = function(borders) {
  var body = document.getElementsByTagName("body")[0];
  var div = document.createElement('div');
  var h = document.createElement('h2');
  h.innerText = "Neibours";
  div.appendChild(h);
  for (var i = 0; i < borders.length; i++) {
    var p1 = document.createElement("p");
    var p2 = document.createElement("p");
    var p3 = document.createElement("p");
    p1.innerText = "Country: " + borders[i].name;
    p2.innerText = "Capital: " + borders[i].capital;
    p3.innerText = "Population: " + borders[i].population;
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);
  }

  body.appendChild(div);
   
}







 
