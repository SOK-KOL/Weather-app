import TempChart from "../../components/Charts/Temp/TempChart";
import BackButton from "../../components/Layout/BackButton";
import { useLocation } from "react-router-dom";
import HumidityChart from "../../components/Charts/Humidity/HumidityChart";
import WindChart from "../../components/Charts/Wind/WindChart";
import Table from "../../components/Table/Table";
import Location from "../../assets/icons/location.svg?react";
import "./Details.scss";
import Loader from "../../components/UI/Loader";
import { useAppContext } from "../../context/AppContext";

function Details() {
  const { weather, scale, isFetching, isLoading, pressureUnits, forecastDays } =
    useAppContext();

  const location = useLocation();
  const weatherFromState = location.state?.weather;

  const currentWeather = weather || weatherFromState;

  if (!currentWeather) {
    return <div>Нет данных</div>;
  }

  const infoWeather = currentWeather.forecast.forecastday.map((day: any) => {
    const hours = day.hour;
    const noon = hours.find((h: any) => h.time.includes("12:00"));
    const morning = hours.find((h: any) => h.time.includes("06:00"));
    const evening = hours.find((h: any) => h.time.includes("18:00"));

    return {
      day:
        forecastDays === 5
          ? new Date(day.date).toLocaleDateString("ru", { weekday: "short" })
          : new Date(day.date).toLocaleDateString("ru", {
              day: "numeric",
            }),
      tableDay: new Date(day.date).toLocaleDateString("ru"),
      morning:
        scale === "C"
          ? Math.round(morning?.temp_c)
          : Math.round(morning?.temp_f),
      dayTime:
        scale === "C" ? Math.round(noon?.temp_c) : Math.round(noon?.temp_f),
      evening:
        scale === "C"
          ? Math.round(evening?.temp_c)
          : Math.round(evening?.temp_f),
      humidity: day.day.avghumidity,
      wind: Math.round(day.day.maxwind_kph / 3.6),
      pressure:
        pressureUnits === "hydrargyrum"
          ? Math.round(noon.pressure_mb * 0.750062) + " мм. рт. ст."
          : noon.pressure_mb + " гПа",
    };
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="details">
      <div className="container">
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
    </div>
  );
}

export default Details;
