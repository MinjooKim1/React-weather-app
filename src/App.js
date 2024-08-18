import { useCallback, useEffect, useState } from "react";
import "./App.css";
import WeatherBox from "./component/WeatherBox";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [weather, setWeather] = useState(null);
  const cities = ["paris", "new york", "tokyo", "seoul"];
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setAPIError] = useState("");

  const getCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  }, []);

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      setLoading(true);
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bee515905d06c4bede361bb1ed411794&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setAPIError(err.message);
      setLoading(false);
    }
  };

  const getWeatherByCity = useCallback(async () => {
    if (!city) return;

    try {
      setLoading(true);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bee515905d06c4bede361bb1ed411794&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setAPIError(err.message);
      setLoading(false);
    }
  }, [city]);

  useEffect(() => {
    if (city === null) {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city, getCurrentLocation, getWeatherByCity]);

  const handleCityChange = (selectedCity) => {
    if (selectedCity === "current") {
      setCity(null);
    } else {
      setCity(selectedCity);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader
            color="#f88c6b"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : apiError ? (
        <div className="container">
          <h3>Error: {apiError}</h3>
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton
            cities={cities}
            handleCityChange={handleCityChange}
            selectedCity={city}
          />
        </div>
      )}
    </div>
  );
}

export default App;
