import SingleTransaction from "../SingleTransaction/SingleTransaction";
import "./styles.css";
import { Transaction } from "../../context/reducer";
import { ChangeEvent } from "react";

type Props = {
  selectedTable: Transaction[];
  handleDelete: (id: string) => void;
  handleUpdate: (datos: Transaction) => void;
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
              <th className="hide-on-mobile">Categoría</th>
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
                  item={item}
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
