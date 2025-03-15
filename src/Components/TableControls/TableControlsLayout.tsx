import { ChangeEvent } from "react";
import { useMonthContext } from "../../context/MonthContext";

type Props = {
  tableSort: string;
  handleSortByDate: (e: ChangeEvent<HTMLSelectElement>) => void;
  categoryFilter: string;
  typeFilter: string;
  handleCategory: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleType: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const TableControlsLayout = ({
  categoryFilter,
  tableSort,
  handleSortByDate,
  typeFilter,
  handleType,
  handleCategory,
}: Props) => {
  const { categoriasDelMes } = useMonthContext();

  return (
    <div className={`table-controls `}>
      <div className="control">
        <h4>Tipo</h4>
        <select name="typeFilter" value={typeFilter} onChange={handleType}>
          <option value="">Todo</option>
          <option value="ingreso">Ingreso</option>
          <option value="egreso">Egreso</option>
        </select>
      </div>
      <div className="control">
        <h4>Categoría</h4>
        <select
          name="categoryFilter"
          value={categoryFilter}
          onChange={handleCategory}
        >
          <option value="">Todo</option>
          {categoriasDelMes.map((item, index) => {
            if (item.type === typeFilter) {
              return (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              );
            }
          })}
        </select>
      </div>
      <div className="control">
        <h4>Ordenar por</h4>
        <select name="tableSort" value={tableSort} onChange={handleSortByDate}>
          <option value="reciente">Más reciente</option>
          <option value="antiguo">Más antiguo</option>
        </select>
      </div>
    </div>
  );
};

export default TableControlsLayout;
