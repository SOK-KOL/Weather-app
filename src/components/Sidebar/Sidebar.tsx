import "./Sidebar.scss";
import Close from "../../assets/icons/close.svg?react";
import { useAppContext } from "../../context/AppContext";
interface SidebarProps {
  onClose: () => void;
  isOpen: boolean;
}

function Sidebar({ onClose, isOpen }: SidebarProps) {
  const { scale, setScale, pressureUnits, setPressureUnits } = useAppContext();
  return (
    <aside className={`sidebar ${isOpen ? `sidebar--active` : ``} `}>
      <h2 className="sidebar__title">Настройки</h2>
      <button className="sidebar__btn" onClick={onClose}>
        <Close />
      </button>
      <form className="sidebar__form">
        <p className="sidebar__form-title">Шкала температур:</p>
        <div className="sidebar__form-choice">
          <label className="sidebar__form-label" htmlFor="Celius">
            C{`\u00B0`}
          </label>
          <input
            className="sideBar__form-input"
            type="radio"
            value={"C"}
            name="scale"
            checked={scale === "C"}
            id="Celius"
            onChange={(e) => setScale(e.target.value)}
          />
        </div>
        <div className="sidebar__form-choice">
          <label className="sidebar__form-label" htmlFor="Faren">
            F{`\u00B0`}
          </label>
          <input
            className="sideBar__form-input"
            type="radio"
            name="scale"
            id="Faren"
            value={"F"}
            checked={scale === "F"}
            onChange={(e) => setScale(e.target.value)}
          />
        </div>
        <p className="sidebar__form-title">Единицы давления:</p>
        <div className="sidebar__form-choice">
          <label className="sidebar__form-label" htmlFor="hydrargyrum">
            мм. рт. столба
          </label>
          <input
            className="sideBar__form-input"
            type="radio"
            name="pressure"
            id="hydrargyrum"
            value={"hydrargyrum"}
            checked={pressureUnits === "hydrargyrum"}
            onChange={(e) => setPressureUnits(e.target.value)}
          />
        </div>
        <div className="sidebar__form-choice">
          <label className="sidebar__form-label" htmlFor="hectopascals">
            ГектоПаскали
          </label>
          <input
            className="sideBar__form-input"
            type="radio"
            name="pressure"
            id="hectopascals"
            value={"hectopascal"}
            checked={pressureUnits === "hectopascal"}
            onChange={(e) => setPressureUnits(e.target.value)}
          />
        </div>
      </form>
    </aside>
  );
}

export default Sidebar;
