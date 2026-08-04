import { createContext, useState, useContext } from "react";
import useSidebar from "../components/hooks/useSidebar";
import useWeather from "../components/hooks/useWeather";
import type { Scale } from "../types/Scale";
import type { NowWeather } from "../types";

type AppContextType = {
  weather: NowWeather;
  isLoading: boolean;
  isFetching: boolean;
  error: any;
  refetch: () => void;
  cityId: any;
  setCityId: (id: any) => void;
  scale: string;
  setScale: (scale: string) => void;
  pressureUnits: string;
  setPressureUnits: (pressure: string) => void;
  forecastDays: any;
  setForecastDays: (days: any) => void;
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
};
const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { isOpen, open, close } = useSidebar();
  const [scale, setScale] = useState<string>("C");
  const [pressureUnits, setPressureUnits] = useState<string>("hydrargyrum");

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
    //хуки погодные
    weather,
    isLoading,
    isFetching,
    error,
    refetch,
    cityId,
    setCityId,
    // хуки настроек
    scale,
    setScale,
    pressureUnits,
    setPressureUnits,
    forecastDays,
    setForecastDays,
    // хуки sidebar
    isSidebarOpen: isOpen,
    openSidebar: open,
    closeSidebar: close,
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
