import { ReactNode } from "react";
import "./SingleStyles.css";

export interface Column<T> {
  header: string;
  key: keyof T;
  hide: boolean;
  class?: string;
  function?: (item: T, colIndex: number) => ReactNode;
}

interface Props<T> {
  data: T[];
  columns: Column<T>[];
  handleDelete: (id: string) => void;
  handleUpdate?: (datos: T) => void;
}

const ReusableTable = <T,>({
  columns,
  data,
  handleDelete,
  handleUpdate,
}: Props<T>) => {
  return (
    <div className="reusable-table">
      {data.length === 0 ? (
        <div className="tabla-vacía">
          <h3>No se encontraron registros.</h3>
          <span>📁</span>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={
                    column.hide === true ? "hide-on-mobile" : undefined
                  }
                >
                  {column.header}
                </th>
              ))}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) =>
                  column.function ? (
                    column.function(row, colIndex)
                  ) : (
                    <td
                      key={colIndex}
                      className={column.hide ? "hide-on-mobile" : ""}
                    >
                      {String(row[column.key])}
                    </td>
                  )
                )}
                <td className="acciones">
                  {handleUpdate && (
                    <button onClick={() => handleUpdate(row)}>
                      <i className="fa-solid fa-pen"></i>
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(String(row["id" as keyof T]))}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReusableTable;
