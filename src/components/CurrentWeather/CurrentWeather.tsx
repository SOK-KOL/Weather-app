import "./CurrentWeather.scss";
import { WeatherSvg } from "weather-icons-animated";
import Wind from "../../assets/icons/wind.svg?react";
import Humidity from "../../assets/icons/humidity.svg?react";
import Pressure from "../../assets/icons/pressure.svg?react";
import Visibility from "../../assets/icons/visibility.svg?react";
import Region from "../../assets/icons/region.svg?react";
import type { NowWeather } from "../../types";
import { useEffect } from "react";
import { getStatusWeather } from "../../utils/WeatherStatus";
import type { Scale } from "../../types/Scale";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade } from "swiper/modules";
import "./Swiper.scss"
import "swiper/css";
import "swiper/css/pagination";
interface CurrentWeatherProps {
  weatherData: NowWeather;
  scale: Scale;
  pressure: string;
}

function CurrentWeather({ weatherData, scale, pressure }: CurrentWeatherProps) {
  console.log(weatherData);
  const windSpeedMPS: string = (weatherData.current.wind_kph / 3.6).toFixed(1);
  const pressureMmHg: number = Math.round(
    weatherData.current.pressure_mb * 0.750062,
  );
  const pressureMb = weatherData.current.pressure_mb;
  const status = getStatusWeather(weatherData.current.condition.code);

  // Сохранение в localStorage
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
              <span className="current-weather__info-text">Текущая погода</span>
              <h2 className="current-weather__info-city">
                {weatherData.location.name}
              </h2>
              <div className="current-weather__info-meteo">
                <span>{weatherData.current.condition.text}</span>
                <WeatherSvg className="current-weather__info-icon" state={status} width={30} height={30} />
              </div>
            </div>
          </div>
          <div className="current-weather__temp">
            <h2 className="current-weather__temp-text">
              {Math.round(
                scale === "C"
                  ? weatherData.current.temp_c
                  : weatherData.current.temp_f,
              )}

              {"\u00B0"}
            </h2>
            <p className="current-weather__temp-feels">
              Ощущается как{" "}
              <span className="current-weather__temp-feels--golden">
                {Math.round(
                  scale === "C"
                    ? weatherData.current.feelslike_c
                    : weatherData.current.feelslike_f,
                )}
                {"\u00B0"}
              </span>
            </p>
          </div>
          <div className="current-weather__right">
             <Region className="current-weather__right-image" />
          </div>
        </div>

        <Swiper
        modules={[Pagination,]}
        pagination={{ clickable: true }}
        slidesPerView={1} spaceBetween={15} breakpoints={{
   0: {
      slidesPerView: 1,
      loop: true
     
    },
    481: {
      slidesPerView: 2,     
      loop: false
        
    },
    
    769: {
      slidesPerView: 4,      
      
    }
  }} 
        className="current-weather__details">
          <SwiperSlide className="current-weather__element">
            <Humidity />
            <p className="current-weather__element-text">Влажность</p>
            <p className="current-weather__element-info">
              {weatherData.current.humidity}%
            </p>
          </SwiperSlide>

          <SwiperSlide className="current-weather__element">
            <Wind />
            <p className="current-weather__element-text">Ветер</p>
            <p className="current-weather__element-info">{windSpeedMPS} м/c</p>
          </SwiperSlide>
          <SwiperSlide className="current-weather__element">
            <Pressure />
            <p className="current-weather__element-text">Давление</p>
            <p className="current-weather__element-info">
              {pressure === "hydrargyrum"
                ? pressureMmHg + " мм. рт. ст."
                : pressureMb + " гПа"}
            </p>
          </SwiperSlide>
          <SwiperSlide className="current-weather__element">
            <Visibility />
            <p className="current-weather__element-text">Видимость</p>
            <p className="current-weather__element-info">
              {weatherData.current.vis_km} км
            </p>
          </SwiperSlide>
        </Swiper>
      </section>
    </div>
  );
}

export default CurrentWeather;
