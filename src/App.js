import { useCallback, useEffect, useState } from "react";
import "./App.css";
import WeatherBox from "./component/WeatherBox";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherButton from "./component/WeatherButton";

//1. 앱이 실행되자마자 현재위치기반의 날씨가 보인다.
//2. 날씨정보에는 도시, 섭씨, 화씨 날씨 상태
//3. 5개의 버튼 이 잇다 (1개는 현재위치, 4개늰 다른도시)
//4. 도시버튼을 클릭할때 마다 도시별 날씨가 나온다.
//5. 현재위치 버튼을 누르면 다시 현재위치로 돌아온다.
//6. 로딩스피드

function App() {
  const [weather, setWeather] = useState(null);
  const getCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  }, []);

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bee515905d06c4bede361bb1ed411794&units=metric`;
    let response = await fetch(url);
    const data = await response.json();
    console.log("data", data);
    setWeather(data);
  };

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  return (
    <div>
      <div className="container">
        <WeatherBox weather={weather} />
        <WeatherButton />
      </div>
    </div>
  );
}
export default App;
