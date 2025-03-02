import SingleTransaction from "./SingleTransaction";
import "./DisplayStyles.css";
import { Transaction } from "../../context/reducer";
import { Dispatch, SetStateAction } from "react";
import { useDataContext } from "../../context/TransactionContext";

type Props = {
  selectedTable: Transaction[];
  setEditTransaction: Dispatch<SetStateAction<Transaction>>;
};

function DisplayTransactions({ selectedTable, setEditTransaction }: Props) {
  const contextData = useDataContext();
  
  const handleUpdateTransaction = (datos: Transaction) => {
    setEditTransaction(datos);
  };

  const handleDeleteTransaction = (id: string) => {
    contextData.dispatch({
      type: "DELETE",
      payload: id,
    });
  };

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
                  handleDelete={handleDeleteTransaction}
                  handleUpdate={handleUpdateTransaction}
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
