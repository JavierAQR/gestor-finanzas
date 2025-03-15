import { useState } from "react";
import { DisplayTransactions } from "../TransactionDisplay";
import ErrorBoundary from "../../ErrorBoundary";
import { Transaction } from "../../types";
import ManageResults from "../ManageResults/ManageResults";
import "./Styles.css";
import { FilterContextProvider } from "../../context/FilterContext";
import ManageCategories from "../ManageCategories/ManageCategories";
import TransactionForm from "../TransactionForm/TransactionForm";
import { TableControls } from "../TableControls";

function MainControl() {
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(
    null
  );

  const [selectedTable, setSelectedTable] = useState<Transaction[]>([]);

  return (
    <div className="principal">
      <ErrorBoundary>
        <div className="form-principal">
          <ManageCategories />
          <TransactionForm
            editTransaction={editTransaction}
            setEditTransaction={setEditTransaction}
          />
        </div>
        <FilterContextProvider>
          <ManageResults selectedTable={selectedTable} />
          <div className="resultados-tabla">
            <TableControls setSelectedTable={setSelectedTable} />
            <DisplayTransactions
              selectedTable={selectedTable}
              setEditTransaction={setEditTransaction}
            />
          </div>
        </FilterContextProvider>
      </ErrorBoundary>
    </div>
  );
}

export default MainControl;
