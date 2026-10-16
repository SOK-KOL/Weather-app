import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import HomePage from "./Pages/HomePage/HomePage";
import Details from "./Pages/Details/Details";
import { useAppContext } from "./Context/AppContext";

function App() {
  const { openSidebar, refetch, isSidebarOpen, closeSidebar, isModalOpen } =
    useAppContext();

  return (
    <div>
      <Header
        isOpen={isSidebarOpen || isModalOpen}
        onOpenSidebar={openSidebar}
        onRefresh={refetch}
      />
      <div className="container">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
