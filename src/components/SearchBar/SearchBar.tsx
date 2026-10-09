import Find from "../../assets/icons/find.svg?react";
import "../SearchBar/SearchBar.scss";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { popularCities } from "../../data/PopularCities";

interface SearchBarProps {
  onCityChange: (city: number | string) => void;
  error: string | null;
}

function SearchBar({ onCityChange, error }: SearchBarProps) {
  const KEY = import.meta.env.VITE_WEATHER_API_KEY;
  // Берем данные из input
  const [search, setSearch] = useState<string>("");
  //Иницируем подсказки если input в фокусе
  const [focus, setFocus] = useState<boolean>(false);
  // Стрелочки
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  // Получаем данные из формы
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (search.trim() !== "") {
      console.log(search);
      onCityChange(search.trim());
      setSearch("");
    }
  };

  //Делаем подсказки по набору города
  const fetchSuggestions = async (query: string) => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 1) {
      return [];
    }
    const response = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=${KEY}&q=${encodeURIComponent(trimmedQuery)}&lang=ru`,
    );

    if (!response.ok) {
      return [];
    }

    return response.json();
  };

  const { data: suggestions = [] } = useQuery({
    queryKey: ["suggestions", search],
    queryFn: () => fetchSuggestions(search),
    enabled: search.trim().length >= 1,
    staleTime: 50,
  });

  // Фильтрация не валидных подсказок
  const validSuggestions = suggestions.filter(
    (city: any) => city.name && city.url,
  );

  const displaySuggestions =
    search.trim() === "" ? popularCities : validSuggestions;
  console.log(validSuggestions);
  //Отправка запроса
  const handleSelectSuggestion = (city: any) => {
    setSearch("");
    setFocus(false);
    onCityChange(city.id);
  };

  //Управление с клавиатуры
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < displaySuggestions.length - 1 ? prev + 1 : prev,
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    }

    if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      const city = displaySuggestions[selectedIndex];
      handleSelectSuggestion(city);
      setSelectedIndex(-1);
    }

    if (e.key === "Escape") {
      setFocus(false);
      setSelectedIndex(-1);
    }
  };

  return (
    <div className="search-bar">
      <form className="search-bar__form" onSubmit={handleSubmit}>
        <div className="search-bar__input-wrapper">
          {error && search === "" && (
            <span className="search-bar__input-error show">{error}</span>
          )}
          <input
          name="search city"
            type="text"
            className="search-bar__input"
            placeholder="Введите город"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
<button className="search-bar__button">
          <Find />
          <p className="search-bar__button-text">Найти</p>
        </button>
          {focus && (
            <ul className="search-bar__tips">
              {displaySuggestions
                .slice(0, 4)
                .map((city: any, index: number) => (
                  <li
                    className={`search-bar__tips-element ${
                      index === selectedIndex
                        ? "search-bar__tips-element--selected"
                        : ""
                    }`}
                    onMouseDown={() => handleSelectSuggestion(city)}
                    key={city.id}
                  >
                    {city.name}, {city.region} {city.country},
                  </li>
                ))}
            </ul>
          )}
        </div>
        
      </form>
    </div>
  );
}

export default SearchBar;
