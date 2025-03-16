import { useState } from "react";
import { DisplayTransactions } from "../../Components/TransactionDisplay";
import ErrorBoundary from "../../ErrorBoundary";
import { Transaction } from "../../types";
import ManageResults from "../../Components/ManageResults/ManageResults";
import "./Styles.css";
import { FilterContextProvider } from "../../context/FilterContext";
import ManageCategories from "../../Components/ManageCategories/ManageCategories";
import TransactionForm from "../../Components/TransactionForm/TransactionForm";
import { TableControls } from "../../Components/TableControls";

function MainControl() {
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(
    null
  );

  const [selectedTable, setSelectedTable] = useState<Transaction[]>([]);

  return (
    <ErrorBoundary>
      <div className="principal">
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
      </div>
    </ErrorBoundary>
  );
}

export default MainControl;
