import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({ cities, handleCityChange, selectedCity }) => {
  console.log("cities", cities);

  return (
    <div className="button-wrap">
      <Button
        variant={`${selectedCity === null ? "primary" : "warning"}`}
        onClick={() => handleCityChange("current")}
      >
        Current Location
      </Button>

      {cities.map((city) => (
        <Button
          variant={`${selectedCity === city ? "primary" : "warning"}`}
          onClick={() => handleCityChange(city)}
        >
          {city}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
