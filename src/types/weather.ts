import type { NowWeather } from "../Types/Index";

export interface WeatherResponse {
  data: NowWeather | null;
  error: string | null;
}
