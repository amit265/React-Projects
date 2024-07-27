import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState(localStorage.getItem("city") || "");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (city) {
      fetchWeather(city);
    }
  }, []);

  const fetchWeather = async (city) => {
    try {
      const apiKey = "12583aec2c489b0ccf44f0e7af7a7007";
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      console.log("weatherResponse");
      console.log(weatherResponse);

      setWeather(weatherResponse.data);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      console.log("forecastResponse");
      console.log(forecastResponse);
      setForecast(
        forecastResponse.data.list.filter((_, index) => index % 8 === 0)
      );
      localStorage.setItem("city", city);
      setError("");
    } catch (error) {
      setError("City not found");
      setWeather(null);
      setForecast([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeather(city);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-5 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-center mb-5">Weather App</h1>
        <form className="mb-4" onSubmit={handleSearch}>
          <input
            type="text"
            name=""
            id=""
            className="w-full px-3 py-2 border rounded"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
          />
          <button
            className="mt-2 w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            type="submit"
          >
            Search
          </button>
        </form>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {weather && (
          <div className="mb-5">
            <h2 className="text-xl font-bold"> {weather.name} </h2>
            <p>{weather.weather[0].description}</p>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        )}
        {forecast.length > 0 && (
          <div>
            <h2 className="text-xl font-bold">5-Day Forecast</h2>
            <div className="grid grid-cols-2 gap-4">
              {forecast.map((day, index) => (
                <div key={index} className="p-3 bg-gray-100 rounded">
                  <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
                  <p>{day.weather[0].description}</p>
                  <p>Temp: {day.main.temp}°C</p>
                  <p>Humidity: {day.main.humidity}%</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Weather;
