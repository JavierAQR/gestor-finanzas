import { useState } from "react";
import BalanceTotal from "../BalanceTotal/BalanceTotal";
import { DisplayTransactions } from "../TableTransaction";
import { initialState, Transaction } from "../../context/reducer";
import ErrorBoundary from "../../ErrorBoundary";
import FormContainer from "../FormTransaction/FormContainer";
import { TableControlsContainer } from "../TableControls";
import ManageCategories from "../ManageCategories/ManageCategories";

function MainControl() {
  const [editTransaction, setEditTransaction] =
    useState<Transaction>(initialState);

  const [selectedTable, setSelectedTable] = useState<Transaction[]>([]);

  return (
    <>
      <ErrorBoundary>
        <ManageCategories />
        <FormContainer
          editTransaction={editTransaction}
          setEditTransaction={setEditTransaction}
        />
        <div className="resultados-tabla">
          <BalanceTotal selectedTable={selectedTable} />
          <TableControlsContainer setSelectedTable={setSelectedTable} />
          <DisplayTransactions
            selectedTable={selectedTable}
            setEditTransaction={setEditTransaction}
          />
        </div>
      </ErrorBoundary>
    </>
  );
}

export default MainControl;
