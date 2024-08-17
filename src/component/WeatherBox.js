import React from "react";

const WeatherBox = ({ weather }) => {
  console.log("weather", weather);
  return (
    <div className="weather-box">
      <h4>{weather?.name}</h4>
      <div className="temp">
        <div>
          <p className="temp-text">Temperature</p>
          <h2>{weather?.main.temp}C</h2>
        </div>
        <div>
          <p className="temp-text">Fahrenheit</p>
          <h2>
            {Math.round(weather?.main.temp * 1.8 + 32)}F
            {/* 화씨 = 섭씨*1.8+32 */}
          </h2>
        </div>
      </div>

      <div>
        <p className="temp-text">Weather description:</p>
        <h3>{weather?.weather[0].description}</h3>
      </div>
    </div>
  );
};

export default WeatherBox;
