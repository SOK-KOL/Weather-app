import { createContext, useState, useContext } from "react";
import useOpen from "../Hooks/useOpen";
import useWeather from "../Hooks/useWeather";
import type { Scale } from "../Types/Scale";
import type { NowWeather } from "../Types";

type AppContextType = {
  weather: NowWeather | null;
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
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
};
const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState<Scale>("C");
  const [pressureUnits, setPressureUnits] = useState<string>("hydrargyrum");
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
    isSidebarOpen: sidebar.isOpen,
    openSidebar: sidebar.open,
    closeSidebar: sidebar.close,
    // хуки ModalWeather
    isModalOpen: modal.isOpen,
    openModal: modal.open,
    closeModal: modal.close,
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
