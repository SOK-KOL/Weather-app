import { WeatherSvg } from "weather-icons-animated";
import "./Header.scss";
import Refresh from "../../assets/icons/refresh.svg?react";
import Settings from "../../assets/icons/settings.svg?react";
import { Link } from "react-router-dom";


interface HeaderProps {
  onRefresh: () => void;
  onOpenSidebar: () => void;
  isOpen: boolean;
}

function Header({ onRefresh, onOpenSidebar, isOpen }: HeaderProps) {


  return (
    <header className={`header ${isOpen === true ? "header--open" : "" }`}>
      <div className="container">

      <div className="header__inner">
        <div className="header-left">
          <WeatherSvg className="header-left__icon" state="sunny" width={50} height={50} />
          <Link className="header-left__title" to="/">
            Погодный гид
          </Link>
        </div>

        <div className="header-right">
          <button onClick={() => onRefresh()} className="header-right__btn header-right__btn--update">
            <Refresh  className="header-right__btn-icon"/>
            <span className="header-right__btn-text">Обновить</span>
          </button>
          <button
            onClick={onOpenSidebar}
            className="header-right__btn header-right__btn--settings"
            >
            <Settings  className="header-right__btn-icon" />
          </button>
        </div>
      </div>
    </div>
            </header>
  );
}

export default Header;
