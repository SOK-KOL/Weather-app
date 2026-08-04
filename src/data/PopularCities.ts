interface PopularCities {
  id: number;
  name: string;
  region: string;
  country: string;
}
export const popularCities: PopularCities[] = [
  { id: 2145091, name: "Москва", region: `Moscow city`, country: "Россия" },
  {
    id: 2618724,
    name: "Нью-Йорк",
    region: "New York",
    country: "Соединенные Штаты Америки",
  },
  {
    id: 2801268,
    country: "Великобритания",
    name: "Лондон",
    region: "City of London, Greater London",
  },
  { country: "Франция", id: 803267, name: "Париж", region: "Ile-de-France" },
];
