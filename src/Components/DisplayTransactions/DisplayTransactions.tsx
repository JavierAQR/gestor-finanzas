import SingleTransaction from "../SingleTransaction/SingleTransaction";
import "./styles.css";
import { inputs, Transaction } from "../../context/reducer";
import { ChangeEvent } from "react";

type Props = {
  selectedTable: Transaction[];
  handleDelete: (id: string) => void;
  handleUpdate: (datos: inputs, id: string) => void;
  handleChangeFilter: (e: ChangeEvent<HTMLSelectElement>) => void;
  tableSort: string;
  handleSortByDate: (e: ChangeEvent<HTMLSelectElement>) => void;

  categoryFilter: string;
};

function DisplayTransactions({
  handleDelete,
  handleUpdate,
  selectedTable,
}: Props) {
  return (
    <>
      <div className="transaction-list">
        <table>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Monto S/.</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {selectedTable.map((item) => {
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
