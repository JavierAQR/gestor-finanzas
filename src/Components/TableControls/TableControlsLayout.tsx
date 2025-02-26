import { ChangeEvent } from "react";
import { useDataContext } from "../../context/TransactionContext";

type Props = {
  handleChangeFilter: (e: ChangeEvent<HTMLSelectElement>) => void;
  tableSort: string;
  handleSortByDate: (e: ChangeEvent<HTMLSelectElement>) => void;
  categoryFilter: string;
};

const TableControlsLayout = ({
  categoryFilter,
  handleChangeFilter,
  tableSort,
  handleSortByDate,
}: Props) => {
  const contextData = useDataContext();

  return (
    <div className="table-controls">
      <div className="control">
        <h4>Ver</h4>
        <select
          name="categoryFilter"
          value={categoryFilter}
          onChange={handleChangeFilter}
        >
          <option value="">Todo</option>
          {contextData.categoryArray.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
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
