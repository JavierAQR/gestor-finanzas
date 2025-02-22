import { useDataContext } from "../../context/TransactionContext";
import SingleTransaction from "../SingleTransaction/SingleTransaction";
import "./styles.css";
import { inputs, Transaction } from "../../context/reducer";
import { ChangeEvent } from "react";

type Props = {
  filterTable: Transaction[];
  handleDelete: (id: string) => void;
  handleUpdate: (datos: inputs, id: string) => void;
  handleChangeFilter: (e: ChangeEvent<HTMLSelectElement>) => void;
  categoryFilter: string;
};

function DisplayTransactions({
  handleDelete,
  handleUpdate,
  categoryFilter,
  handleChangeFilter,
  filterTable,
}: Props) {
  const contextData = useDataContext();

  const tablaSeleccionada =
    categoryFilter === "" ? contextData.state : filterTable;

  return (
    <>
      <select
        name="categoryFilter"
        value={categoryFilter}
        onChange={handleChangeFilter}
      >
        <option value="">Todo</option>
        {contextData.categoryArray.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      <div className="transaction-list">
        <table>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Monto (S/)</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tablaSeleccionada.map((item) => {
              return (
                <SingleTransaction
                  handleDelete={handleDelete}
                  handleUpdate={handleUpdate}
                  key={item.id}
                  id={item.id}
                  type={item.type}
                  description={item.description}
                  category={item.category}
                  amount={item.amount}
                  date={item.date}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DisplayTransactions;
