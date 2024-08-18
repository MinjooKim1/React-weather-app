import { useCallback, useEffect, useState } from "react";
import "./App.css";
import WeatherBox from "./component/WeatherBox";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

//1. 앱이 실행되자마자 현재위치기반의 날씨가 보인다.
//2. 날씨정보에는 도시, 섭씨, 화씨 날씨 상태
//3. 5개의 버튼 이 잇다 (1개는 현재위치, 4개늰 다른도시)
//4. 도시버튼을 클릭할때 마다 도시별 날씨가 나온다.
//5. 현재위치 버튼을 누르면 다시 현재위치로 돌아온다.
//6. 로딩스피드

function App() {
  const [weather, setWeather] = useState(null);
  const cities = ["paris", "new york", "tokyo", "seoul"];
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setAPIError] = useState("");
  const getCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  }, []);

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bee515905d06c4bede361bb1ed411794&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      const data = await response.json();

      setWeather(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
    }
  };

  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bee515905d06c4bede361bb1ed411794&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setAPIError(err.message);
    }
  };

  useEffect(() => {
    if (city == null) {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city, getCurrentLocation]);

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity(null);
    } else {
      setCity(city);
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
