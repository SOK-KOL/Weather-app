import "./CurrentWeather.scss";
import { WeatherSvg } from "weather-icons-animated";
import Wind from "../../assets/icons/wind.svg?react";
import Humidity from "../../assets/icons/humidity.svg?react";
import Pressure from "../../assets/icons/pressure.svg?react";
import Visibility from "../../assets/icons/visibility.svg?react";
import Region from "../../assets/icons/region.svg?react";
import type { NowWeather } from "../../types";
import { useEffect } from "react";
import { getStatusWeather } from "../../Utils/WeatherStatus";
import type { Scale } from "../../types/Scale";
import { useAppContext } from "../../context/AppContext";

interface CurrentWeatherProps {
  weatherData: NowWeather;
  scale: Scale;
  pressure: string;
}

function CurrentWeather({ weatherData, scale, pressure }: CurrentWeatherProps) {
  const { selectedDay } = useAppContext();
  const isDay = !!selectedDay;

  const noon = isDay
    ? (selectedDay!.hour.find((h) => h.time.includes("12:00")) ??
      selectedDay!.hour[0])
    : null;

  const tempC = isDay ? selectedDay!.day.maxtemp_c : weatherData.current.temp_c;
  const tempF = isDay ? selectedDay!.day.maxtemp_f : weatherData.current.temp_f;
  const feelsC = isDay ? noon!.feelslike_c : weatherData.current.feelslike_c;
  const feelsF = isDay ? noon!.feelslike_f : weatherData.current.feelslike_f;
  const humidity = isDay
    ? selectedDay!.day.avghumidity
    : weatherData.current.humidity;
  const windKph = isDay
    ? selectedDay!.day.maxwind_kph
    : weatherData.current.wind_kph;
  const pressureMb = isDay
    ? noon!.pressure_mb
    : weatherData.current.pressure_mb;
  const visKm = isDay ? selectedDay!.day.avgvis_km : weatherData.current.vis_km;
  const condition = isDay
    ? selectedDay!.day.condition
    : weatherData.current.condition;

  const windSpeedMPS = (windKph / 3.6).toFixed(1);
  const pressureMmHg = Math.round(pressureMb * 0.750062);
  const status = getStatusWeather(condition.code);

  const title = isDay
    ? new Date(selectedDay!.date).toLocaleDateString("ru", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : "Текущая погода";

  useEffect(() => {
    const fullCity = `${weatherData.location.name}, ${weatherData.location.country}, ${weatherData.location.region}`;
    localStorage.setItem("city", fullCity);
  }, [weatherData.location.name]);

  return (
    <div className="current-weather">
      <section className="current-weather__inner">
        <div className="current-weather__content">
          <div className="current-weather__left">
            <Region className="current-weather__content-map" />
            <div className="current-weather__info">
              <span className="current-weather__info-text">{title}</span>
              <h2 className="current-weather__info-city">
                {weatherData.location.name}
              </h2>
              <div className="current-weather__info-meteo">
                <span>{condition.text}</span>
                <WeatherSvg
                  className="current-weather__info-icon"
                  state={status}
                  width={30}
                  height={30}
                />
              </div>
            </div>
          </div>
          <div className="current-weather__temp">
            <h2 className="current-weather__temp-text">
              {Math.round(scale === "C" ? tempC : tempF)}
              {"\u00B0"}
            </h2>
            <p className="current-weather__temp-feels">
              Ощущается как{" "}
              <span className="current-weather__temp-feels--golden">
                {Math.round(scale === "C" ? feelsC : feelsF)}
                {"\u00B0"}
              </span>
            </p>
          </div>
          <div className="current-weather__right">
            <WeatherSvg
              className="current-weather__right-image"
              state={status}
            />
          </div>
        </div>

        <ul className="current-weather__details">
          <li className="current-weather__element">
            <Humidity />
            <p className="current-weather__element-text">Влажность</p>
            <p className="current-weather__element-info">{humidity}%</p>
          </li>

          <li className="current-weather__element">
            <Wind />
            <p className="current-weather__element-text">Ветер</p>
            <p className="current-weather__element-info">{windSpeedMPS} м/с</p>
          </li>
          <li className="current-weather__element">
            <Pressure />
            <p className="current-weather__element-text">Давление</p>
            <p className="current-weather__element-info">
              {pressure === "hydrargyrum"
                ? pressureMmHg + " мм"
                : pressureMb + " гПа"}
            </p>
          </li>
          <li className="current-weather__element">
            <Visibility />
            <p className="current-weather__element-text">Видимость</p>
            <p className="current-weather__element-info">{visKm} км</p>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default CurrentWeather;
