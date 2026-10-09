import "../ForecastList/ForecastList.scss";
import { WeatherSvg } from "weather-icons-animated";
import type { NowWeather } from "../../types";
import type { Scale } from "../../types/Scale";
import { getStatusWeather } from "../../utils/WeatherStatus";
import Wind from "../../assets/icons/wind.svg?react";
import { getWindWays } from "../../utils/WeatherWay";

interface ForecastProps {
  forecastData: NowWeather;
  scale: Scale;
  forecastDays: number;
  setForecastDays: (day: number) => void;
}

function ForecastList({
  forecastData,
  scale,
  forecastDays,
  setForecastDays,
}: ForecastProps) {
  const days = forecastData.forecast.forecastday;

  const getWeekDayShort = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("ru", {
      day: "numeric",
      month: "numeric"
    });
  };

  
  const firstWeek = days.slice(0, 7);
  const secondWeek = days.slice(7, 14);

  return (
    <div className="forecast">
      <form className="forecast__form">
        <p className="forecast__form-title">Прогноз на </p>

        <input
          className="forecast__form-input"
          type="radio"
          name="forecast"
          id="five"
          value={5}
          checked={forecastDays === 5}
          onChange={(e) => setForecastDays(Number(e.target.value))}
        />
        <label className="forecast__form-label" htmlFor="five">
          5
        </label>

        <input
          className="forecast__form-input"
          type="radio"
          name="forecast"
          id="fourteen"
          value={14}
          checked={forecastDays === 14}
          onChange={(e) => setForecastDays(Number(e.target.value))}
        />
        <label className="forecast__form-label" htmlFor="fourteen">
          14
        </label>
        <p className="forecast__form-title">дней</p>
      </form>

    
      <div className="forecast-mobile">
        
        <table className="forecast-table">
          <thead className="forecast-table__header">
            <tr>

            <th className="forecast-table__header-cell">День</th>
            </tr>
            <tr>
            <th className="forecast-table__header-cell">Погода</th>
            </tr>
            <tr>

            <th className="forecast-table__header-cell">°C</th>
            </tr>
          </thead>

          {firstWeek.map((day) => {
            const maxTemp = Math.round(scale === "C" ? day.day.maxtemp_c : day.day.maxtemp_f);
            const minTemp = Math.round(scale === "C" ? day.day.mintemp_c : day.day.mintemp_f);
            const weekDay = getWeekDayShort(day.date);

            return (
              <tbody key={day.date} className="forecast-table__row">
                <tr className="forecast-table__row-cell forecast-table__row-cell--day">
                  <td>{weekDay}</td>
                </tr>

                <tr className="forecast-table__row-cell forecast-table__row-cell--weather">
                 <td> {day.day.condition.text}</td>
                </tr>

                <tr className="forecast-table__row-cell forecast-table__row-cell--temp">
                 <td>{maxTemp}° / {minTemp}°</td> 
                </tr>
              </tbody>
            );
          })}
        </table>

       
        {forecastDays === 14 && secondWeek.length > 0 && (
          <div className="forecast-table">
            <div className="forecast-table__header">
              <div className="forecast-table__header-cell">День</div>
              <div className="forecast-table__header-cell">Погода</div>
              <div className="forecast-table__header-cell">°C</div>
            </div>

            {secondWeek.map((day) => {
              const maxTemp = Math.round(scale === "C" ? day.day.maxtemp_c : day.day.maxtemp_f);
              const minTemp = Math.round(scale === "C" ? day.day.mintemp_c : day.day.mintemp_f);
              const weekDay = getWeekDayShort(day.date);

              return (
                <div key={day.date} className="forecast-table__row">
                  <div className="forecast-table__row-cell forecast-table__row-cell--day">
                    {weekDay}
                  </div>

                  <div className="forecast-table__row-cell forecast-table__row-cell--weather">
                    {day.day.condition.text}
                  </div>

                  <div className="forecast-table__row-cell forecast-table__row-cell--temp">
                    {maxTemp}° / {minTemp}°
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>


      <ul className={`forecast-list ${forecastDays === 14 ? "forecast-list--large" : ""}`}>
        {days.map((day) => {
          const status = getStatusWeather(day.day.condition.code);
          const maxTempC = Math.round(day.day.maxtemp_c);
          const minTempC = Math.round(day.day.mintemp_c);
          const maxTempF = Math.round(day.day.maxtemp_f);
          const minTempF = Math.round(day.day.mintemp_f);

          const weekDay = new Date(day.date).toLocaleDateString("ru", {
            weekday: "short",
          });
          const date = new Date(day.date).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "short",
          });

          const wind = (day.day.maxwind_kph / 3.6).toFixed(1);
          const windWay = getWindWays(day.hour[12].wind_dir);

          return (
            <li
              key={day.date}
              className={`forecast-list__element ${
                forecastDays === 14 ? "forecast-list__element--small" : ""
              }`}
            >
              <p className="forecast-list__element-day">{weekDay}</p>
              <p className="forecast-list__element-date">{date}</p>

              <WeatherSvg
                state={status}
                className="forecast-list__element-icon"
              />

              <p className="forecast-list__element-temp">
                {scale === "C" ? maxTempC : maxTempF}
                {"\u00B0"} / {scale === "C" ? minTempC : minTempF}
                {"\u00B0"}
              </p>

              <div className={`forecast-list__element-wind ${forecastDays === 14 ? "forecast-list__element-wind--small" : ""}`}>
                <p className="forecast-list__element-wind-title">Ветер:</p>
                <div className="forecast-list__element-wind-container">
                  <div className="forecast-list__element-wind-speed">
                    <Wind />
                    <span className="forecast-list__element-wind-text">
                      {wind} м/с
                    </span>
                  </div>
                  <div className="forecast-list__element-wind-way">
                    <windWay.icon width={18} height={18} />
                    <span className="forecast-list__element-wind-text">
                      {windWay.shortText}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ForecastList;