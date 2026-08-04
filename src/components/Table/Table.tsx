import type { Scale } from "../../types/Scale";
import type { TableInfoData } from "../../types/Table";
import "./Table.scss";

interface WeatherProps {
  tableData: TableInfoData[];
  scale: Scale;
}

function Table({ tableData, scale }: WeatherProps) {
  console.log(scale);
  return (
    <div className="table">
      <div className="table__wrapper">
        <h3 className="table__wrapper-title">Детальные данные</h3>
        <p className="table__wrapper-info">Почасовые показатели по дням</p>
        <table className="table__grid">
          <thead>
            <tr className="table__row">
              <th className="table__cell table__cell--head">День</th>
              <th className="table__cell table__cell--head">
                Утро {scale === "C" ? "C" : "F"}
                {`\u00B0`}
              </th>
              <th className="table__cell table__cell--head">
                День {scale === "C" ? "C" : "F"}
                {`\u00B0`}
              </th>
              <th className="table__cell table__cell--head">
                Вечер {scale === "C" ? "C" : "F"}
                {`\u00B0`}
              </th>
              <th className="table__cell table__cell--head">Влажность</th>
              <th className="table__cell table__cell--head">Давление</th>
              <th className="table__cell table__cell--head">Ветер</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr className="table__row" key={row.day}>
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
