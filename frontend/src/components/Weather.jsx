// Weather.jsx
import React, { useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [background, setBackground] = useState(
    "url(https://source.unsplash.com/1600x900/?weather)"
  );
  const [theme, setTheme] = useState({ bg: "btn-primary" });

  const getWeather = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${API_URL}/api/weather/${city}`);
      setWeather(response.data);
      updateTheme(response.data.description);
    } catch (err) {
      setError("City not found or API error!");
      setWeather(null);
      setBackground("url(https://source.unsplash.com/1600x900/?weather)");
      setTheme({ bg: "btn-primary" });
    } finally {
      setLoading(false);
    }
  };

  const updateTheme = (description) => {
    const descLower = description.toLowerCase();
    if (descLower.includes("clear")) {
      setBackground("url(https://source.unsplash.com/1600x900/?clear,sky)");
      setTheme({ bg: "btn-warning" });
    } else if (descLower.includes("cloud")) {
      setBackground("url(https://source.unsplash.com/1600x900/?cloudy)");
      setTheme({ bg: "btn-secondary" });
    } else if (descLower.includes("rain") || descLower.includes("drizzle")) {
      setBackground("url(https://source.unsplash.com/1600x900/?rain)");
      setTheme({ bg: "btn-info" });
    } else if (descLower.includes("snow")) {
      setBackground("url(https://source.unsplash.com/1600x900/?snow)");
      setTheme({ bg: "btn-light text-dark" });
    } else if (descLower.includes("thunderstorm")) {
      setBackground("url(https://source.unsplash.com/1600x900/?thunderstorm)");
      setTheme({ bg: "btn-dark" });
    } else {
      setBackground("url(https://source.unsplash.com/1600x900/?weather)");
      setTheme({ bg: "btn-primary" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) getWeather();
  };

  return (
    <div
      className="d-flex min-vh-100 align-items-center justify-content-center bg-cover bg-center"
      style={{
        backgroundImage: background,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "all 0.7s ease",
      }}
    >
      <div
        className="card shadow-lg p-4 rounded-4 border-0 bg-white bg-opacity-75"
        style={{
          backdropFilter: "blur(10px)",
          maxWidth: "420px",
          width: "100%",
        }}
      >
        <h2 className="text-center fw-bold mb-4 text-primary">
          🌤 Weather Forecast
        </h2>

        <form onSubmit={handleSubmit} className="d-flex mb-4 gap-2">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="form-control"
          />
          <button
            type="submit"
            className={`btn ${theme.bg}`}
            disabled={loading}
          >
            {loading ? (
              <div
                className="spinner-border spinner-border-sm text-light"
                role="status"
              ></div>
            ) : (
              "Get Weather"
            )}
          </button>
        </form>

        {error && (
          <p className="text-danger text-center fw-semibold">{error}</p>
        )}

        {weather && (
          <div className="text-center">
            <img
              src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt="weather icon"
              className="mx-auto mb-2"
              style={{ width: "70px", height: "70px" }}
            />
            <p className="fs-5 fw-bold">🌡 Temperature: {weather.temp}°C</p>
            <p className="fs-6">Pressure: {weather.pressure} hPa</p>
            <p className="fs-6">Humidity: {weather.humidity}%</p>
            <p className="fs-6 text-capitalize">
              Condition: {weather.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
