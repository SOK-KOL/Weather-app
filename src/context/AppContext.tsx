import { createContext, useState, useContext } from "react";
import useOpen from "../Hooks/useOpen";
import useWeather from "../Hooks/useWeather";
import type { Scale } from "../Types/Scale";
import type { NowWeather, ForecastDay } from "../Types/Index";

type AppContextType = {
  weather: NowWeather | null;
  isLoading: boolean;
  isFetching: boolean;
  error: string | null;
  refetch: () => void;
  cityId: number;
  setCityId: (id: number) => void;
  scale: Scale;
  setScale: (scale: Scale) => void;
  pressureUnits: string;
  setPressureUnits: (pressure: string) => void;
  forecastDays: number;
  setForecastDays: (days: number) => void;
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  selectedDay: ForecastDay | null;
  setSelectedDay: (day: ForecastDay | null) => void;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState<Scale>("C");
  const [pressureUnits, setPressureUnits] = useState<string>("hydrargyrum");
  const [selectedDay, setSelectedDay] = useState<ForecastDay | null>(null);
  const sidebar = useOpen();
  const modal = useOpen();
  const {
    weather,
    isLoading,
    cityId,
    error,
    forecastDays,
    isFetching,
    refetch,
    setCityId,
    setForecastDays,
  } = useWeather();

  const value = {
    // погодные
    weather,
    isLoading,
    isFetching,
    error,
    refetch,
    cityId,
    setCityId,
    // настройки
    scale,
    setScale,
    pressureUnits,
    setPressureUnits,
    forecastDays,
    setForecastDays,
    // sidebar
    isSidebarOpen: sidebar.isOpen,
    openSidebar: sidebar.open,
    closeSidebar: sidebar.close,
    // modal
    isModalOpen: modal.isOpen,
    openModal: modal.open,
    closeModal: modal.close,
    // выбранный день
    selectedDay,
    setSelectedDay,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext должен использоваться внутри AppProvider");
  }
  return context;
}
