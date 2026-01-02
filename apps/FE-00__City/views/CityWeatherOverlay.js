import { useEffect, useState } from "react";
import { cityWeather } from "../weather/cityWeatherEngine";

export default function CityWeatherOverlay() {
  const [weather, setWeather] = useState(cityWeather.weather);

  useEffect(() => {
    cityWeather.subscribe(newWeather => setWeather(newWeather));
  }, []);

  const effects = {
    Clear: null,
    Fog: <div className="weather-fog" />,
    NeonRain: <div className="weather-neon-rain" />,
    Sparks: <div className="weather-sparks" />,
    Fireworks: <div className="weather-fireworks" />,
    Aurora: <div className="weather-aurora" />
  };

  return (
    <div className="city-weather-overlay">
      {effects[weather]}
    </div>
  );
}