import { useState } from "react";
import BalanceTotal from "../BalanceTotal/BalanceTotal";
import { DisplayTransactions } from "../TableTransaction";
import { FormContainer } from "../FormTransaction";
import { TableControlsContainer } from "../TableControls";
import { initialState, Transaction } from "../../context/reducer";

function MainControl() {
  const [editTransaction, setEditTransaction] =
    useState<Transaction>(initialState);

  const [selectedTable, setSelectedTable] = useState<Transaction[]>([]);

  return (
    <>
      <FormContainer
        editTransaction={editTransaction}
        setEditTransaction={setEditTransaction}
      />
      <BalanceTotal selectedTable={selectedTable} />
      <TableControlsContainer setSelectedTable={setSelectedTable} />
      <DisplayTransactions
        selectedTable={selectedTable}
        setEditTransaction={setEditTransaction}
      />
    </>
  );
}

export default MainControl;
