import "./DisplayStyles.css";
import { Dispatch, SetStateAction } from "react";
import ReusableTable, { Column } from "../Table/ReusableTable";
import { useTransactionStore } from "../../store/transaction";
import { Transaction } from "../../types";

type Props = {
  selectedTable: Transaction[];
  setEditTransaction: Dispatch<SetStateAction<Transaction | null>>;
};

function DisplayTransactions({ selectedTable, setEditTransaction }: Props) {
  const deleteTransaction = useTransactionStore(
    (state) => state.deleteTransaction
  );

  const handleUpdateTransaction = (datos: Transaction) => {
    setEditTransaction(datos);
  };

  const handleDeleteTransaction = (id: string) => {
    deleteTransaction(id);
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
    <ReusableTable
      data={selectedTable}
      columns={columns}
      handleDelete={handleDeleteTransaction}
      handleUpdate={handleUpdateTransaction}
    />
  );
}

export default DisplayTransactions;
