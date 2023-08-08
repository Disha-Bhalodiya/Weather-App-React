import "./Weather.css";
import React, { useState } from "react";

const WeatherApp = () => {
  const [weatherDisplay, setWeatherDisplay] = useState("block");

  const weatherapi = {
    key: "your key",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather",
  };

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState();

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      getWeatherReport(city);
    }
  };

  const getWeatherReport = (city) => {
    fetch(
      `${weatherapi.baseUrl}?q=${city}&appid=${weatherapi.key}&units=metric`
    )
      .then((weather) => weather.json())
      .then((data) => setWeatherData(data));
    console.log(city);
    console.log(weatherData);
  };

  const datemanage = (datearg) => {
    const days = [
      "sunday",
      "monday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const months = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "december",
    ];

    const year = datearg.getFullYear();
    const month = months[datearg.getMonth()];
    const date = datearg.getDate();
    const day = days[datearg.getDay()];

    return `${date} ${month} ${day} ${year}`;
  };

  return (
    <div className="main">
      <div className="input">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="Here enter city name..."
        />
      </div>{" "}
      {weatherData && (
        <div className="weather-body" style={{ display: weatherDisplay }}>
          <div className="location">
            <div className="city" id="city">
              {" "}
              {`${weatherData.name}, ${weatherData.sys.country}`}{" "}
            </div>{" "}
            <div className="date" id="date">
              {" "}
              {datemanage(new Date())}{" "}
            </div>{" "}
          </div>{" "}
          <div className="weather-status">
            <div className="temp" id="temp">
              {" "}
              {`${Math.floor(weatherData.main.temp)}°C`}{" "}
            </div>{" "}
            <div className="min-max" id="min-max">
              {" "}
              {`${Math.floor(weatherData.main.temp_min)}°C (Min) / ${Math.ceil(
                weatherData.main.temp_max
              )}°C (Max)`}{" "}
            </div>{" "}
            <div className="weather" id="weather">
              {" "}
              {weatherData.weather[0].main}{" "}
            </div>
          </div>{" "}
        </div>
      )}{" "}
    </div>
  );
};

export default WeatherApp;
