import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = () => {
  return (
    <div className="button-wrap">
      <Button variant="primary">Current Location</Button>
      <Button variant="primary">Seoul</Button>
      <Button variant="primary">London</Button>
    </div>
  );
};

export default WeatherButton;
