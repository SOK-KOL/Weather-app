export type TempData = {
  day: string;
  morning: number; // температура утром
  dayTime: number; // температура днём
  evening: number; // температура вечером
};

export type WindData = {
  day: string;
  wind: number;
};

export type HumidityData = {
  day: string;
  humidity: number;
};
