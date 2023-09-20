import React, { useState, useEffect } from "react";
import "./WeatherForecast.css";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  useEffect(
    function() {
      setLoaded(false);
    },
    [props.coordinates]
  );

  function handleResponse(response) {
    setForecast(response.data.list);
    setLoaded(true);
  }

  if (loaded) {
    return (
      <div className="WeatherForecast">
        <div className="row mt-3">
          {forecast.map(function(dailyForecast, index) {
            if (index < 5) {
              return (
                <div className="col" key={index}>
                  <WeatherForecastDay data={dailyForecast} />
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  } else {
    let apiKey = "c8a77112b2faf6684bb4b21a0aa778ae";
    let longitude = props.coordinates.lon;
    let latitude = props.coordinates.lat;
    let units = "imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(handleResponse);

    return null;
  }
}
