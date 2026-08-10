import type { WeatherResponse } from "../types/weather";

const KEY = import.meta.env.VITE_WEATHER_API_KEY;

const getNormalCity = (): string => {
  return localStorage.getItem("city") || "Москва";
};

export const searchCity = async (query: number | string) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=${KEY}&q=${typeof query === "number" ? `id:${query}` : encodeURIComponent(query)}`,
    );
    if (!response.ok) {
      throw new Error("Ошибка поиска");
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка поиска города:", error);
    return [];
  }
};

export const fetchWeather = async (
  cityId: number | string,
  days = 5,
): Promise<WeatherResponse> => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${typeof cityId === "number" ? `id:${cityId}` : encodeURIComponent(cityId)}&days=${days}&lang=ru`,
    );

    if (!response.ok) {
      const fallbackCity = getNormalCity();
      const result = await fetchWeather(fallbackCity, days);
      return {
        data: result.data,
        error: `Город с ID "${cityId}" не найден. Показана погода для "${fallbackCity}"`,
      };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error("Ошибка запроса:", error);
    const fallbackCity = getNormalCity();
    const result = await fetchWeather(fallbackCity, days);
    return {
      data: result.data,
      error: "Ошибка соединения. Показана сохранённая погода.",
    };
  }
};
