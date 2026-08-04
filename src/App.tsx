import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import HomePage from "./pages/HomePage/HomePage";
import Details from "./pages/Details/Details";
import { useAppContext } from "./context/AppContext";

function App() {
  const { openSidebar, refetch, isSidebarOpen, closeSidebar } = useAppContext();

  return (
    <div className="container">
      <Header onOpenSidebar={openSidebar} onRefresh={refetch} />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </div>
  );
}
export default App;
