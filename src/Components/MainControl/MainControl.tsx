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

  // Obtener la fecha actual
  const currentDate = new Date();

  // Obtener el mes actual formateado MM
  const formattedMonth =
    currentDate.getMonth() < 10
      ? `0${currentDate.getMonth() + 1}`
      : currentDate.getMonth() + 1;

  // Obtener la fecha actual en formato YYYY-MM
  const fechaActual = `${currentDate.getFullYear()}-${formattedMonth}`;

  // Variable de estado para el mes seleccionado, cuyo valor inicial es el de el mes actual
  const [monthSelected, setMonthSelected] = useState(fechaActual || "");

  console.log(selectedTable);

  return (
    <>
      <ErrorBoundary>
        <FormContainer
          editTransaction={editTransaction}
          setEditTransaction={setEditTransaction}
        />
        <div className="resultados-tabla">
          <BalanceTotal selectedTable={selectedTable} />
          <TableControlsContainer
            setSelectedTable={setSelectedTable}
            monthSelected={monthSelected}
            setMonthSelected={setMonthSelected}
          />
          {selectedTable.length === 0 ? (
            <div className="tabla-vacía">
              <h3>No se encontraron transacciones registradas.</h3>
              <span>📁</span>
            </div>
          ) : (
            <DisplayTransactions
              selectedTable={selectedTable}
              setEditTransaction={setEditTransaction}
            />
          )}
        </div>
      </ErrorBoundary>
    </>
  );
}

export default MainControl;
