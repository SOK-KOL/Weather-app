export type NowWeather = {
  // Погода
  current: {
    temp_c: number; // Текущая температура (Цельсий)
    temp_f: number; // Текущая температура (Фаренгейт)
    feelslike_c: number; // Ощущается как (Цельсий)
    feelslike_f: number; // Ощущается как (Фаренгейт)
    icon: string; // Код иконки (01d, 02n...)
    humidity: number; // Влажность (%)
    wind_kph: number; // Скорость ветра (км/ч)
    pressure_mb: number; // Давление в миллибарах
    vis_km: number; // Видимость в км
    condition: {
      code: number;
      text: string;
    };
  };
  //  Город, страна
  location: {
    country: string; // Страна
    name: string; // Наименование города
    region: string;
  };

  // Прогноз
  forecast: {
    forecastday: ForecastDay[];
  };
};

// Содержимое forecast
export type ForecastDay = {
  date: string;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avghumidity: number;
    maxwind_kph: number;
    condition: {
      text: string;
      code: number;
    };
  };
  hour: Hour[];
};

type Hour = {
  time: string;
  temp_c: number;
  humidity: number;
  wind_kph: number;
  condition: {
    text: string;
    code: number;
  };
  wind_dir: string;
};
