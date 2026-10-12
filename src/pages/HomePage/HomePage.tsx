import "./HomePage.scss";
import SearchBar from "../../Components/SearchBar/SearchBar";
import CurrentWeather from "../../Components/CurrentWeather/CurrentWeather";
import ForecastList from "../../Components/ForecastList/ForecastList";
import { searchCity } from "../../Services/WeatherAPI";
import Loader from "../../Components/UI/Loader";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

function HomePage() {
  const {
    weather,
    isLoading,
    isFetching,
    error,
    setCityId,
    scale,
    forecastDays,
    setForecastDays,
    pressureUnits,
  } = useAppContext();

  const handleCityChange = async (value: number | string) => {
    if (typeof value === "number") {
      setCityId(value);
    } else {
      const cities = await searchCity(value);
      if (cities.length > 0) {
        setCityId(cities[0].id);
      }
    }
  };

  if (isLoading || !weather) {
    return (
      <div className="weather">
        <div className="container">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="weather">
      <SearchBar onCityChange={handleCityChange} error={error} />

      {isFetching ? (
        <Loader />
      ) : (
        <>
          <CurrentWeather
            pressure={pressureUnits}
            scale={scale}
            weatherData={weather}
          />
          <ForecastList
            scale={scale}
            forecastData={weather}
            forecastDays={forecastDays}
            setForecastDays={setForecastDays}
          />
          <Link className="weather__link" to="/details" state={{ weather }}>
            Подробный прогноз
          </Link>
        </>
      )}
    </div>
  );
}

export default HomePage;
