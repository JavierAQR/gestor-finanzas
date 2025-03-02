import { useState } from "react";
import BalanceTotal from "../BalanceTotal/BalanceTotal";
import { DisplayTransactions } from "../TableTransaction";
import { FormContainer } from "../FormTransaction";
import { TableControlsContainer } from "../TableControls";
import { initialState, Transaction } from "../../context/reducer";
import ErrorBoundary from "../../ErrorBoundary";

function MainControl() {
  const [editTransaction, setEditTransaction] =
    useState<Transaction>(initialState);

  const [selectedTable, setSelectedTable] = useState<Transaction[]>([]);

  return (
    <>
      <ErrorBoundary>
        <FormContainer
          editTransaction={editTransaction}
          setEditTransaction={setEditTransaction}
        />
        <div className="resultados-tabla">
          <BalanceTotal selectedTable={selectedTable} />
          <TableControlsContainer setSelectedTable={setSelectedTable} />
          {selectedTable.length === 0 ? (
            <div className="tabla-vacía">
              <h3>No se encontraron transacciones registradas.</h3>
              <span>📁</span>
            </div>
          ) : (
            <>
              <DisplayTransactions
                selectedTable={selectedTable}
                setEditTransaction={setEditTransaction}
              />
            </>
          )}
        </div>
      </ErrorBoundary>
    </>
  );
}

export default MainControl;
