console.log("Hello World!");

const apiKey = "9daf452fc2d70c0bd86a388fa34dbdf2";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search img");
// var city = "Dhaka";

async function check(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();

  console.log(data);

  document.getElementById("currentTemp").innerHTML = Math.round(data.main.temp);
  document.getElementById("realFeel").innerHTML = Math.round(data.main.feels_like) + "°C";
  document.getElementById("weatherCondition").innerHTML = data.weather[0].main;
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".min").innerHTML = Math.round(data.main.temp_min) + "°C";
  document.querySelector(".max").innerHTML = Math.round(data.main.temp_max) + "°C";
  document.querySelector(".pressure").innerHTML = (data.main.pressure / 1000) + " atm";
  document.querySelector(".visibility").innerHTML = Math.round(data.visibility / 1000) + " km";
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".country").innerHTML = data.sys.country;
  document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/h";

  const lat = data.coord.lat;
  const lon = data.coord.lon;

  function fetchSunTimes(lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.sys) {
                const sunriseUTC = new Date(data.sys.sunrise * 1000);
                const sunsetUTC = new Date(data.sys.sunset * 1000);

                // Convert UTC time to local time
                const sunriseLocal = sunriseUTC.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const sunsetLocal = sunsetUTC.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                document.getElementById('sunrise').textContent = sunriseLocal;
                document.getElementById('sunset').textContent = sunsetLocal;
            } else {
                console.error('Failed to retrieve sun times');
            }
        })
        .catch(error => console.error('Error fetching sun times:', error));
}

  fetchSunTimes(lat, lon);

  const wearherCon = ["Clear", "Clouds", "Haze", "Drizzle", "Mist", "Rain", "Snow"];


}

searchBtn.addEventListener("click", () => (check(searchBox.value)));
searchBox.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        check(searchBox.value)
    }
});


document.addEventListener('DOMContentLoaded', (event) => {
  function updateTime() {
    
      const now = new Date();

      const hr = now.getHours();
        const period = hr >= 12 ? 'PM' : 'AM';

        // Convert hours to 12-hour format
        hrs = hr % 12;

      const hours = hrs.toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');

      const formattedTime = `${hours}:${minutes}:${seconds} ${period}`;
      document.getElementById('time').textContent = formattedTime;
  }

  updateTime(); // Initial call to display the time immediately
  setInterval(updateTime, 1000); // Update the time every second
});

document.addEventListener('DOMContentLoaded', (event) => {
  function updateDate() {
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
      const now = new Date();
      const day = now.getDate().toString().padStart(2, '0');
      const month = monthNames[now.getMonth()].toString(); // Months are zero-based
      const year = now.getFullYear();

      const formattedDate = `${day}-${month}-${year}`;
      document.getElementById('date').textContent = formattedDate;
  }

  updateDate(); // Initial call to display the date immediately
  setInterval(updateDate, 86400000); // Update the date every 24 hours
});


document.addEventListener('DOMContentLoaded', (event) => {
  const apiKey = '9daf452fc2d70c0bd86a388fa34dbdf2';

  function fetchSunTimes(lat, lon) {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
              if (data.sys) {
                  const sunriseUTC = new Date(data.sys.sunrise * 1000);
                  const sunsetUTC = new Date(data.sys.sunset * 1000);

                  // Convert UTC time to local time
                  const sunriseLocal = sunriseUTC.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  const sunsetLocal = sunsetUTC.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                  document.getElementById('sunrise').textContent = sunriseLocal;
                  document.getElementById('sunset').textContent = sunsetLocal;
              } else {
                  console.error('Failed to retrieve sun times');
              }
          })
          .catch(error => console.error('Error fetching sun times:', error));
  }

  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
              const lat = position.coords.latitude;
              const lon = position.coords.longitude;
              fetchSunTimes(lat, lon);
          }, error => {
              console.error('Error getting location:', error);
          });
      } else {
          console.error('Geolocation is not supported by this browser.');
      }
  }

  getLocation();
});