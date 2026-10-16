import type { Scale } from "../../Types/Scale";
import type { TableInfoData } from "../../Types/Table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalWindow from "../ModalWindow/ModalWindow";

import "./Table.scss";
import { useAppContext } from "../../Context/AppContext";

interface WeatherProps {
  tableData: TableInfoData[];
  scale: Scale;
}

function Table({ tableData, scale }: WeatherProps) {
  const [selectedRow, setSelectedRow] = useState<TableInfoData | null>(null);
  const { openModal, closeModal, weather, setSelectedDay } = useAppContext();
  const navigate = useNavigate();

  const handleOpen = (row: TableInfoData) => {
    setSelectedRow(row);
    openModal();
  };

  const handleClose = () => {
    setSelectedRow(null);
    closeModal();
  };

  const handleDesktopClick = (row: TableInfoData) => {
    const index = tableData.findIndex((r) => r.day === row.day);
    const forecastDay = weather?.forecast.forecastday[index];
    if (forecastDay) {
      setSelectedDay(forecastDay);
      navigate("/");
    }
  };

  return (
    <div className="table">
      <div className="table__wrapper">
        <h3 className="table__wrapper-title">Детальные данные</h3>
        <p className="table__wrapper-info">Почасовые показатели по дням</p>

        <table className="table-mobile">
          <thead>
            <tr className="table__row">
              <th className="table__cell table__cell--head">День</th>
              <th className="table__cell table__cell--head">
                {" "}
                Утро {scale === "C" ? "C" : "F"}
                {`\u00B0`}
              </th>
              <th className="table__cell table__cell--head">
                День {scale === "C" ? "C" : "F"}
                {`\u00B0`}
              </th>
              <th className="table__cell table__cell--head">
                {" "}
                Вечер {scale === "C" ? "C" : "F"}
                {`\u00B0`}
              </th>
              <th className="table__cell table__cell--head">...</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr
                onClick={() => handleOpen(row)}
                className="table__row"
                key={row.day}
              >
                <td className="table__cell table__cell--day">{row.tableDay}</td>
                <td className="table__cell">
                  {row.morning}
                  {`\u00B0`}
                </td>
                <td className="table__cell">
                  {row.dayTime}
                  {`\u00B0`}
                </td>
                <td className="table__cell">
                  {row.evening}
                  {`\u00B0`}
                </td>
                <td className="table__cell">...</td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedRow ? (
          <ModalWindow
            rowData={selectedRow}
            tempScale={scale}
            onClose={handleClose}
          />
        ) : null}

        <table className="table__grid">
          <thead>
            <tr className="table__row">
              <th className="table__cell table__cell--head">День</th>
              <th className="table__cell table__cell--head">
                Утро {scale}
                {`\u00B0`}
              </th>
              <th className="table__cell table__cell--head">
                День {scale}
                {`\u00B0`}
              </th>
              <th className="table__cell table__cell--head">
                Вечер {scale}
                {`\u00B0`}
              </th>
              <th className="table__cell table__cell--head">Влажность</th>
              <th className="table__cell table__cell--head">Давление</th>
              <th className="table__cell table__cell--head">Ветер</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr
                onClick={() => handleDesktopClick(row)}
                className="table__row"
                key={row.day}
                style={{ cursor: "pointer" }}
              >
                <td className="table__cell table__cell--day">{row.tableDay}</td>
                <td className="table__cell">
                  {row.morning}
                  {`\u00B0`}
                </td>
                <td className="table__cell">
                  {row.dayTime}
                  {`\u00B0`}
                </td>
                <td className="table__cell">
                  {row.evening}
                  {`\u00B0`}
                </td>
                <td className="table__cell">{row.humidity}%</td>
                <td className="table__cell">{row.pressure} </td>
                <td className="table__cell">{row.wind} м/с</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
