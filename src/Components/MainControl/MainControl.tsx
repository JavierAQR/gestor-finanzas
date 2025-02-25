import { useState } from "react";
import BalanceTotal from "../BalanceTotal/BalanceTotal";
import DisplayTransactions from "../TableTransaction/DisplayTransactions";
import FormAddTransaction from "../FormTransaction/FormContainer";
import TableControls from "../TableControls/TableControlsContainer";
import { initialState, Transaction } from "../../context/reducer";

function MainControl() {
  const [editTransaction, setEditTransaction] =
    useState<Transaction>(initialState);

  const [selectedTable, setSelectedTable] = useState<Transaction[]>([]);

  return (
    <>
      <FormAddTransaction
        editTransaction={editTransaction}
        setEditTransaction={setEditTransaction}
      />
      <BalanceTotal selectedTable={selectedTable} />
      <TableControls setSelectedTable={setSelectedTable} />
      <DisplayTransactions
        selectedTable={selectedTable}
        setEditTransaction={setEditTransaction}
      />
    </>
  );
}

export default MainControl;
