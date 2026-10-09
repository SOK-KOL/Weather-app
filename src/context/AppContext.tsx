import { createContext, useState, useContext } from "react";
import useOpen from "../hooks/useOpen";
import useWeather from "../hooks/useWeather";
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
  scale: Scale;
  setScale: (scale: Scale) => void;
  pressureUnits: string;
  setPressureUnits: (pressure: string) => void;
  forecastDays: any;
  setForecastDays: (days: any) => void;
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => boolean;
};
const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { isOpen, open, close } = useOpen();
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
