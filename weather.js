//*on load check geolocation, if it's allowed then fetch
//*data from API using geoloc coords and display it
window.addEventListener("load", () => {
  let lat;
  let long;
  let temperatureDegree = document.querySelector(".temperature-degree");
  let degree = document.querySelector(".degree");
  let temperatureDescription = document.querySelector(".temperature-desc");
  let degreeSection = document.querySelector(".degree-section");
  let localTimezone = document.querySelector(".location-zone");
  let iconID = document.querySelector(".icon");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const weatherApi = `https://api.darksky.net/forecast/a6bbe946f3b9bcde5f00363611c7397d/${lat},${long}?exclude=flags,alerts,daily`;

      fetch(weatherApi)
        .then(response => {
          return response.json();
        })
        .then(data => {
          let { temperature, summary, icon } = data.currently;
          const timeZone = data.timezone;
          temperature = Math.floor(temperature);

          //*Set DOM elements
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          localTimezone.textContent = timeZone;

          //*Celsius calculation
          let celsius = (temperature - 32) * (5 / 9);
          celsius = Math.floor(celsius);
          if (celsius < 10) {
            celsius = "0" + celsius;
          }

          //*set icon function call
          setIcons(icon, iconID);

          //*change celsius/farhenheit on click
          degreeSection.addEventListener("click", () => {
            if (degree.textContent === "F") {
              degree.textContent = "C";
              temperatureDegree.textContent = celsius;
            } else {
              degree.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  } else {
    console.log("Please allow geolocalization.");
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "#ececec" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});

//*https://api.darksky.net/forecast/a6bbe946f3b9bcde5f00363611c7397d/37.8267,-122.4233
//*https://darksky.net/dev/docs
