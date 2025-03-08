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

  //Estado para el filtro por categoría
  const [categoryFilter, setCategoryFilter] = useState("");

  //Estado para el filtro por tipo
  const [typeFilter, setTypeFilter] = useState("");

  return (
    <>
      <ErrorBoundary>
        <ManageCategories />
        <FormContainer
          editTransaction={editTransaction}
          setEditTransaction={setEditTransaction}
        />
        <div className="resultados-tabla">
          <BalanceTotal
            selectedTable={selectedTable}
            typeFilter={typeFilter}
            categoryFilter={categoryFilter}
          />
          <TableControlsContainer
            setSelectedTable={setSelectedTable}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
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
