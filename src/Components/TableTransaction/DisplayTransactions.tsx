import "./DisplayStyles.css";
import { Transaction } from "../../context/reducer";
import { Dispatch, SetStateAction } from "react";
import { useDataContext } from "../../context/TransactionContext";
import ReusableTable, { Column } from "../ReusableTable/ReusableTable";

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

  //Funcion para personalizar un campo
  const typeAmount = (item: Transaction, colIndex: number) =>
    item.type === "ingreso" ? (
      <td key={colIndex} className="type ingreso">
        + {item.amount}
      </td>
    ) : (
      <td key={colIndex} className="type egreso">
        - {item.amount}
      </td>
    );

  const columns: Column<Transaction>[] = [
    {
      header: "DESCRIPCIÓN",
      key: "description",
      hide: false,
    },
    {
      header: "CATEGORÍA",
      key: "category",
      hide: true,
    },
    {
      header: "MONTO S/",
      key: "amount",
      hide: false,
      function: typeAmount,
    },
    {
      header: "FECHA",
      key: "date",
      hide: false,
    },
  ];

  return (
    <>
      {selectedTable.length === 0 ? (
        <div className="tabla-vacía">
          <h3>No se encontraron transacciones registradas.</h3>
          <span>📁</span>
        </div>
      ) : (
        <>
          <ReusableTable
            data={selectedTable}
            columns={columns}
            handleDelete={handleDeleteTransaction}
            handleUpdate={handleUpdateTransaction}
          />
        </>
      )}
    </>
  );
}

export default DisplayTransactions;
