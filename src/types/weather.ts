import type { NowWeather } from "./index";

export interface WeatherResponse {
  data: NowWeather | null;
  error: string | null;
}
