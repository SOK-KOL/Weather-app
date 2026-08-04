import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../../services/WeatherAPI";
import type { NowWeather } from "../../types";

export default function useWeather() {
  const [cityId, setCityId] = useState<number>(() => {
    const saved = localStorage.getItem("cityId");
    return saved ? Number(saved) : 1;
  });
  const [forecastDays, setForecastDays] = useState<number>(5);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("cityId", String(cityId));
  }, [cityId]);

  const {
    data: weather,
    isLoading,
    isFetching,
    error: queryError,
    refetch,
  } = useQuery({
    queryKey: ["weather", cityId, forecastDays],
    queryFn: async () => {
      const result = await fetchWeather(cityId, forecastDays);
      if (result.error) {
        setError(result.error);
        return null;
      }
      return result.data;
    },
    enabled: !!cityId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (queryError) {
      setError("Ошибка загрузки погоды");
    } else {
      setError(null);
    }
  }, [queryError]);

  return {
    weather: weather as NowWeather,
    isLoading,
    isFetching,
    error,
    refetch,
    cityId,
    setCityId,
    forecastDays,
    setForecastDays,
  };
}
