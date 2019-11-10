let newYorkClock = document.getElementById("nyClock");
let londonClock = document.getElementById("londonClock");
let tokyoCLock = document.getElementById("tokyoClock");
let losAngelesClock = document.getElementById("laClock");

function displayLocalTime() {
  let time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  let clock = document.getElementById("clock");

  //*Add 0 if seconds/minutes or hours is less than 10
  //*so it's always 2 digits making it look nicer
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }

  //*Set time displayed in HH:MM:SS format
  clock.textContent = hours + ":" + minutes + ":" + seconds;
}
function displayNewYorkTime() {
  //*Fetch the json data from the API
  fetch(
    `http://api.geonames.org/timezoneJSON?lat=40.71&lng=-74&username=nicolasmartine`
  )
    //*When the API responds return it
    .then(response => {
      return response.json();
    })
    //*and then do something with the data
    .then(data => {
      //*getting only the time from the format of data.time
      var timeString = data.time.substring(11);

      newYorkClock.textContent = timeString;
    });
}
function displayLondonTime() {
  fetch(
    `http://api.geonames.org/timezoneJSON?lat=51.5&lng=-0.1&username=nicolasmartine`
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      var timeString = data.time.substring(11);

      londonClock.textContent = timeString;
    });
}
function displayTokyoTime() {
  fetch(
    `http://api.geonames.org/timezoneJSON?lat=35.6&lng=139.8&username=nicolasmartine`
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      var timeString = data.time.substring(11);

      tokyoCLock.textContent = timeString;
    });
}
function displayLosAngelesTime() {
  fetch(
    `http://api.geonames.org/timezoneJSON?lat=34&lng=-118.2&username=nicolasmartine`
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      var timeString = data.time.substring(11);

      losAngelesClock.textContent = timeString;
    });
}
function citiesInitialization() {
  displayNewYorkTime();
  displayLondonTime();
  displayTokyoTime();
  displayLosAngelesTime();
}

setInterval(displayLocalTime, 1000);
//*initial fetch to get a display
citiesInitialization();
//* throttle fetch every minute
setInterval(displayNewYorkTime, 60000);
setInterval(displayLondonTime, 60000);
setInterval(displayTokyoTime, 60000);
setInterval(displayLosAngelesTime, 60000);

/*
!http://api.geonames.org/timezoneJSON?lat=48.01&lng=2.2&username=nicolasmartine (LatLng is Paris in this case)

!API DOC >>>
*Webservice Type : REST
*Base Url : api.geonames.org/timezone?
*Parameters : lat,lng, radius (buffer in km for closest *timezone in coastal areas),lang (for countryName), date (date for sunrise/sunset);
*Result : the timezone at the lat/lng with gmt offset (1. *January) and dst offset (1. July)
*Example(XML) http://api.geonames.org/timezone?lat=47.01&lng=10.2&username=demo

*This service is also available in JSON format : http://api.geonames.org/timezoneJSON?lat=47.01&lng=10.2&username=demo


*Element:
*countryCode: ISO countrycode
*countryName: name (language can be set with param lang)
*timezoneId: name of the timezone (according to olson), this *information is sufficient to work with the timezone and *defines DST rules, consult the documentation of your *development environment. Many programming environments *include functions based on the olson timezoneId (example *java TimeZone)
*time: the local current time
*sunset: sunset local time (date)
*sunrise: sunrise local time (date)
*rawOffset: the amount of time in hours to add to UTC to get *standard time in this time zone. Because this value is not *affected by daylight saving time, it is calledyraw offset.
*gmtOffset: offset to GMT at 1. January (deprecated)
*dstOffset: offset to GMT at 1. July (deprecated)
 */
/*
 *Useful list of timezones link >>> https://www.zeitverschiebung.net/fr/all-time-zones.html
 *Useful Lat Long link >>> https://www.latlong.net/

 !NewYork London Tokyo Los angeles
 */
