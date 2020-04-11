      //declaring lat and lon
      let lat, lon;

      // Geolocation and filling info
      navigator.geolocation.getCurrentPosition(async position => {
          try {
              lat = position.coords.latitude;
              lon = position.coords.longitude;
              document.getElementById('latitude').textContent = lat.toFixed(2);
              document.getElementById('longitude').textContent = lon.toFixed(2);
              const api_key = '83bec744cba61f625529492cd5db35c7'
              const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
              const weather_response = await fetch(weather_url);
              const weather = await weather_response.json();
              console.log(weather);

              const aq_url = `https://api.openaq.org/v1/latest?coordinates=40.73,-73.99`
              const aq_response = await fetch(aq_url);
              const aq_data = await aq_response.json();
              console.log(aq_data);
              console.log(aq_data.results[1].measurements[0]);
              const air = aq_data.results[1].measurements[0];


              document.getElementById('summary').textContent = weather.weather[0].main;
              document.getElementById('temperature').textContent = weather.main.temp - 273.15;
              document.getElementById('aq_parameter').textContent = air.parameter;
              document.getElementById('aq_value').textContent = air.value;
              document.getElementById('aq_units').textContent = air.unit;
              document.getElementById('aq_date').textContent = air.lastUpdated;

              const data = {
                  lat,
                  lon,
                  weather,
                  air
              };
              const options = {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(data)
              };
              const db_response = await fetch('/api', options);
              const db_json = await db_response.json();
              console.log(db_json);

          } catch (error) {
              console.log(error)
          }
      });