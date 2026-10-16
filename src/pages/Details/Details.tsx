import TempChart from "../../Components/Charts/Temp/TempChart";
import BackButton from "../../Components/Layout/BackButton";
import { useLocation } from "react-router-dom";
import HumidityChart from "../../Components/Charts/Humidity/HumidityChart";
import WindChart from "../../Components/Charts/Wind/WindChart";
import Table from "../../Components/Table/Table";
import Location from "../../assets/icons/location.svg?react";
import "./Details.scss";
import Loader from "../../Components/UI/Loader";
import { useAppContext } from "../../Context/AppContext";
import type { ForecastDay } from "../../Types/Index";
import type { Hour } from "../../Types/Index";

function Details() {
  const { weather, scale, isFetching, isLoading, pressureUnits, forecastDays } =
    useAppContext();

  const location = useLocation();
  const weatherFromState = location.state?.weather;

  if (isLoading) {
    return <Loader />;
  }

  const currentWeather = weather || weatherFromState;

  if (!currentWeather) {
    return <div>Нет данных</div>;
  }

  const infoWeather = currentWeather.forecast.forecastday.map(
    (day: ForecastDay) => {
      const hours = day.hour;
      const noon = hours.find((h: Hour) => h.time.includes("12:00"));
      const morning = hours.find((h: Hour) => h.time.includes("06:00"));
      const evening = hours.find((h: Hour) => h.time.includes("18:00"));

      return {
        day:
          forecastDays === 5
            ? new Date(day.date).toLocaleDateString("ru", { weekday: "short" })
            : new Date(day.date).toLocaleDateString("ru", { day: "numeric" }),
        tableDay: new Date(day.date).toLocaleDateString("ru"),
        morning:
          scale === "C"
            ? Math.round(morning?.temp_c ?? 0)
            : Math.round(morning?.temp_f ?? 0),
        dayTime:
          scale === "C"
            ? Math.round(noon?.temp_c ?? 0)
            : Math.round(noon?.temp_f ?? 0),
        evening:
          scale === "C"
            ? Math.round(evening?.temp_c ?? 0)
            : Math.round(evening?.temp_f ?? 0),
        humidity: day.day.avghumidity,
        wind: Math.round(day.day.maxwind_kph / 3.6),
        pressure:
          pressureUnits === "hydrargyrum"
            ? Math.round((noon?.pressure_mb ?? 0) * 0.750062) + " мм. рт. ст."
            : (noon?.pressure_mb ?? 0) + " гПа",
        longNameDay: new Date(day.date).toLocaleDateString("ru", {
          weekday: "long",
        }),
      };
    },
  );

  return (
    <div className="details">
      <BackButton />
      <p className="details__text">Подробный прогноз</p>
      <div className="details__location">
        <h2 className="details__location-city">
          {currentWeather.location.name}
        </h2>
        <span className="details__location-country">
          <Location />
          {currentWeather.location.country}
        </span>
      </div>
      <p className="details__info">Аналитика и данные на 5 дней вперёд</p>

      {isFetching ? (
        <Loader />
      ) : (
        <>
          <div className="details__charts">
            <div className="details__chart details__chart--temp">
              <TempChart temp={infoWeather} />
            </div>
            <div className="details__chart details__chart--humidity">
              <HumidityChart humidity={infoWeather} />
            </div>
            <div className="details__chart details__chart--wind">
              <WindChart wind={infoWeather} />
            </div>
          </div>
          <div className="details__table">
            <Table scale={scale} tableData={infoWeather} />
          </div>
        </>
      )}
    </div>
  );
}

export default Details;
