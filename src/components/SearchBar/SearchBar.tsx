import Find from "../../assets/icons/find.svg?react";
import "../SearchBar/SearchBar.scss";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { popularCities } from "../../Data/PopularCities";
import type { CitySuggestion } from "../../Types/CitySuggestion";

interface SearchBarProps {
  onCityChange: (city: number | string) => void;
  error: string | null;
}

function SearchBar({ onCityChange, error }: SearchBarProps) {
  const KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [focus, setFocus] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // Debounce: обновляем debouncedSearch через 400мс после последнего ввода
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 400);

    return () => clearTimeout(t);
  }, [search]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (search.trim() !== "") {
      onCityChange(search.trim());
      setSearch("");
    }
  };

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
    queryKey: ["suggestions", debouncedSearch],
    queryFn: () => fetchSuggestions(debouncedSearch),
    enabled: debouncedSearch.length >= 2,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const validSuggestions = suggestions.filter(
    (city: CitySuggestion) => city.name && city.url,
  );

  const displaySuggestions =
    search.trim() === "" ? popularCities : validSuggestions;

  const handleSelectSuggestion = (city: CitySuggestion) => {
    setSearch("");
    setFocus(false);
    onCityChange(city.id);
  };

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
                .map((city: CitySuggestion, index: number) => (
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
