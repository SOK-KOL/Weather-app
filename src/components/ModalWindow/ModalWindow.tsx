import type { TableInfoData } from "../../types/Table";
import CloseIcon from "../../assets/icons/close.svg?react";
import "./ModalWindow.scss";
interface ModalWindowProps {
  rowData: TableInfoData | null;
  tempScale: "C" | "F";
  onClose: () => void;
}

function ModalWindow({ rowData, onClose, tempScale }: ModalWindowProps) {
  return (
    <div className="modal">
      <div className="modal-head">
        <div className="modal-head__day">
          <h2 className="modal-head__time">{rowData?.longNameDay}</h2>
          <span className="modal-head__date">{rowData?.tableDay}</span>
        </div>
        <CloseIcon onClick={onClose} />
      </div>

      <div className="modal-temp">
        <p className="modal-temp__name">Температура</p>
        <ul className="modal-temp__cards">
          <li className="modal-temp__card">
            <p className="modal-temp__card-time">Утро</p>
            <p className="modal-temp__card-temp">
              {rowData?.morning} {tempScale}
              {`\u00B0`}
            </p>
          </li>
          <li className="modal-temp__card">
            <p className="modal-temp__card-time">День</p>
            <p className="modal-temp__card-temp">
              {rowData?.dayTime} {tempScale}
              {`\u00B0`}
            </p>
          </li>
          <li className="modal-temp__card">
            <p className="modal-temp__card-time">Вечер</p>
            <p className="modal-temp__card-temp">
              {rowData?.evening} {tempScale}
              {`\u00B0`}
            </p>
          </li>
        </ul>
      </div>
      <div className="modal-info">
        <p className="modal-info__name">Погодные условия</p>
        <ul className="modal-info__cards">
          <li className="modal-info__card">
            <p className="modal-info__card-name">Ветер</p>
            <p className="modal-info__card-condition">{rowData?.wind} м/с</p>
          </li>
          <li className="modal-info__card">
            {" "}
            <p className="modal-info__card-name">Влажность</p>
            <p className="modal-info__card-condition">{rowData?.humidity}%</p>
          </li>
          <li className="modal-info__card">
            {" "}
            <p className="modal-info__card-name">Давление</p>
            <p className="modal-info__card-condition">{rowData?.pressure} </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ModalWindow;
